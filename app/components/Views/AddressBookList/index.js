import React, { useEffect, useState } from 'react'
import { Dimensions, View, TouchableOpacity, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import Clipboard from '@react-native-clipboard/clipboard'
import PropTypes from 'prop-types'

import I18n from '../../../i18n/i18n'
import { colors, baseStyles, otherStyles, fontStyles } from '../../../styles/common'
import { mlMainContainer, mlTitleView, mlTitle, mlItem, mlLeftLabel, mlLeftText, mlCheckImg } from '../../../styles/comModal'

const winWidth = Dimensions.get('window').width;
const lineWidth = winWidth - 40;

const AddressBookList = props => {
    const itemClick = (address) => {
        props.updateAddress(address);
    }

    return (
        <View style={mlMainContainer}>
            <View style={mlTitleView}>
                <Text style={mlTitle}>{I18n.t('addressBookList.chooseContacts')}</Text>
            </View>
            <View style={baseStyles.containerPadding}>
                {props.currentAddressBook.addresses.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} style={mlItem} onPress={() => itemClick(item.address)}>
                            <View>
                                <Text style={mlLeftLabel}>{item.name}</Text>
                                <Text style={mlLeftText}>{item.address}</Text>
                            </View>
                            {
                                item.address == props.toAddress ? <Image style={mlCheckImg} source={require("../../../images/blue-check.png")}></Image> : null
                            }
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

AddressBookList.propTypes = {
    /**
     * current chain address book
     */
    currentAddressBook: PropTypes.object,
    /**
     * react-navigation object used to switch between screens
     */
    navigation: PropTypes.object,
    /**
     * current transfer receiving address
     */
    toAddress: PropTypes.string,
    /**
     * update parent address
     */
    updateAddress: PropTypes.func
}

export default connect(
    state => ({
        currentAddressBook: state.addressReducer.currentAddressBook
    }),
    {})(AddressBookList)