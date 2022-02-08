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
        backgroundColor: colors.white
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

const BackupStep1 = ({ route, navigation }) => {

    const toShowMnemonic = () => {
        navigation.navigate('BackupStep2', { mnemonic: route.params.mnemonic, account: route.params.account, type: route.params.type })
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
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
                    onPress={toShowMnemonic}
                    style={normalBtnStyle}
                >
                    <Text style={normalBtnText}>{I18n.t('backupStep1.showMnemonic')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BackupStep1