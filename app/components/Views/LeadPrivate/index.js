import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Slider, Image, Modal, Alert } from 'react-native'
import { connect } from 'react-redux'
import Toast from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { checkPassword } from '../../../wallet/walletUtil'
import { compverse2LeadMnemonic, compverse2LeadPriKey } from '../../../chain'
import DeviceStorage from "../../../util/DeviceStorage"
import I18n from '../../../i18n/i18n'
import { addAccounts, updateCurrentAccount } from "../../../util/accounts"
import { comTipView, comTip } from '../../../styles/comTip'
import { baseStyles, colors, fontStyles } from '../../../styles/common'
import { normalBtnView, normalBtnStyle, normalBtnText } from '../../../styles/comBtn'
import { normalInputStyle } from '../../../styles/comInput'

const LeadPrivate = ({ route, navigation, accounts, currentNet }) => {
    const toast = useRef()

    useEffect(() => {
        navigation.setOptions({
            title: I18n.t('router.LeadPriKey', { chain: currentNet.chain })
        });
    }, [])

    const [walletName, onChangeName] = useState('');
    const [walletPwd, onChangePwd] = useState('');
    const [mnemonic, onChangeMnemonic] = useState('')
    const [privateKey, onChangePrivateKey] = useState('')
    const [walletPwd2, onChangePwd2] = useState('');
    const [isWalletNameChecked, setIsWalletNameChecked] = useState(false)
    const [isWalletPwdChecked, setIsWalletPwdChecked] = useState(false)
    const [isPrivateKeyChecked, setIsPrivateKeyChecked] = useState(false)
    const [isMnemonicChecked, setIsMnemonicChecked] = useState(false)

    //检查钱包名称
    const checkName = () => {
        if (!walletName.trim()) {
            setIsWalletNameChecked(true)
            return false;
        }
        setIsWalletNameChecked(false)
        return true;
    }

    //检查密码
    const toCheckPassword = () => {
        if (!checkPassword(walletPwd)) {
            setIsWalletPwdChecked(true)
            return false;
        }
        setIsWalletPwdChecked(false)
        return true;
    }

    const toCheckMnemonic = () => {
        let Mnemonic = mnemonic.replace(/\s+/g, " ") //去多余空格
        Mnemonic = mnemonic.replace(/(^\s*)|(\s*$)/g, "") //去两边空格
        onChangeMnemonic(Mnemonic)
        if (!mnemonic.trim()) {
            setIsMnemonicChecked(true)
            return false
        }
        setIsMnemonicChecked(false)
        return true
    }
    const toCheckPrivateKey = () => {
        if (!privateKey.trim()) {
            setIsPrivateKeyChecked(true)
            return false
        }
        setIsPrivateKeyChecked(false)
        return true
    }

    const toLeadWallet = async () => {
        let account = null
        if (!checkName() || !toCheckPassword()) return

        if (route.params.key == 1) {
            account = compverse2LeadPriKey(privateKey, walletPwd, walletName)
        }
        else {
            account = compverse2LeadMnemonic(mnemonic, walletPwd, walletName)
        }
        if (account) {
            let index = accounts.findIndex(item => item.chainName == currentNet.chain)
            let compverseAccount = accounts[index].accounts
            const id = compverseAccount.findIndex(item => item.address == account.address)
            if (id == -1) {   //账户不存在
                addAccounts(account)
                updateCurrentAccount(account)
                navigation.navigate('walletManager')
            }
            else {
                toast.current.show(I18n.t('leadPrivate.existAccount'))
            }
        }
        else {
            toast.current.show(I18n.t('leadPrivate.leadFailed'))
        }
    }
    return (
        <View style={styles.mainContainer}>
            <KeyboardAwareScrollView style={styles.viewPadding}>
                {/* route.params.key==1 私钥导入  route.params.key==2 助记词导入  */}
                {
                    route.params.key == 1 ? <View>
                        <TextInput
                            style={{ ...normalInputStyle, height: 150, textAlignVertical: 'top' }}
                            placeholder={I18n.t('leadPrivate.leadPriKey')}
                            multiline={true}
                            onChangeText={text => onChangePrivateKey(text)}
                            onBlur={toCheckPrivateKey}
                        ></TextInput>
                        <View style={comTipView}>{isPrivateKeyChecked ? <Text style={comTip}>{I18n.t('leadPrivate.privateKeyMsg')}</Text> : null}</View>
                    </View> : <View>
                        <TextInput
                            style={{ ...normalInputStyle, height: 150, textAlignVertical: 'top' }}
                            placeholder={I18n.t('leadPrivate.leadMnemonic')}
                            multiline={true}
                            onChangeText={text => onChangeMnemonic(text)}
                            onBlur={toCheckMnemonic}
                        ></TextInput>
                        <View style={comTipView}>{isMnemonicChecked ? <Text style={comTip}>{I18n.t('leadPrivate.mnemonicMsg')}</Text> : null}</View>
                    </View>
                }

                <View>
                    <Text style={styles.infoSize}>{I18n.t('leadPrivate.walletName')}(COMPVERSE)</Text>
                    <TextInput
                        style={normalInputStyle}
                        onChangeText={text => onChangeName(text)}
                        onBlur={checkName}
                        maxLength={12}
                    ></TextInput>
                    <View style={comTipView}>{isWalletNameChecked ? <Text style={comTip}>{I18n.t('createWallet.nameMsg')}</Text> : null}</View>
                </View>

                <View>
                    <Text style={styles.infoSize}>{I18n.t("leadPrivate.pwd")}</Text>
                    <TextInput
                        style={normalInputStyle}
                        placeholder={I18n.t('leadPrivate.pwdP')}
                        secureTextEntry={true}
                        onChangeText={text => onChangePwd(text)}
                        onBlur={toCheckPassword}
                    ></TextInput>
                    <View style={comTipView}>{isWalletPwdChecked ? <Text style={comTip}>{I18n.t('createWallet.pwdMsg')}</Text> : null}</View>
                </View>
            </KeyboardAwareScrollView>

            <View style={normalBtnView}>
                <TouchableOpacity style={normalBtnStyle} onPress={toLeadWallet}><Text style={normalBtnText}>{I18n.t('leadPrivate.leadWallet')}</Text></TouchableOpacity>
            </View>

            <Toast ref={toast} position='top' positionValue={10}></Toast>
        </View>

    )
}

export default connect(
    state => ({
        accounts: state.accounts,
        currentNet: state.netReducer.currentNet,
    }),
    {

    }
)(LeadPrivate)

const styles = StyleSheet.create({
    mainContainer: {
        ...baseStyles.flexGrow,
        paddingTop: 20
    },
    viewPadding: {
        ...baseStyles.containerPadding
    },
    rowWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoSize: {
        ...fontStyles.medium,
        ...fontStyles.normalSize,
        color: colors.fontDark,
        marginBottom: 10
    }
})