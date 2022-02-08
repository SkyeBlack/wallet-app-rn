import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import Toast from 'react-native-easy-toast'
import { connect } from 'react-redux'

import { colors, otherStyles, baseStyles, fontStyles } from '../../../styles/common'
import { comTipView, comTip } from "../../../styles/comTip"
import { normalBtnView, normalBtnStyle, normalBtnText } from '../../../styles/comBtn'
import { normalInputStyle } from '../../../styles/comInput'
import I18n from '../../../i18n/i18n'
import { checkPassword } from "../../../wallet/walletUtil"
import { createMnemonic } from "../../../wallet/walletUtil"
import { createWallet2 } from "../../../wallet/createWallet"
import DeviceStorage from "../../../util/DeviceStorage"


const styles = StyleSheet.create({
    cwMainContainer: {
        ...baseStyles.flexGrow,
        justifyContent: 'space-between'
    },
    topContainer: {
        paddingTop: 20,
        ...baseStyles.containerPadding,
        ...baseStyles.flexGrow,
        backgroundColor: colors.bgNormal
    },
    inputTitle: {
        marginBottom: 10,
        ...fontStyles.normal,
        ...fontStyles.smallSize,
        color: colors.fontPrimary
    },
    msgTip: {
        ...fontStyles.normal,
        ...fontStyles.tinySize
    },
    msgTip1: {
        color: colors.bgHighLight
    },
    msgTip2: {
        lineHeight: 22,
        color: colors.fontPrimary
    }
});

const CreateWallet = ({ navigation, accounts }) => {
    const [walletName, onChangeName] = useState('');
    const [walletPwd, onChangePwd] = useState('');
    const [walletPwd2, onChangePwd2] = useState('');
    const [isCreated, setIsCreated] = useState(false)
    const [isWalletNameChecked, setIsWalletNameChecked] = useState(false)
    const [isWalletPwdChecked, setIsWalletPwdChecked] = useState(false)
    const [isWalletPwd2Checked, setIsWalletPwd2Checked] = useState(false)

    const toast = useRef()
    const toCreateWallet = async () => {
        console.log('to create wallet---', walletName, walletPwd, walletPwd2)
        if (!checkName() || !toCheckPassword() || !checkPassword2()) return;
        let mnemonic = await createMnemonic()
        let result = await createWallet2(walletPwd, walletName, mnemonic, true)
        //创建钱包成功
        if (result) {
            setIsCreated(true)
            navigation.navigate('BackupStep1', { mnemonic: mnemonic.split(' '), account: result, type: 'create' })
        }
        else {
            toast.current.show(I18n.t('common.createWalletFailed'));
        }

    }

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

    //检查密码是否一致
    const checkPassword2 = () => {
        if (walletPwd != walletPwd2) {
            setIsWalletPwd2Checked(true)
            return false;
        }
        setIsWalletPwd2Checked(false)
        return true;
    }

    return (
        <View style={styles.cwMainContainer}>
            <View style={styles.topContainer}>
                <Text style={styles.inputTitle}>{I18n.t('createWallet.walletName')}</Text>
                <TextInput
                    style={[normalInputStyle, styles.inputMargin]}
                    placeholder={I18n.t('createWallet.walletNameP')}
                    onChangeText={text => onChangeName(text)}
                    value={walletName}
                    onBlur={checkName}
                    maxLength={12}
                >
                </TextInput>
                <View style={comTipView}>{isWalletNameChecked ? <Text style={comTip}>{I18n.t('createWallet.nameMsg')}</Text> : null}</View>
                <Text style={styles.inputTitle}>{I18n.t('createWallet.pwd')}</Text>
                <TextInput
                    style={normalInputStyle}
                    placeholder={I18n.t('createWallet.pwdP')}
                    onChangeText={text => onChangePwd(text)}
                    value={walletPwd}
                    onBlur={toCheckPassword}
                    secureTextEntry={true}
                >
                </TextInput>
                <View style={comTipView}>{isWalletPwdChecked ? <Text style={comTip}>{I18n.t('createWallet.pwdMsg')}</Text> : null}</View>
                <TextInput
                    style={[normalInputStyle, styles.inputMargin]}
                    placeholder={I18n.t('createWallet.pwd2P')}
                    onChangeText={text => onChangePwd2(text)}
                    value={walletPwd2}
                    onBlur={checkPassword2}
                    secureTextEntry={true}
                >
                </TextInput>
                <View style={comTipView}>{isWalletPwd2Checked ? <Text style={comTip}>{I18n.t('createWallet.pwdMsg3')}</Text> : null}</View>
                <Text style={[styles.msgTip, styles.msgTip1]}>{I18n.t('createWallet.msg')}</Text>
                <Text style={[styles.msgTip, styles.msgTip2]}>{I18n.t('createWallet.msg1')}</Text>
                <Text style={[styles.msgTip, styles.msgTip2]}>{I18n.t('createWallet.msg2')}</Text>
                <Text style={[styles.msgTip, styles.msgTip2]}>{I18n.t('createWallet.msg3')}</Text>
            </View>
            <View style={normalBtnView}>
                <TouchableOpacity style={normalBtnStyle} onPress={toCreateWallet} >
                    <Text style={normalBtnText}>{!isCreated ? I18n.t('createWallet.createWallet') : I18n.t('createWallet.createWalletPending')}</Text>
                </TouchableOpacity>
            </View>

            <Toast ref={toast} position='top' positionValue={10}></Toast>
        </View >
    )
}

export default connect(
    state => ({
        accounts: state.accounts,
    }),
    {
    }
)(CreateWallet)