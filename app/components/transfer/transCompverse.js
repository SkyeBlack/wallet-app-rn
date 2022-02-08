import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity, TextInput, Slider, Image, Modal, Alert } from 'react-native';
import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import Toast from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { winHeight } from '../../assets/js/AdapterUtil'
import I18n from '../../i18n/i18n'
import { colors, baseStyles, fontStyles } from '../../styles/common'
import { normalBtnView, normalBtnStyle, normalBtnText } from '../../styles/comBtn'
import { bottomModal, bottomModalContainer, middleModal, middleModalContainer, middleModalTitle, middleModalTwoBtn, middleModalBtnLeft, middleModalBtnLeftText, middleModalBtnRight, middleModalBtnRightText } from '../../styles/comModal'
import { normalInputStyle } from '../../styles/comInput'
import AddressBookList from '../views/AddressBookList';
import AssetList from '../views/AssetList'
import { CHAIN_COMPVERSE, ASSET_COMPVERSE } from '../../constants/chain'
import { COMPVERSE2_GAS_DECIMALS, compverse2CheckAddress, compverse2_makeTx, compverse2_makeTokenTx } from '../../chain'
import utils from '../../wallet/utils';

const defaultGasLimit = 21000;
const defaultTokenGasLimit = 600000;

const TransCompverse = ({ route, navigation, currentAccount, currentAssets }) => {
    const [showAddressBook, setShowAddressBook] = useState(false)
    const [toAddress, setToAddress] = useState('')
    const [isShowSelectCoin, setIsShowSelectCoin] = useState(false)
    const [transAsset, setTransAsset] = useState(currentAssets.defaultAsset)
    const [balance, setBalance] = useState(0)
    const [toAmount, onChangeToAmount] = useState('')
    const [transGas, setTransGas] = useState('')
    const [customGas, onChangeCustomGas] = useState('1')
    const [gasLimit, setGasLimit] = useState(defaultGasLimit)
    const [showPwd, setShowPwd] = useState(false)
    const [pwd, onChangePwd] = useState('')

    const toast = useRef()

    useEffect(() => {
        const account = route.params?.account || ''
        setToAddress(account)
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity title="Update" onPress={() => navigation.navigate('ScanQRCode', {
                    type: 'transfer'
                })}>
                    <Image style={{ width: 24, height: 22 }} source={require("../../images/scan.png")}></Image>
                </TouchableOpacity >
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate('nav')}>
                    <Image style={{ width: 9, height: 17 }} source={require("../../images/back-icon.png")}></Image>
                </TouchableOpacity >
            )
        });
    }, [])

    useEffect(() => {
        calcGasFee(defaultGasLimit);
    }, [])

    const modalChangeAddress = (address) => {
        if (address) {
            setToAddress(address);
        }
        setShowAddressBook(false);
    }

    const modalChangeAsset = (asset) => {
        console.log(asset, 'asset')
        setIsShowSelectCoin(false);
        if (asset) {
            setTransAsset(asset);
            if (asset.name == ASSET_COMPVERSE) {
                setGasLimit(defaultGasLimit);
                calcGasFee(defaultGasLimit);
            } else {
                // token
                setGasLimit(defaultTokenGasLimit);
                calcGasFee(defaultTokenGasLimit);
            }
        }
    }

    const calcGasFee = (val) => {
        setTransGas(new BigNumber(customGas)
            .multipliedBy(val)
            .dividedBy(COMPVERSE2_GAS_DECIMALS)
            .toFixed());
    }

    const checkAddress = () => {
        if (toAddress == '') return false;
        return compverse2CheckAddress(toAddress)
    }

    const checkToAmount = () => {
        return true;
    }

    const toTransCheck = () => {
        if (!checkAddress()) {
            Alert.alert(I18n.t('transfer.invalidAddress', { chain: CHAIN_COMPVERSE }));
            return;
        }

        if (!checkToAmount()) {
            Alert.alert(I18n.t('transfer.invalidAmount'));
            return;
        }

        setShowPwd(true);
    }

    const transCancel = () => {
        setShowPwd(false);
        onChangePwd('');
    }

    const transOk = () => {
        if (pwd == '') {
            Alert.alert(I18n.t('transfer.emptyPwd'));
            return;
        }

        const prikey = currentAccount.privateKey;
        let privateKey = '';
        try {
            privateKey = utils.decryptContent(prikey, pwd);
        } catch (err) {
            toast.current.show(I18n.t('transfer.pwdError'));
            onChangePwd('');
            return;
        }

        setShowPwd(false);
        onChangePwd('');
        toTransfer(privateKey);
    }

    const toTransfer = async (privateKey) => {
        if (transAsset.name == ASSET_COMPVERSE) {
            await compverse2_makeTx(
                privateKey,
                toAddress,
                toAmount,
                customGas,
                gasLimit
            )
                .then((res) => {
                    toast.current.show(I18n.t('transfer.transInitiated'));
                    navigation.navigate('nav');
                })
                .catch((err) => {
                    if (err.toString().indexOf("insufficient funds") != -1) {
                        toast.current.show(I18n.t('transfer.transBalanceLow'));
                    } else {
                        toast.current.show(I18n.t('transfer.transTxError'));
                    }
                });
        } else {
            // token
            await compverse2_makeTokenTx(
                privateKey.substr(2),
                currentAccount.address,
                toAddress,
                toAmount,
                customGas,
                gasLimit,
                transAsset.address,
                transAsset.decimals
            )
                .then((res) => {
                    Alert.alert(I18n.t('transfer.transInitiated'));
                    navigation.navigate('nav');
                })
                .catch((err) => {
                    if (err.toString().indexOf("insufficient funds") != -1) {
                        toast.current.show(I18n.t('transfer.transBalanceLow'));
                    } else {
                        toast.current.show(I18n.t('transfer.transTxError'));
                    }
                });
        }
    }

    return (
        <View style={styles.transactionWrap}>
            <KeyboardAwareScrollView style={styles.viewPadding}>
                <View style={styles.boxWrap}>
                    <Text style={{ ...styles.textSize, marginBottom: 10 }}>{I18n.t('common.address')}</Text>
                    <View style={{ position: "relative" }}>
                        <TextInput style={normalInputStyle} placeholder={CHAIN_COMPVERSE + I18n.t('common.address')} value={toAddress}></TextInput>
                        <TouchableOpacity style={styles.dizhibu} onPress={() => setShowAddressBook(true)}>
                            <Image style={{ width: 24, height: 24 }} source={require("../../images/dizhibu.png")}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.boxWrap}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ ...styles.textSize, marginBottom: 10 }}>{I18n.t('transfer.amount')}</Text>
                        <TouchableOpacity onPress={() => setIsShowSelectCoin(true)}>
                            <Text style={{ ...styles.baseSize, color: '#0059E7' }}>{transAsset.name} ></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: "relative" }}>
                        <TextInput style={{ ...normalInputStyle, height: 80, fontSize: 20 }} onChangeText={text => onChangeToAmount(text)} value={toAmount}></TextInput>
                    </View>
                    <Text style={{ ...styles.baseSize, color: colors.fontGray, marginTop: 8 }}>{I18n.t('transfer.balance')} {balance}</Text>
                </View>
                <View style={styles.boxWrap}>
                    <Text style={{ ...styles.textSize, marginBottom: 10 }}>{I18n.t("transfer.gas")}</Text>
                    <View style={styles.gasWrap}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.gasItem}>
                                <Text style={styles.baseSize}>Gas Price(Gwei)</Text>
                                <TextInput style={styles.gasInput} onChangeText={text => onChangeCustomGas(text)} value={customGas}></TextInput>
                            </View>
                            <View style={styles.gasItem}>
                                <Text style={{ ...styles.baseSize }}>Gas Limit</Text>
                                <Text style={{ ...styles.baseSize, fontSize: 14 }}>{gasLimit}</Text>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 19 }}>
                            <Text style={{ ...styles.baseSize, fontSize: 14 }}>Total：Gas Price * Gas Limit = </Text>
                            <Text style={{ ...styles.baseSize, fontSize: 14, color: '#3E5CF9' }}>{transGas}</Text>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>

            <View style={normalBtnView}>
                <TouchableOpacity style={normalBtnStyle} onPress={toTransCheck}>
                    <Text style={normalBtnText}>{I18n.t('transfer.sure')}</Text>
                </TouchableOpacity >
            </View>

            {/* 选择地址弹窗 */}
            <Modal visible={showAddressBook} animationType="slide" transparent={true} onRequestClose={() => { setShowAddressBook(false) }}>
                <View style={bottomModal}>
                    <View style={[bottomModalContainer, styles.modalContainer]}>
                        <AddressBookList navigation={navigation} toAddress={toAddress} updateAddress={modalChangeAddress}></AddressBookList>
                        <TouchableOpacity onPress={() => setShowAddressBook(false)} style={styles.modalCancel} >
                            <Text style={styles.modalCancelText}>{I18n.t('common.cancel')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* 选择币种弹窗 */}
            <Modal visible={isShowSelectCoin} animationType="slide" transparent={true} onRequestClose={() => { setIsShowSelectCoin(false) }}>
                <View style={bottomModal}>
                    <View style={[bottomModalContainer, styles.modalContainer]}>
                        <AssetList navigation={navigation} transAsset={transAsset} updateAsset={modalChangeAsset}></AssetList>
                        <TouchableOpacity onPress={() => setIsShowSelectCoin(false)} style={styles.modalCancel} >
                            <Text style={styles.modalCancelText}>{I18n.t('common.cancel')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* 密码弹窗 */}
            <Modal visible={showPwd} animationType="slide" transparent={true} onRequestClose={() => { setShowPwd(false) }}>
                <View style={middleModal}>
                    <View style={[middleModalContainer, styles.pwdModal]}>
                        <Text style={middleModalTitle}>{I18n.t('transfer.comfirmTrans')}</Text>
                        <TextInput placeholder={I18n.t('transfer.walletPwd')} style={[normalInputStyle, styles.tipInput]} onChangeText={text => onChangePwd(text)} value={pwd}></TextInput>
                        <View style={middleModalTwoBtn}>
                            <TouchableOpacity onPress={transCancel} style={middleModalBtnLeft} >
                                <Text style={middleModalBtnLeftText}>{I18n.t('common.cancel')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={transOk} style={middleModalBtnRight} >
                                <Text style={middleModalBtnRightText}>{I18n.t('common.ok')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Toast ref={toast} position='top' positionValue={10}></Toast>
        </View>
    )
}

export default connect(
    state => ({
        currentAccount: state.currentAccount,
        currentAssets: state.assetReducer.currentAssets
    }),
    {})(TransCompverse)

const styles = StyleSheet.create({
    transactionWrap: {
        ...baseStyles.flexGrow,
        justifyContent: 'space-between',
        paddingTop: 20,
    },
    viewPadding: {
        ...baseStyles.containerPadding
    },
    boxWrap: {
        marginBottom: 20
    },
    baseSize: {
        ...fontStyles.normal,
        ...fontStyles.tinySize,
        color: colors.fontDark
    },
    textSize: {
        ...fontStyles.medium,
        ...fontStyles.normalSize,
        color: colors.fontDark
    },
    dizhibu: {
        position: 'absolute',
        right: 20,
        top: 12
    },
    walletModalWrap: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    walletContent: {
        ...baseStyles.flexGrow,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '80%',
        backgroundColor: colors.white,
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        alignItems: 'center',
        paddingTop: 20
    },
    coinItem: {
        width: 335,
        height: 62,
        backgroundColor: colors.bgNormal,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        marginBottom: 10,
        position: 'relative'
    },
    checkImg: {
        width: 20,
        height: 20,
        position: 'absolute',
        right: 20,
        top: 20
    },
    cancelButton: {
        ...baseStyles.flexCenter,
        position: 'absolute',
        bottom: 0,
        height: 60
    },
    modalCancel: {
        ...baseStyles.flexCenter,
        height: 72,
        borderTopWidth: 1,
        borderTopColor: '#E6E9ED'
    },
    modalContainer: {
        height: winHeight * 0.8,
        backgroundColor: colors.white
    },
    modalCancelText: {
        ...fontStyles.normal,
        ...fontStyles.normalSize,
        color: colors.fontDark
    },
    gasWrap: {
        width: 335,
        height: 120,
        backgroundColor: '#fff',
        borderRadius: 7,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#e3e3e3',
        padding: 15,
    },
    gasItem: {
        justifyContent: 'space-between',
        width: 150,
        height: 50
    },
    gasInput: {
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#3E5CF9',
        color: '#3E5CF9',
        height: 30,
        lineHeight: 30,
        fontSize: 14,
        width: 80,
        margin: 0,
        padding: 0,
    },
    pwdModal: {
        alignItems: 'center'
    },
    tipModalWrap: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
    },
    tipContent: {
        bottom: 0,
        width: 335,
        height: 193,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderRadius: 4,
        alignItems: 'center',
        paddingTop: 20,
        position: 'relative',
        top: 200
    },
    tipInput: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20
    }
})