import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ImageBackground, Alert } from 'react-native'
import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'

import { unitWidth, winWidth } from '../../assets/js/AdapterUtil'
import { CHAIN_COMPVERSE } from '../../constants/chain'
import I18n from '../../i18n/i18n'
import { COMPVERSE2_DECIMALS_B, compverse2_getBalance, compverse2_getTokenBalance } from '../../chain'
import { setCurrentBalance, setTokenBalance } from '../../redux/actions/assetAction'
import { balanceFixed, addressFixed, AddressCopy } from '../../util/tool'
import { updateCurrentAccount } from '../../util/accounts'

const WalletHome = ({ navigation, currentNet, currentAssets, currentAccount, accounts, setCurrentBalance, setTokenBalance }) => {
    const [currentLogo, setCurrentLogo] = useState()
    const [currentLogoAsset, setCurrentLogoAsset] = useState()
    const [isShowSelect, setIsShowSelect] = useState(false)
    const [walletList, setWalletList] = useState([])

    useEffect(() => {
        console.log("12", currentNet.chain)
        setWalletList(getData(currentNet.chain))
        switch (currentNet.chain) {
            case CHAIN_COMPVERSE:
                setCurrentLogo(require("../../images/logo.png"));
                setCurrentLogoAsset(require("../../images/logo_60x60.png"));
                getCompverseAssets();
                break;
            default:
                break;
        }
    }, [])

    /**
     * 获取Compverse2资产余额
     */
    const getCompverseAssets = async () => {
        getCompverseDefaultBalance();
        getCompverseTokenBalance();
    }

    /**
     * 获取CVERSE余额
     */
    const getCompverseDefaultBalance = async () => {
        const balance = await compverse2_getBalance(currentAccount.address);
        if (balance.data && balance.data.result) {
            const amount = (new BigNumber(balance.data.result).dividedBy(COMPVERSE2_DECIMALS_B)).toFixed();
            setCurrentBalance(amount);
        }
    }

    /**
     * 获取Compverse2 Token余额
     */
    const getCompverseTokenBalance = () => {
        currentAssets.assets.map(async (item, index) => {
            const balance = await compverse2_getTokenBalance(item, currentAccount.address);
            if (balance) {
                setTokenBalance(balance, item.address);
            }
        })
    }

    /**
     * 切换钱包
     */
    const onSelectWallet = () => {
        setIsShowSelect(true)
    }

    /**
     * 跳转钱包管理
     */
    const goManager = () => {
        setIsShowSelect(false)

        navigation.navigate('walletManager')
    }

    const getData = (chainName) => {
        let index = accounts.findIndex(item => item.chainName == chainName)
        if (index != -1) {
            return accounts[index].accounts
        }
        return []
    }

    /**
     * 跳转收款
     */
    const toReceive = () => {
        navigation.navigate('Receive', { address: currentAccount.address, chain: currentAccount.chainName })
    }

    return (
        <View style={styles.walletWrap}>
            <Text style={styles.line}></Text>
            {/* 顶部 */}
            <View style={styles.topWrap}>
                <TouchableOpacity onPress={onSelectWallet}>
                    <View style={styles.titleWrap} >
                        <Image style={styles.logo} source={currentLogo}></Image>
                        <Text style={styles.textSize}>{currentNet.chain}</Text>
                        <Image style={styles.right} source={require("../../images/right.png")}></Image>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ScanQRCode', {
                    type: 'transfer'
                })}>
                    <Image style={styles.scan} source={require("../../images/scan.png")}></Image>
                </TouchableOpacity>
            </View>

            {/*  钱包余额卡片 */}
            <ImageBackground style={styles.walletCard} source={require("../../images/homeCard.png")}>
                <View style={styles.balaceWrap}>
                    <Text style={styles.balaceTitle}>{I18n.t('wallet.accountBalance')}({currentAssets.defaultAsset.name})</Text>
                    {/* <Image style={styles.eyeIcon} source={require("../../images/eye-icon.png")}></Image> */}
                </View>
                <Text style={styles.balanceText}>{currentAssets.defaultAsset.balance > 0 ? balanceFixed(currentAssets.defaultAsset.balance) : 0}</Text>
                <View style={styles.rowWrap}>
                    <Text style={[styles.whiteTextSize, styles.adText]}>{currentAccount.address.slice(0, 6) + '...' + currentAccount.address.slice(-6)}</Text>
                    <TouchableOpacity onPress={() => AddressCopy(currentAccount.address)}>
                        <Image style={styles.adIcon} source={require("../../images/copy.png")}></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowWrap}>
                    <TouchableOpacity activeOpacity={0.5} style={styles.buttonItem} onPress={() => navigation.navigate('TransCompverse')}>
                        <Image style={styles.iconTrans} source={require("../../images/transfer.png")}></Image>
                        <Text style={[styles.textSize, styles.whiteTextSize]}>{I18n.t('wallet.transfer')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} style={styles.buttonItem} onPress={toReceive} >
                        <Image style={styles.iconReceive} source={require("../../images/receiving.png")}></Image>
                        <Text style={[styles.textSize, styles.whiteTextSize]}>{I18n.t('wallet.receiving')}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            {/* 资产列表 */}
            <View style={{ marginTop: 20 }}>
                <View style={styles.rowWrap}>
                    <Text style={styles.textSize, styles.assetsTitle}>{I18n.t('wallet.asset')}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('AddAsset')}>
                        <Image style={{ width: 20, height: 20 }} source={require("../../images/add-icon.png")}></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.assetsItem}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: 30, height: 30, marginRight: 13 }} source={currentLogoAsset}></Image>
                        <Text style={styles.textSize}>{currentAssets.defaultAsset.name}</Text>
                    </View>
                    <Text style={styles.textSize}>{currentAssets.defaultAsset.balance > 0 ? balanceFixed(currentAssets.defaultAsset.balance) : 0}</Text>
                </View>
                {
                    currentAssets.assets.map((item, index) => {
                        return (
                            <View style={styles.assetsItem} key={index}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={{ width: 30, height: 30, marginRight: 13 }} source={require("../../images/logoDefault.png")}></Image>
                                    <Text style={styles.textSize}>{item.name}</Text>
                                </View>
                                <Text style={styles.textSize}>{item.balance}</Text>
                            </View>
                        )
                    })
                }
            </View>

            {/* 选择钱包卡片 */}
            <Modal visible={isShowSelect} animationType="slide" style={{ flex: 1 }} transparent={true}>
                <View style={styles.walletModalWrap}>
                    <View style={styles.walletContent}>
                        <View style={styles.walletTitleWrap}>
                            <TouchableOpacity onPress={() => setIsShowSelect(false)}>
                                <Image style={{ width: 22, height: 22, position: 'relative', left: -28 }} source={require("../../images/close.png")}></Image>
                            </TouchableOpacity>
                            <Text style={{ ...styles.textSize, fontSize: 16 }}>{I18n.t('wallet.changeAccount')}</Text>
                            <TouchableOpacity onPress={goManager}>
                                <Image style={{ width: 22, height: 22, position: 'relative', right: -20 }} source={require("../../images/walletSettings.png")}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{ ...styles.rowWrap, height: '100%', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                            <View style={{ width: unitWidth * 124, backgroundColor: '#fff', height: '100%' }}>
                                <View style={styles.walletItemActive}>
                                    <Image style={{ width: 30, height: 30 }} source={require("../../images/logo_60x60.png")}></Image>
                                </View>
                            </View>

                            <View style={{ paddingTop: 14, paddingLeft: 15 }}>
                                <Text style={{ ...styles.textSize, marginBottom: 15 }}>COMPVERSE</Text>
                                {
                                    walletList.map((walletItem, index) => {
                                        return <ImageBackground source={require('../../images/wallet-bg.png')} style={styles.walletBg} key={index}>
                                            <TouchableOpacity onPress={() => updateCurrentAccount(walletItem)} style={{ width: '100%', height: '100%' }}>
                                                <View style={styles.walletInfoWrap}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text style={[styles.textSize, styles.whiteTextSize]}>{walletItem.name}</Text>
                                                        {
                                                            walletItem.isHD ? <Text style={styles.hd}>HD</Text> : null
                                                        }
                                                    </View>
                                                    <View style={{ ...styles.rowWrap, justifyContent: 'flex-start', marginTop: 2 }}>
                                                        <Text style={[styles.whiteTextSize, styles.adText]}>{walletItem.address.slice(0, 6) + "..." + walletItem.address.slice(-6)}</Text>
                                                        <TouchableOpacity onPress={() => AddressCopy(walletItem.address)}>
                                                            <Image style={{ width: 17, height: 17, marginLeft: 6 }} source={require("../../images/copy.png")}></Image>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{ ...styles.rowWrap, justifyContent: 'flex-start', marginTop: 8 }}>
                                                        <Text style={{ ...styles.whiteTextSize, fontSize: 12, fontWeight: '400' }}>{I18n.t('wallet.accountBalance')} : </Text>
                                                        <Text style={{ ...styles.textSize, color: '#fff', fontWeight: '500' }}>573.21</Text>
                                                    </View>
                                                    {
                                                        walletItem.address == currentAccount.address ? <Image style={styles.checkImg} source={require('../../images/select.png')}></Image> : null
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    })
                                }
                            </View>

                        </View>
                    </View>
                </View>
            </Modal >

        </View >
    )
}

export default connect(
    state => ({
        currentNet: state.netReducer.currentNet,
        currentAccount: state.currentAccount,
        currentAssets: state.assetReducer.currentAssets,
        accounts: state.accounts,
        currentAccount: state.currentAccount
    }),
    {
        setCurrentBalance,
        setTokenBalance
    }
)(WalletHome)

const styles = StyleSheet.create({
    titleWrap: {
        flexDirection: 'column',
    },
    rowWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textSize: {
        fontSize: 14,
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        color: '#222222',
        lineHeight: 20,
        fontWeight: '400'
    },
    whiteTextSize: {
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        color: '#fff'
    },
    walletWrap: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        paddingLeft: unitWidth * 30,
        paddingRight: unitWidth * 30,
        position: 'relative'
    },
    line: {
        position: 'absolute',
        width: winWidth,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: '#F9F9F9',
        top: 40,
        left: 0
    },
    topWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    logo: {
        width: unitWidth * 36,
        height: unitWidth * 40,
        marginRight: 6,
    },
    right: {
        width: unitWidth * 24,
        height: unitWidth * 24,
        marginLeft: 6
    },
    titleWrap: {
        width: unitWidth * 302,
        height: unitWidth * 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F9F9F9',
        borderStyle: 'solid'
    },
    walletCard: {
        height: unitWidth * 388,
        borderRadius: 14,
        marginTop: 30,
        paddingTop: unitWidth * 40,
        paddingLeft: unitWidth * 52,
        paddingRight: unitWidth * 52,
        paddingBottom: unitWidth * 42
    },
    balaceWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: unitWidth * 34
    },
    adIcon: {
        width: unitWidth * 38,
        height: unitWidth * 38,
        marginLeft: 10
    },
    balaceTitle: {
        fontSize: 16,
        lineHeight: 22,
        color: '#fff',
        fontFamily: 'PingFangSC-Medium, PingFang SC',

    },
    eyeIcon: {
        width: unitWidth * 48,
        height: unitWidth * 36,
    },
    balanceText: {
        fontSize: 24,
        height: 31,
        color: '#fff',
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        marginBottom: unitWidth * 32
    },
    adText: {
        fontSize: 12,
        color: '#B5C0FC'
    },
    scan: {
        width: unitWidth * 48,
        height: unitWidth * 44
    },
    iconTrans: {
        width: unitWidth * 40,
        height: unitWidth * 40,
        marginRight: 10
    },
    iconReceive: {
        width: unitWidth * 40,
        height: unitWidth * 32,
        marginRight: 10
    },
    buttonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: unitWidth * 16,
        borderWidth: 2,
        borderColor: '#ffffff',
        borderStyle: 'solid',
        width: unitWidth * 258,
        height: unitWidth * 68,
        marginTop: unitWidth * 32
    },
    assetsTitle: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22
    },
    assetsItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24
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
        height: '90%',
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
        width: 20,
        height: 20,
        position: 'absolute',
        right: unitWidth * 30,
        top: unitWidth * 64
    }
})