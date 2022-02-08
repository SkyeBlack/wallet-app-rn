import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { SwipeListView } from 'react-native-swipe-list-view'
import Toast from 'react-native-easy-toast'

import { colors, baseStyles, otherStyles, fontStyles } from '../../../styles/common'
import { CHAIN_COMPVERSE } from '../../../constants/chain'
import { deleteChainAsset } from '../../../util/assets'
import I18n from '../../../i18n/i18n'

const AssetsManager = ({ navigation, currentAssets }) => {
    const [chainLogo, setChainLogo] = useState(require('../../../images/logo_60x60.png'))

    const toast = useRef()

    /**
     * 根据Chain获取图片
     */
    useEffect(() => {
        switch (currentAssets.chain) {
            case CHAIN_COMPVERSE:
                setChainLogo(require('../../../images/logo_60x60.png'));
                break;
            default:
                break;
        }
    }, [])

    /**
     * 删除指定Token
     * @param {Object} data Token
     */
    const deleteAsset = (data) => {
        const result = deleteChainAsset(currentAssets.chain, data.item)

        if (result) {
            toast.current.show(I18n.t('common.deleteSuccess'));
        } else {
            toast.current.show(I18n.t('common.deleteFailed'));
        }
    }

    return (
        <View style={styles.assetsWrap}>
            <Text style={styles.assetTitle}>{I18n.t('assetManage.addedAssets')}</Text>
            <SwipeListView
                style={styles.swipeView}
                data={currentAssets.assets}
                renderItem={(data, rowMap) => (
                    <View style={styles.assetsItem}>
                        <Image style={{ width: 30, height: 30 }} source={chainLogo}></Image>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.assetName}>{data.item.name}</Text>
                            <Text style={styles.assetInfo}>{data.item.address}</Text>
                            <Text style={styles.assetInfo}>{data.item.balance}</Text>
                        </View>
                    </View>
                )}
                renderHiddenItem={(data, rowMap) => (
                    <View style={styles.swipeRight}>
                        <TouchableOpacity style={styles.rightBtn} onPress={() => deleteAsset(data)}>
                            <Text style={styles.rightText}>{I18n.t('common.delete')}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                rightOpenValue={-74}
                disableRightSwipe={true}
            />

            <Toast ref={toast} position='top' positionValue={10}></Toast>
        </View>
    )
}

const styles = StyleSheet.create({
    assetsWrap: {
        ...baseStyles.flexGrow,
        ...baseStyles.containerPadding,
        backgroundColor: colors.bgNormal
    },
    assetTitle: {
        ...fontStyles.medium,
        ...fontStyles.normalSize,
        color: colors.fontDark,
        paddingTop: 20,
        paddingBottom: 5
    },
    swipeView: {
        paddingTop: 10
    },
    assetsItem: {
        height: 94,
        ...baseStyles.containerPadding,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: otherStyles.samllRadius,
        backgroundColor: colors.white
    },
    assetName: {
        ...fontStyles.medium,
        ...fontStyles.normalSize,
        color: colors.fontDark
    },
    assetInfo: {
        ...fontStyles.normal,
        ...fontStyles.tinySize,
        color: colors.fontGray
    },
    swipeRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    rightBtn: {
        width: 64,
        height: 94,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF2100',
        borderRadius: 7
    },
    rightText: {
        ...fontStyles.normal,
        ...fontStyles.smallSize,
        color: colors.white
    }
})

export default connect(
    state => ({
        currentAssets: state.assetReducer.currentAssets
    }),
    {})(AssetsManager)