import React, { useEffect } from "react"
import { StyleSheet, Dimensions, View, StatusBar, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux'

import { colors, otherStyles, baseStyles, fontStyles } from '../../../styles/common'
import DeviceStorage from "../../../util/DeviceStorage";
import { INIT_ACCOUNTS, INIT_CURRENT_ACCOUNT } from "../../../redux/actions/accountsAction";
import I18n from '../../../i18n/i18n'
import { normalBtnStyle, normalBtnText } from '../../../styles/comBtn'
import { initData } from "../../../core/initialData"
import { ALL_ACCOUNTS, CURRENT_ACCOUNT, MNEMONIC } from "../../../constants/storage"
import { getAllAccounts, getCurrentAccounts } from "../../../util/accounts";

const winWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    guideContainer: {
        ...baseStyles.flexGrow
    },
    guideLogo: {
        ...baseStyles.flexGrow,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    createWalletBtn: {
        width: winWidth - 40,
        marginBottom: 74
    }
});

const GuidePage = ({ navigation, accounts, INIT_ACCOUNTS, currentAccount, INIT_CURRENT_ACCOUNT }) => {
    // DeviceStorage.delete(ALL_ACCOUNTS)
    // DeviceStorage.delete(CURRENT_ACCOUNT)
    useEffect(() => {
        // outPut()
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        async function fetchData() {
            await initData();
            //检查本地是否有钱包地址
            getAccounts()
        }

        return unsubscribe;
    }, [navigation])

    const getAccounts = async () => {
        getAllAccounts()
        let res = await getCurrentAccounts()
        console.log(res, '当前账户')
        if (res?.address) navigation.navigate('nav')
    }

    const outPut = () => {
        console.log('进入gudepuge页面')
    }

    return (
        <View style={styles.guideContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
            <ImageBackground
                style={styles.guideLogo}
                source={require('../../../images/guide.gif')}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('CreateWallet')}
                    style={[normalBtnStyle, styles.createWalletBtn]}
                >
                    <Text style={normalBtnText}>{I18n.t('common.createWallet')}</Text>
                </TouchableOpacity>
            </ImageBackground>

        </View>
    )
}

export default connect(
    state => ({
        accounts: state.accounts,
        currentAccount: state.currentAccount
    }),
    {
        INIT_ACCOUNTS,
        INIT_CURRENT_ACCOUNT
    }

)(GuidePage)