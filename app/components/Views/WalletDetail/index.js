import React, { useEffect } from "react"
import { StyleSheet, Dimensions, View, StatusBar, Image, TouchableOpacity, Text } from 'react-native'

import I18n from '../../../i18n/i18n'
import { normalBtnStyle } from "../../../styles/comBtn"
import { connect } from "react-redux"
import { ALL_ACCOUNTS } from "../../../constants/storage"
import { updateAccounts } from "../../../util/accounts"
import { winWidth } from "../../../assets/js/AdapterUtil"
import { baseStyles, colors, fontStyles } from "../../../styles/common"

const walletDetail = ({ route, navigation, accounts, currentAccount }) => {
    const account = route.params.account
    const chainName = route.params.chainName
    const deleteWallet = () => {
        updateAccounts(account)
        navigation.navigate('walletManager')
    }

    return <View style={{ paddingTop: 2, flex: 1 }}>
        <View style={{ ...styles.centerWrap, backgroundColor: '#fff', height: 72 }}>
            <View style={{ ...styles.rowWrap, justifyContent: 'flex-start' }}>
                <Image style={{ width: 40, height: 42, marginRight: 10 }} source={require("../../../images/compverse.png")}></Image>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.textSize}>{account?.name}</Text>
                        <Image style={{ width: 16, height: 16, marginLeft: 8 }} source={require("../../../images/edit.png")}></Image>
                    </View>
                    <Text style={styles.textSize2}>{I18n.t('walletDetail.manageWallet')}</Text>
                </View>
            </View>
        </View>

        <View style={{ backgroundColor: '#fff', marginTop: 14, alignItems: 'center' }}>
            <View style={styles.topContent}>
                <Text style={styles.itemText}>{I18n.t('walletDetail.walletAddress')}</Text>
                <Text style={styles.textSize}>{account.address.slice(0, 6) + "..." + account.address.slice(-6)}</Text>
            </View>
            <TouchableOpacity style={styles.boxWrap} onPress={() => navigation.navigate('ExportPrivateStep1', {
                type: "privateKey",
                account
            })}>
                <View style={styles.ItemWrap}>
                    <Text style={styles.itemText}>{I18n.t('walletDetail.exportPrikey')}</Text>
                    <Image style={{ width: 9, height: 16 }} source={require("../../../images/next.png")}></Image>
                </View>
            </TouchableOpacity>
            {
                account.mnemonic ? <TouchableOpacity style={styles.boxWrap} onPress={() => navigation.navigate('ExportPrivateStep1', {
                    type: "mnemonic ",
                    account
                })}>
                    <View style={styles.ItemWrap}>
                        <Text style={styles.itemText}>{I18n.t('walletDetail.exportMne')}</Text>
                        <Image style={{ width: 9, height: 16 }} source={require("../../../images/next.png")}></Image>
                    </View>
                </TouchableOpacity> : null
            }
        </View>
        {
            !account.isHD && currentAccount.address == account.address ? <View style={styles.btnWrap}>
                <TouchableOpacity style={styles.nextBtn} onPress={deleteWallet}>
                    <Text style={{ ...styles.largeSize, color: '#fff' }}>{I18n.t('comDeleteWallet')}</Text>
                </TouchableOpacity>
            </View> : null
        }

    </View>
}

const styles = StyleSheet.create({
    rowWrap: {
        width: 355,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    centerWrap: {
        flexDirection: 'row',
        ...baseStyles.flexCenter
    },
    textSize: {
        ...fontStyles.normal,
        ...fontStyles.smallSize,
        color: colors.fontDark
    },
    textSize2: {
        ...fontStyles.normal,
        ...fontStyles.tinySize,
        color: colors.fontGray
    },
    largeSize: {
        ...fontStyles.normal,
        ...fontStyles.normalSize,
        color: colors.fontPrimary
    },
    topContent: {
        width: 355,
        height: 78,
        justifyContent: 'center'
    },
    boxWrap: {
        width: winWidth,
        alignItems: 'center',
        borderColor: colors.bgNormal,
        borderStyle: 'solid',
        borderTopWidth: 1
    },
    ItemWrap: {
        width: 355,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 52,
    },
    itemText: {
        ...fontStyles.normal,
        ...fontStyles.normalSize,
        color: colors.fontDark
    },
    btnWrap: {
        ...baseStyles.flexCenter,
        backgroundColor: colors.white,
        height: 66,
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    nextBtn: {
        ...normalBtnStyle,
        width: 335,
    }
})
export default connect(
    state => ({
        accounts: state.accounts,
        currentAccount: state.currentAccount
    }),
    {

    }
)(walletDetail)
