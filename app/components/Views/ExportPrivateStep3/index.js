import React, { useEffect, useState, useRef } from "react"
import { StyleSheet, View, Image, Text, TouchableOpacity, Modal } from 'react-native'
import { connect } from "react-redux"
import Clipboard from '@react-native-clipboard/clipboard'
import Toast from 'react-native-easy-toast'

import { colors, baseStyles, fontStyles } from '../../../styles/common'
import { normalBtnStyle, normalBtnText } from '../../../styles/comBtn'
import DeviceStorage from "../../../util/DeviceStorage"
import I18n from '../../../i18n/i18n'

const ExportPrivateStep3 = ({ route, navigation }) => {
    const [isShowTip, setIsShowTip] = useState(true)
    const [isLook, setIsLook] = useState(false)  //是否已查看注意事项
    const [userInfo, setUserInfo] = useState({})  //存储用户信息

    const toast = useRef()

    useEffect(() => {
        getUserInfo()
    }, [])

    //从react-redux或者本地存储获取用户信息
    const getUserInfo = async () => {
        let address = route.params.account.address
        let privateKey = route.params.privateKey
        setUserInfo({
            address,
            privateKey
        })
    }

    // 取消
    const onCancel = () => {
        if (!isLook) return
        setIsShowTip(false)
        setIsLook(false)
    }

    const doCopy = (text) => {
        Clipboard.setString(text);
        toast.current.show(I18n.t('common.copySuccess'));
    }

    //复制
    const oncopy = (text) => {
        if (!isLook) return
        Clipboard.setString(text);
        toast.current.show(I18n.t('common.copySuccess'));
        setIsShowTip(false)
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.warp}>
                <Image style={{ width: 29, height: 29 }} source={require('../../../images/fail.png')}></Image>
                <Text style={styles.titleTip}>{I18n.t('common.safeMsg5')}</Text>
            </View>
            <View style={styles.itemWrap}>
                <Text style={styles.largeSize}>CVERSE{I18n.t('common.address')}</Text>
                <Text style={styles.address}>{userInfo?.address}</Text>
                <TouchableOpacity style={styles.copy} onPress={() => doCopy(userInfo.address)}>
                    <Image style={{ width: 18, height: 18 }} source={require('../../../images/blue-copy.png')}></Image>
                </TouchableOpacity>
            </View>
            <View style={{ ...styles.itemWrap, height: 94 }}>
                <Text style={styles.largeSize}>CVERSE{I18n.t('exportPriStep3.privateKey')}</Text>
                <Text style={styles.address}>{userInfo?.privateKey}</Text>
                <TouchableOpacity style={styles.copy} onPress={() => setIsShowTip(true)}>
                    <Image style={{ width: 18, height: 18 }} source={require('../../../images/blue-copy.png')}></Image>
                </TouchableOpacity>
            </View>
            <Text style={styles.tips}>{I18n.t('exportPriStep3.text')}</Text>
            <View style={styles.btnWrap}>
                <TouchableOpacity style={styles.nextBtn} onPress={() => navigation.navigate('walletManager')}>
                    <Text style={{ ...styles.largeSize, color: '#fff' }}>{I18n.t('exportPriStep3.backupComplete')}</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={isShowTip} animationType="slide" style={{ flex: 1 }} transparent={true}>
                <View style={styles.tipModalWrap}>
                    <View style={styles.tipContent}>
                        <View style={{ width: 295, alignItems: 'center' }}>
                            <Text style={styles.notice}>{I18n.t('exportPriStep3.careful')}</Text>
                            <Text style={styles.contentItem}>{I18n.t('exportPriStep3.msg')}</Text>
                            <Text style={styles.contentItem}>{I18n.t('exportPriStep3.msg1')}</Text>
                            <Text style={styles.contentItem}>{I18n.t('exportPriStep3.msg2')}</Text>
                            <Text style={styles.contentItem}>{I18n.t('exportPriStep3.msg3')}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: 285, alignItems: 'center', marginTop: 4 }}>
                                <TouchableOpacity style={styles.circle} onPress={() => setIsLook(!isLook)}>
                                    <Text style={isLook ? styles.circleBox : null}></Text>
                                </TouchableOpacity>
                                <Text style={styles.tipmsg}>{I18n.t('exportPriStep3.known')}</Text>
                            </View>
                        </View>
                        <View style={styles.buttonWrap}>
                            <TouchableOpacity style={{ ...styles.tabItem, borderRightWidth: 1 }} onPress={onCancel}>
                                <Text style={!isLook ? styles.offTip : styles.onCancelTip}>{I18n.t('common.cancel')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tabItem} onPress={() => oncopy(userInfo.privateKey)}>
                                <Text style={!isLook ? styles.offTip : styles.onCopyTip}>{I18n.t('common.copy')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal >

            <Toast ref={toast} position='top' positionValue={10}></Toast>
        </View>
    )
}

export default connect(
    state => ({}),
)(ExportPrivateStep3)

const styles = StyleSheet.create({
    mainContainer: {
        ...baseStyles.flexGrow,
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 40,
        backgroundColor: colors.bgNormal,
    },
    warp: {
        width: 355,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleTip: {
        marginTop: 16,
        ...fontStyles.normal,
        ...fontStyles.smallSize,
        color: '#FF2100'
    },
    itemWrap: {
        marginTop: 18,
        width: 355,
        height: 80,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 68,
        backgroundColor: '#fff',
        borderColor: "#e3e3e3",
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 7,
        position: 'relative'
    },
    largeSize: {
        ...fontStyles.normal,
        ...fontStyles.smallSize,
        color: '#333'
    },
    address: {
        marginTop: 6,
        ...fontStyles.normal,
        color: '#B9B9B9',
        fontSize: 10,
        lineHeight: 14
    },
    copy: {
        width: 18,
        height: 18,
        position: 'absolute',
        right: 20,
        top: '48%'
    },
    tips: {
        width: 340,
        marginTop: 10,
        ...fontStyles.normal,
        ...fontStyles.tinySize,
        color: '#333',
        lineHeight: 17
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
    },
    tipModalWrap: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tipContent: {
        bottom: 0,
        width: 335,
        height: 385,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderRadius: 4,
        alignItems: 'center',
        paddingTop: 20,
        position: 'relative'
    },
    notice: {
        marginBottom: 20,
        ...fontStyles.medium,
        ...fontStyles.normalSize,
        color: '#222'
    },
    contentItem: {
        ...fontStyles.normal,
        ...fontStyles.smallSize,
        color: '#222',
        lineHeight: 17,
        marginBottom: 16
    },
    circle: {
        width: 17,
        height: 17,
        borderRadius: 14,
        borderStyle: 'solid',
        borderColor: "#0059E7",
        borderWidth: 1,
        padding: 2,
    },
    circleBox: {
        width: 11,
        height: 11,
        borderRadius: 11,
        backgroundColor: "#0059E7"
    },
    tipmsg: {
        ...fontStyles.normal,
        ...fontStyles.smallSize,
        color: "#0059E7",
        marginLeft: 4
    },
    buttonWrap: {
        position: 'absolute',
        bottom: 0,
        height: 53,
        width: '100%',
        borderStyle: 'solid',
        borderColor: '#f9f9f9',
        borderWidth: 1,
        flexDirection: 'row',
    },
    tabItem: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: '#f9f9f9',
        borderWidth: 0,
    },
    offTip: {
        ...fontStyles.normal,
        ...fontStyles.smallSize,
        color: "#333"
    },
    onCancelTip: {
        ...fontStyles.normal,
        ...fontStyles.smallSize,
        color: "#FF2100"
    },
    onCopyTip: {
        ...fontStyles.normal,
        ...fontStyles.smallSize,
        color: "#0059E7"
    }
})