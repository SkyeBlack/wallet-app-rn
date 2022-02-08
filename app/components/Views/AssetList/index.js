import React, { useEffect, useState } from 'react'
import { Dimensions, View, TouchableOpacity, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import Clipboard from '@react-native-clipboard/clipboard'
import PropTypes from 'prop-types'

import I18n from '../../../i18n/i18n'
import { colors, baseStyles, otherStyles, fontStyles } from '../../../styles/common'
import { mlMainContainer, mlTitleView, mlTitle, mlItem, mlItemLeft, mlLeftImg, mlLeftLabel, mlLeftText, mlCheckImg } from '../../../styles/comModal'
import { CHAIN_COMPVERSE } from '../../../constants/chain'

const winWidth = Dimensions.get('window').width;
const lineWidth = winWidth - 40;

const AssetList = props => {
    const itemClick = (asset) => {
        props.updateAsset(asset);
    }

    return (
        <View style={mlMainContainer}>
            <View style={mlTitleView}>
                <Text style={mlTitle}>{I18n.t('addressBookList.chooseContacts')}</Text>
            </View>
            <View style={baseStyles.containerPadding}>
                <TouchableOpacity style={mlItem} onPress={() => itemClick(props.currentAssets.defaultAsset)}>
                    <View style={mlItemLeft}>
                        {
                            props.currentAssets.chain == CHAIN_COMPVERSE ? <Image style={mlLeftImg} source={require("../../../images/logo_60x60.png")}></Image> : <Image style={mlLeftImg} source={require("../../../images/logoDefault.png")}></Image>
                        }
                        <View>
                            <Text style={mlLeftLabel}>{props.currentAssets.defaultAsset.name}</Text>
                            <Text style={mlLeftText}>{props.currentAssets.defaultAsset.balance}</Text>
                        </View>
                    </View>
                    {
                        props.currentAssets.defaultAsset.name == props.transAsset.name ? <Image style={mlCheckImg} source={require("../../../images/blue-check.png")}></Image> : null
                    }
                </TouchableOpacity>

                {props.currentAssets.assets.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} style={mlItem} onPress={() => itemClick(item)}>
                            <View style={mlItemLeft}>
                                <Image style={mlLeftImg} source={require("../../../images/logoDefault.png")}></Image>
                                <View>
                                    <Text style={mlLeftLabel}>{item.name}</Text>
                                    <Text style={mlLeftText}>{item.balance}</Text>
                                </View>
                            </View>
                            {
                                item.name == props.transAsset.name ? <Image style={mlCheckImg} source={require("../../../images/blue-check.png")}></Image> : null
                            }
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

AssetList.propTypes = {
    /**
     * current chain asset
     */
    currentAssets: PropTypes.object,
    /**
     * react-navigation object used to switch between screens
     */
    navigation: PropTypes.object,
    /**
     * current transfer receiving address
     */
    transAsset: PropTypes.object,
    /**
     * update parent address
     */
    updateAsset: PropTypes.func
}

export default connect(
    state => ({
        currentAssets: state.assetReducer.currentAssets
    }),
    {})(AssetList)