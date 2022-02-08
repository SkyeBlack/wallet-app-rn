import React from "react"
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

import { colors, baseStyles, fontStyles } from '../../../styles/common'
import { normalBtnStyle, normalBtnText } from '../../../styles/comBtn'
import I18n from '../../../i18n/i18n'

const styles = StyleSheet.create({
    mainContainer: {
        ...baseStyles.flexGrow,
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingBottom: 40,
        backgroundColor: colors.bgNormal,

    },
    title: {
        ...fontStyles.medium,
        fontSize: 20,
        color: '#222'
    },
    boxTip: {
        marginTop: 15,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: 310,
        height: 33,
        backgroundColor: '#DFE8F6',
        borderRadius: 8
    },
    tipText: {
        ...fontStyles.normal,
        ...fontStyles.smallSize,
        color: '#0059E7'
    },
    topContainer: {
        paddingLeft: 36,
        paddingRight: 36
    },
    tipRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 50,
    },
    tipImgs: {
        width: 40,
        height: 40,
        ...baseStyles.flexCenter,
        paddingRight: 10
    },
    tipImg1: {
        width: 40,
        height: 40
    },
    tipImg2: {
        width: 30,
        height: 30
    },
    tipImg3: {
        width: 30,
        height: 30
    },
    tipImg4: {
        width: 30,
        height: 27
    },
    tipMsg: {
        ...baseStyles.flexGrow,
        ...fontStyles.normal,
        ...fontStyles.smallSize,
        color: colors.fontPrimary,
        lineHeight: 20
    },
    bottonBtn: {
        ...baseStyles.containerPadding
    }
});

const ExportPrivateStep2 = ({ route, navigation }) => {
    const account = route.params.account
    const privateKey = route.params.privateKey

    return (
        <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.title}>{I18n.t('exportPriStep2.msg')}</Text>
                    <View style={styles.boxTip}><Text style={styles.tipText}>{I18n.t('common.safeMsg5')}</Text></View>

                </View>
                <View style={styles.tipRow}>
                    <View style={styles.tipImgs}>
                        <Image style={styles.tipImg1} source={require('../../../images/backup1.png')}></Image>
                    </View>
                    <Text style={styles.tipMsg}>{I18n.t('common.safeMsg1')}</Text>
                </View>
                <View style={styles.tipRow}>
                    <View style={styles.tipImgs}>
                        <Image style={styles.tipImg2} source={require('../../../images/backup2.png')}></Image>
                    </View>
                    <Text style={styles.tipMsg}>{I18n.t('common.safeMsg2')}</Text>
                </View>
                <View style={styles.tipRow}>
                    <View style={styles.tipImgs}>
                        <Image style={styles.tipImg3} source={require('../../../images/backup3.png')}></Image>
                    </View>
                    <Text style={styles.tipMsg}>{I18n.t('common.safeMsg3')}</Text>
                </View>
                <View style={styles.tipRow}>
                    <View style={styles.tipImgs}>
                        <Image style={styles.tipImg4} source={require('../../../images/backup4.png')}></Image>
                    </View>
                    <Text style={styles.tipMsg}>{I18n.t('common.safeMsg4')}</Text>
                </View>
            </View>
            <View style={styles.bottonBtn}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ExportPrivateStep3', {
                        account,
                        privateKey
                    })}
                    style={normalBtnStyle}
                >
                    <Text style={normalBtnText}>{I18n.t('exportPriStep2.known')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ExportPrivateStep2