import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native'

import { colors, baseStyles, fontStyles } from '../../styles/common'
import I18n from '../../i18n/i18n'

const styles = StyleSheet.create({
    mainContainer: {
        ...baseStyles.flexGrow,
        ...baseStyles.tinyPadding,
        paddingTop: 10,
        backgroundColor: colors.bgNormal
    },
    container1: {
        marginBottom: 15,
        ...baseStyles.containerPadding,
        backgroundColor: colors.white,
        borderRadius: 8
    },
    navItem: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    navImgWallet: {
        width: 22,
        height: 19
    },
    navImgAddress: {
        width: 21,
        height: 22
    },
    navImgUpdate: {
        width: 21,
        height: 21
    },
    navText: {
        paddingLeft: 10,
        ...fontStyles.normal,
        ...fontStyles.smallSize,
        color: colors.fontDark
    },
    navBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    navLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navRight: {
        ...fontStyles.normal,
        ...fontStyles.smallSize,
        color: colors.fontGray
    },
    divLine: {
        height: 1,
        backgroundColor: colors.borderLight
    }
})

export const Settings = ({ navigation }) => {
    const toWalletManage = () => {
        navigation.navigate('walletManager')
    }

    const toAddressBook = () => {
        navigation.navigate('AddressBook')
    }

    const toUpdate = () => {
        console.log('update')
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container1}>
                <TouchableOpacity onPress={toWalletManage} style={styles.navItem}>
                    <Image style={styles.navImgWallet} source={require('../../images/settingWallet.png')}></Image>
                    <Text style={styles.navText}>{I18n.t('setting.walletManage')}</Text>
                </TouchableOpacity>
                <View style={styles.divLine}></View>
                <TouchableOpacity onPress={toAddressBook} style={styles.navItem}>
                    <Image style={styles.navImgAddress} source={require('../../images/settingAddress.png')}></Image>
                    <Text style={styles.navText}>{I18n.t('setting.addressBook')}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container1}>
                <TouchableOpacity onPress={toUpdate} style={[styles.navItem, styles.navBetween]}>
                    <View style={styles.navLeft}>
                        <Image style={styles.navImgUpdate} source={require('../../images/settingUpdate.png')}></Image>
                        <Text style={styles.navText}>{I18n.t('setting.checkUpdate')}</Text>
                    </View>
                    <Text style={styles.navRight}>v0.0.1</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}