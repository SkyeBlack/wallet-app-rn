import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ImageBackground, Alert } from 'react-native'
import { connect } from 'react-redux'
import Clipboard from '@react-native-clipboard/clipboard'
import { unitWidth } from '../../../assets/js/AdapterUtil'
import I18n from '../../../i18n/i18n'
import { AddressCopy } from '../../../util/tool'

const walletManager = ({ navigation, accounts, currentNet }) => {
    const [isShowAddModal, setIsShowAddModal] = useState(false)
    const [walletList, setWalletList] = useState([])
    const [chainName, setChainName] = useState('')


    useEffect(() => {
        setWalletList(InitData(currentNet.chain))
    }, [])
    const InitData = (chainName) => {
        let index = accounts.findIndex(item => item.chainName == chainName)
        if (index != -1) {
            return accounts[index].accounts
        }

    }
    const toLeadWallet = (key) => {
        setIsShowAddModal(false)
        navigation.navigate('LeadPrivate', {
            key
        })
    }
    const toDetail = (account) => {
        navigation.navigate('WalletDetail', {
            account,
            chainName
        })
    }

    const toCreateWallet = () => {
        setIsShowAddModal(false)
        navigation.navigate('CreateAgain')
    }

    return <View style={{ backgroundColor: 'F3F7FA' }}>
        <View style={{ ...styles.rowWrap, height: '100%', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <View style={{ width: unitWidth * 124, backgroundColor: '#fff', height: '100%' }}>
                <View style={styles.walletItemActive}>
                    <Image style={{ width: 30, height: 30 }} source={require("../../../images/logo_60x60.png")}></Image>
                </View>
            </View>

            <View style={{ paddingTop: 14, paddingLeft: 15 }}>
                <Text style={{ ...styles.textSize, marginBottom: 15 }}>COMPVERSE</Text>

                {walletList.map((wallet, index) => {
                    return <TouchableOpacity onPress={() => toDetail(wallet)} key={index}>
                        <ImageBackground source={require('../../../images/wallet-bg.png')} style={styles.walletBg}>
                            <View style={styles.walletInfoWrap}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[styles.textSize, styles.whiteTextSize]}>{wallet.name}</Text>
                                    {
                                        wallet.isHD ? <Text style={styles.hd}>HD</Text> : null
                                    }
                                </View>
                                <View style={{ ...styles.rowWrap, justifyContent: 'flex-start', marginTop: 2 }}>
                                    <Text style={[styles.whiteTextSize, styles.adText]}>{wallet.address.slice(0, 6) + "..." + wallet.address.slice(-6)}</Text>
                                    <TouchableOpacity onPress={() => AddressCopy(wallet.address)}>
                                        <Image style={{ width: 17, height: 17, marginLeft: 6 }} source={require("../../../images/copy.png")}></Image>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ ...styles.rowWrap, justifyContent: 'flex-start', marginTop: 8 }}>
                                    <Text style={{ ...styles.whiteTextSize, fontSize: 12, fontWeight: '400' }}>{I18n.t('wallet.accountBalance')} : </Text>
                                    <Text style={{ ...styles.textSize, color: '#fff', fontWeight: '500' }}>573.21</Text>
                                </View>
                                <Image style={styles.checkImg} source={require('../../../images/point.png')}></Image>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                })}
                <TouchableOpacity onPress={() => setIsShowAddModal(true)} style={{ ...styles.rowWrap, ...styles.walletBg, justifyContent: 'center', backgroundColor: '#fff', height: unitWidth * 100 }}>
                    <Image style={{ width: 20, height: 20, marginRight: 6 }} source={require("../../../images/add-icon.png")}></Image>
                    <Text style={{ ...styles.textSize, color: '#333333' }}>{I18n.t('walletManage.addAccount')}</Text>
                </TouchableOpacity>
            </View>

        </View>
        {/* 添加钱包卡片 */}
        <Modal visible={isShowAddModal} animationType="slide" style={{ flex: 1 }} transparent={true}>
            <View style={styles.walletModalWrap}>
                <View style={styles.walletContent}>
                    <View style={{ ...styles.centerWrap, marginTop: 20 }}>
                        <Image style={{ width: 30, height: 30 }} source={require("../../../images/logo_60x60.png")}></Image>
                        <Text style={{ ...styles.textSize, marginLeft: 6 }}>CVERSE</Text>
                    </View>
                    <TouchableOpacity style={{ ...styles.centerWrap, ...styles.buttonWrap }} onPress={toCreateWallet}>
                        <Text style={styles.largeSize}>{I18n.t('common.createWallet')}</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={{ ...styles.centerWrap, ...styles.buttonWrap }} onPress={(key) => toLeadWallet(1)}>
                        <Text style={styles.largeSize}>{I18n.t('walletManage.leadPrikey')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.centerWrap, ...styles.buttonWrap }} onPress={(key) => toLeadWallet(2)}>
                        <Text style={styles.largeSize}>{I18n.t('walletManage.leadMne')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsShowAddModal(false)} style={{ ...styles.centerWrap, ...styles.buttonWrap, borderBottomWidth: 0 }}>
                        <Text style={styles.largeSize}>{I18n.t('common.cancel')}</Text>
                    </TouchableOpacity>
                </View>
            </View >
        </Modal >
    </View >
}
export default connect(
    state => ({
        accounts: state.accounts,
        currentNet: state.netReducer.currentNet,
    }),
    {}

)(walletManager)

const styles = StyleSheet.create({
    rowWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    centerWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textSize: {
        fontSize: 14,
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        color: '#222222',
        lineHeight: 20,
        fontWeight: '400'
    },
    largeSize: {
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        color: '#222222',
        lineHeight: 22,
        fontWeight: '400',
        fontSize: 16
    },
    whiteTextSize: {
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        color: '#fff'
    },
    walletContent: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '100%',
        height: unitWidth * 1300,
        backgroundColor: '#F3F7FA',
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    walletTitleWrap: {
        height: unitWidth * 110,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#EDF1F4',
        borderStyle: 'solid'
    },
    walletItem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: unitWidth * 124,
        height: unitWidth * 124,
    },
    walletItemActive: {
        justifyContent: 'center',
        alignItems: 'center',
        width: unitWidth * 124,
        height: unitWidth * 124,
        backgroundColor: '#F3F7FA'
    },
    walletInfoWrap: {
        borderRadius: 12,
        position: 'relative',
        paddingTop: unitWidth * 20,
        paddingLeft: unitWidth * 30,
        position: 'relative'
    },
    hd: {
        width: 25,
        height: 11,
        fontSize: 10,
        lineHeight: 11,
        textAlign: 'center',
        color: '#B5C0FC',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#B5C0FC',
        marginLeft: 8,
        position: 'relative',
        top: 1
    },
    walletBg: {
        height: unitWidth * 170,
        width: unitWidth * 566,
        marginBottom: 10
    },
    checkImg: {
        width: 26,
        height: 8,
        position: 'absolute',
        right: unitWidth * 30,
        top: unitWidth * 40
    },
    walletModalWrap: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    walletContent: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: unitWidth * 580,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        shadowColor: '#eee',
        shadowOffset: { h: 10, w: 10 },
        shadowRadius: 3,
        shadowOpacity: 0.8,
    },
    buttonWrap: {
        height: 62,
        borderBottomWidth: 1,
        borderBottomColor: '#E6E9ED',
        borderStyle: 'solid'
    }

})