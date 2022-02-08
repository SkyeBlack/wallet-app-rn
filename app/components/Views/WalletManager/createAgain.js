import React, { useEffect, useState, useRef } from "react"
import { StyleSheet, Dimensions, View, TouchableOpacity, Text, TextInput, Alert } from 'react-native'
import { connect } from "react-redux"
import Toast from 'react-native-easy-toast'

import { normalBtnStyle } from "../../../styles/comBtn"
import DeviceStorage from "../../../util/DeviceStorage"
import I18n from '../../../i18n/i18n'
import { createWallet2 } from "../../../wallet/createWallet"
import { checkPassword } from "../../../wallet/walletUtil"
import { addAccounts, updateCurrentAccount, getMnemonic } from "../../../util/accounts"
import { comTip } from "../../../styles/comTip"

const CreateAgain = ({ route, navigation, accounts, currentNet }) => {
    const [walletPwd, onChangePwd] = useState('')
    const [account, setAccount] = useState({})
    const [isWalletPwdChecked, setIsWalletPwdChecked] = useState(false)
    const toast = useRef()
    //通过密码获取私钥或者助记词
    const toCreateWallet = async () => {
        if (!checkPassword(walletPwd)) {
            setIsWalletPwdChecked(true)
            return false;
        }
        setIsWalletPwdChecked(false)
        const mnemonic = await getMnemonic()
        let account = await createWallet2(walletPwd, null, mnemonic.join(' '), true)
        const index = accounts.findIndex(item => item.chainName == currentNet.chain)
        let compverseAccount = accounts[index].accounts
        const id = compverseAccount.findIndex(item => item.address == account.address)
        if (id == -1) {
            addAccounts(account)
            updateCurrentAccount(account)
            navigation.navigate('walletManager')
        }
        else {
            toast.current.show(I18n.t('common.createWalletFailed'));
        }
    }
    return (
        <View style={{ alignItems: 'center', paddingTop: 20, flex: 1 }}>
            <View style={{ width: 355 }}>
                <Text style={styles.largeSize}>{I18n.t('exportPriStep1.inputPwdP')}</Text>
                <TextInput
                    style={styles.inputItem}
                    placeholder={I18n.t('exportPriStep1.inputPwdP')}
                    onChangeText={text => onChangePwd(text)}
                />
                {isWalletPwdChecked ? <Text style={{ ...comTip, marginTop: 10, marginBottom: 10 }}>{I18n.t('createWallet.pwdMsg')}</Text> : null}
            </View>
            <View style={styles.btnWrap}>
                <TouchableOpacity style={styles.nextBtn} onPress={toCreateWallet}>
                    <Text style={{ ...styles.largeSize, color: '#fff' }}>{I18n.t('createWallet.createWallet')}</Text>
                </TouchableOpacity>
            </View>

            <Toast ref={toast} position='top' positionValue={10}></Toast>
        </View>
    )
}

const styles = StyleSheet.create({
    largeSize: {
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        color: '#222222',
        lineHeight: 22,
        fontWeight: '400',
        fontSize: 16
    },
    inputItem: {
        marginTop: 10,
        height: 48,
        backgroundColor: '#FFFFFF',
        borderRadius: 7,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#e3e3e3',
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        color: '#333333',
        lineHeight: 22,
        fontWeight: '400',
        fontSize: 14,
        paddingLeft: 15,
    },
    btnWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 66,
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    nextBtn: {
        width: 355,
        ...normalBtnStyle
    }
})

export default connect(
    state => ({
        accounts: state.accounts,
        currentNet: state.netReducer.currentNet,
    }),
    {
    }
)(CreateAgain)