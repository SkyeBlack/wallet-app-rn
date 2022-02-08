import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import Toast from 'react-native-easy-toast'

import { colors, otherStyles, baseStyles, fontStyles } from '../../../styles/common'
import { headerRightBtnText, normalBtnView, normalBtnStyle, normalBtnText, normalBtnDisabled } from '../../../styles/comBtn'
import { normalInputStyle } from '../../../styles/comInput'
import { compverse2CheckAddress, compverse2_getToken } from '../../../chain'
import { CHAIN_COMPVERSE } from '../../../constants/chain'
import { addChainAsset } from '../../../util/assets'
import I18n from '../../../i18n/i18n'

const AddAsset = ({ navigation, currentNet }) => {
    const [address, onChangeAddr] = useState('0x86918a69bc9e9FC037471311ab65721f540847D1')
    const [symbol, onChangeSymbol] = useState('')
    const [decimals, onChangeDecimals] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)

    const toast = useRef()

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity title="Update" onPress={() => navigation.navigate('AssetsManager')}>
                    <Text style={headerRightBtnText}>{I18n.t('assetAdd.manage')}</Text>
                </TouchableOpacity >
            ),
        });
    }, [])

    /**
     * 根据输入的地址查询Token
     */
    const getAsset = async () => {
        setBtnDisabled(true)
        onChangeSymbol('');
        onChangeDecimals('');

        switch (currentNet.chain) {
            case CHAIN_COMPVERSE:
                await addCompverse2Asset();
                break;
            default:
                break;
        }
    }

    /**
     * 查询Compverse2.0 Token
     */
    const addCompverse2Asset = async () => {
        if (compverse2CheckAddress(address)) {
            await compverse2_getToken(address).then(res => {
                onChangeAddr(res.address)
                onChangeSymbol(res.name)
                onChangeDecimals(res.decimals)
                setBtnDisabled(false)
            }).catch(err => {
                // if (err === "0x") {
                //     this.$refs.myMsg.openMessage(
                //       "error",
                //       this.$t("asmContractAddrInvalid")
                //     );
                //     this.contractAbiAddress = "";
                //   } else if (err.toString().indexOf("execution reverted") != -1) {
                //     this.$refs.myMsg.openMessage(
                //       "error",
                //       this.$t("asmContractAddrReverted")
                //     );
                //   } else {
                //     this.$refs.myMsg.openMessage("error", err.toString());
                //   }
            });
        }
    }

    /**
     * 添加资产到本地
     * @returns 
     */
    const toAddAsset = async () => {
        if (!symbol || !decimals) return;

        setBtnDisabled(true)
        let result = await addChainAsset(currentNet.chain, {
            address: address,
            name: symbol,
            decimals: decimals,
            balance: 0
        });

        if (result) {
            toast.current.show(I18n.t('assetAdd.addSuccess'));
            navigation.goBack();
        } else {
            toast.current.show(I18n.t('assetAdd.addFailed'));
            setBtnDisabled(false)
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.topView}>
                <Text style={styles.infoSize}>{I18n.t('assetAdd.tokenAddress')}</Text>
                <TextInput style={normalInputStyle} placeholder={I18n.t('assetAdd.tokenAddressP')} value={address} onChangeText={text => onChangeAddr(text)} onChange={getAsset}></TextInput>
                <Text style={styles.infoSize}>{I18n.t('assetAdd.tokenName')}</Text>
                <TextInput style={[normalInputStyle, baseStyles.disabledStyle]} placeholder={I18n.t('assetAdd.tokenName')} editable={false} value={symbol} onChangeText={text => onChangeSymbol(text)}></TextInput>
                <Text style={styles.infoSize}>{I18n.t('assetAdd.tokenDecimals')}</Text>
                <TextInput style={[normalInputStyle, baseStyles.disabledStyle]} placeholder={I18n.t('assetAdd.tokenDecimals')} editable={false} value={decimals} onChangeText={text => onChangeDecimals(text)}></TextInput>
            </View>

            <View style={normalBtnView}>
                <TouchableOpacity style={[normalBtnStyle, btnDisabled ? normalBtnDisabled : '']} disabled={btnDisabled} onPress={toAddAsset}><Text style={normalBtnText}>{I18n.t('assetAdd.confirmAdd')}</Text></TouchableOpacity>
            </View>

            <Toast ref={toast} position='top' positionValue={10}></Toast>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        ...baseStyles.flexGrow,
        justifyContent: 'space-between'
    },
    topView: {
        ...baseStyles.containerPadding
    },
    infoSize: {
        ...fontStyles.medium,
        ...fontStyles.normalSize,
        color: colors.fontDark,
        lineHeight: 22,
        marginTop: 20,
        marginBottom: 10
    },
    largeSize: {
        ...fontStyles.normal,
        ...fontStyles.normalSize,
        color: colors.fontPrimary,
        lineHeight: 22,
    },
    assetsWrap: {
        marginBottom: 20
    }
})

export default connect(
    state => ({
        currentNet: state.netReducer.currentNet
    }),
    {})(AddAsset)