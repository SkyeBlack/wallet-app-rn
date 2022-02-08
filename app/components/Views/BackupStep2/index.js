import React from "react"
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import { colors, baseStyles, fontStyles, otherStyles } from '../../../styles/common'
import { normalBtnStyle, normalBtnText } from '../../../styles/comBtn'
import { mneContainer, mneItem, mneNum, mneText } from '../../../styles/backupMnemonic'
import I18n from '../../../i18n/i18n'

const styles = StyleSheet.create({
    mainContainer: {
        ...baseStyles.flexGrow,
        justifyContent: 'space-between',
        ...baseStyles.containerPadding,
        paddingTop: 20,
        paddingBottom: 40,
        backgroundColor: colors.white
    },
    titleTip: {
        ...fontStyles.medium,
        ...fontStyles.normalSize,
        color: colors.fontPrimary,
        lineHeight: 25
    },
    msgTipsTitle: {
        ...fontStyles.normal,
        ...fontStyles.smallSize,
        color: colors.fontPrimary,
        lineHeight: 20
    },
    msgTips: {
        paddingLeft: 15
    },
    msgTipRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tipDisc: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.fontGray
    },
    msgTip: {
        ...fontStyles.normal,
        ...fontStyles.smallSize,
        color: colors.fontGray,
        lineHeight: 32,
        paddingLeft: 8
    }
});

const BackupStep2 = ({ route, navigation }) => {
    const mnemonic = route.params.mnemonic

    const toCheckMnemonic = () => {
        navigation.navigate('BackupStep3', { mnemonic: route.params.mnemonic, account: route.params.account, type: route.params.type })
    }

    return (
        <View style={styles.mainContainer}>
            <View>
                <Text style={styles.titleTip}>{I18n.t('backupStep2.title')}</Text>
                <Text style={styles.titleTip}>{I18n.t('backupStep2.text')}</Text>
                <View style={mneContainer}>
                    {mnemonic.map((item, index) => {
                        return (
                            <View style={mneItem} key={index}>
                                <Text style={mneNum}>{index}</Text>
                                <Text style={mneText}>{item}</Text>
                            </View>
                        )
                    })}
                </View>
                <Text style={styles.msgTipsTitle}>{I18n.t('backupStep2.msg')}</Text>
                <View style={styles.msgTips}>
                    <View style={styles.msgTipRow}>
                        <View style={styles.tipDisc}></View>
                        <Text style={styles.msgTip}>{I18n.t('backupStep2.msg1')}</Text>
                    </View>
                    <View style={styles.msgTipRow}>
                        <View style={styles.tipDisc}></View>
                        <Text style={styles.msgTip}>{I18n.t('backupStep2.msg2')}</Text>
                    </View>
                    <View style={styles.msgTipRow}>
                        <View style={styles.tipDisc}></View>
                        <Text style={styles.msgTip}>{I18n.t('backupStep2.msg3')}</Text>
                    </View>
                    <View style={styles.msgTipRow}>
                        <View style={styles.tipDisc}></View>
                        <Text style={styles.msgTip}>{I18n.t('backupStep2.msg4')}</Text>
                    </View>
                </View>
            </View>
            <View>
                <TouchableOpacity
                    onPress={toCheckMnemonic}
                    style={normalBtnStyle}
                >
                    <Text style={normalBtnText}>{I18n.t('backupStep2.toCheck')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BackupStep2