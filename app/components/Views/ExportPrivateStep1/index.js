import React, { useEffect, useState, useRef } from "react"
import { StyleSheet, Dimensions, View, TouchableOpacity, Text, TextInput, Alert } from 'react-native'
import { connect } from "react-redux"
import Toast from 'react-native-easy-toast'

import { normalBtnView, normalBtnStyle, normalBtnText } from "../../../styles/comBtn"
import { surePWDPrivateKey, surePWDMnemonic } from "../../../wallet/walletManager"
import I18n from '../../../i18n/i18n'
import { comTip } from "../../../styles/comTip"
import { baseStyles, colors, fontStyles } from "../../../styles/common"
import { normalInputStyle } from '../../../styles/comInput'

const ExportPrivateStep1 = ({ route, navigation }) => {
    const [walletPwd, onChangePwd] = useState('')
    const [account, setAccount] = useState({})

    const toast = useRef()

    const [isWalletPwdChecked, setIsWalletPwdChecked] = useState(false)
    useEffect(() => {
        setAccount(getAccount())
    }, [])

    const getAccount = () => {
        let res = route.params.account
        return res
    }

    //通过密码获取私钥或者助记词
    const getPrivateKey = () => {
        if (!walletPwd.trim()) {
            setIsWalletPwdChecked(true)
            return
        }
        setIsWalletPwdChecked(false)
        try {
            if (route.params.type == 'privateKey') {
                let res = surePWDPrivateKey(account.privateKey, walletPwd)
                navigation.navigate('ExportPrivateStep2', {
                    account,
                    privateKey: res
                })
            }
            else {
                let res = surePWDMnemonic(account.mnemonic, walletPwd)
                navigation.navigate('BackupStep1', {
                    mnemonic: res.split(' '),
                    account,
                    type: 'export'
                })
            }
        } catch (error) {
            console.log(error)
            Alert.alert(I18n.t('exportPriStep1.pwdError'))
        }
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.topView}>
                <Text style={styles.largeSize}>{I18n.t('exportPriStep1.inputPwd')}</Text>
                <TextInput
                    style={normalInputStyle}
                    placeholder={I18n.t('exportPriStep1.inputPwdP')}
                    onChangeText={text => onChangePwd(text)}
                />
                {isWalletPwdChecked ? <Text style={{ ...comTip, marginTop: 6 }}>{I18n.t('exportPriStep1.emptyPwd')}</Text> : null}
            </View>
            <View style={normalBtnView}>
                <TouchableOpacity style={normalBtnStyle} onPress={getPrivateKey}>
                    <Text style={normalBtnText}>{I18n.t('exportPriStep1.next')}</Text>
                </TouchableOpacity>
            </View>

            <Toast ref={toast} position='top' positionValue={10}></Toast>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        ...baseStyles.flexGrow,
        justifyContent: 'space-between'
    },
    topView: {
        paddingTop: 20,
        ...baseStyles.containerPadding
    },
    largeSize: {
        ...fontStyles.normal,
        ...fontStyles.normalSize,
        color: colors.fontPrimary,
        marginBottom: 10
    }
})

export default connect(
    state => ({

    }),
    {}
)(ExportPrivateStep1)