import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Dimensions, View, TouchableOpacity, Image, Text, Modal, Alert } from 'react-native'
import { connect } from 'react-redux'
import Clipboard from '@react-native-clipboard/clipboard'
import Toast from 'react-native-easy-toast'

import { colors, baseStyles, otherStyles, fontStyles } from '../../../styles/common'
import { bottomModal, bottomModalContainer } from '../../../styles/comModal'
import I18n from '../../../i18n/i18n'

const winWidth = Dimensions.get('window').width;
const lineWidth = winWidth - 40;

const styles = StyleSheet.create({
    mainContainer: {
        ...baseStyles.flexGrow,
        ...baseStyles.tinyPadding,
        paddingTop: 10,
        backgroundColor: colors.bgNormal
    },
    mainContent: {
        borderRadius: otherStyles.normalRadius
    },
    bookItem: {
        paddingTop: 20,
        paddingBottom: 20,
        ...baseStyles.containerPadding,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white
    },
    itemLabel: {
        paddingBottom: 7,
        ...fontStyles.smallSize,
        ...fontStyles.medium,
        color: colors.fontDark
    },
    itemText: {
        ...fontStyles.tinySize,
        ...fontStyles.normal,
        color: colors.fontGray
    },
    next: {
        width: 9,
        height: 17
    },
    itemLine: {
        marginLeft: 10,
        width: lineWidth,
        height: 1,
        backgroundColor: colors.borderLight
    },
    optionItem: {
        height: 62,
        ...baseStyles.flexCenter,
        borderBottomWidth: 1,
        borderBottomColor: '#E6E9ED'
    },
    optionText: {
        ...fontStyles.normalSize,
        ...fontStyles.medium,
        color: colors.fontDark
    },
    optionCancel: {
        color: colors.fontHighLight
    }
})

const AddressBook = ({ navigation, allAddress }) => {
    const [showOption, setShowOption] = useState(false)
    const [currentContacts, setCurrentContacts] = useState(null)

    const toast = useRef()

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={toAdd}>
                    <Image style={{ width: 16, height: 17 }} source={require('../../../images/add.png')}></Image>
                </TouchableOpacity >
            ),
        });
    }, [])

    /**
     * 添加联系人
     */
    const toAdd = () => {
        setShowOption(false)
        navigation.navigate('AddressBookEdit', { editContacts: null })
    }

    const itemClick = (chain, contacts) => {
        setCurrentContacts({ chain: chain, contacts: contacts })
        setShowOption(true)
    }

    const toCopy = () => {
        Clipboard.setString(currentContacts.contacts.address);
        setShowOption(false);
        toast.current.show(I18n.t('common.copySuccess'));
    }

    const toEdit = () => {
        setShowOption(false)
        navigation.navigate('AddressBookEdit', { editContacts: currentContacts })
    }

    const optionCancel = () => {
        setShowOption(false)
        setCurrentContacts(null)
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.mainContent}>
                {allAddress.map((chainItem, idx) => {
                    return (
                        <View key={idx}>
                            {chainItem.addresses.map((item, index) => {
                                return (
                                    <View key={index}>
                                        {
                                            index != 0 &&
                                            <View style={styles.itemLine}></View>
                                        }
                                        <View style={styles.bookItem}>
                                            <View>
                                                <Text style={styles.itemLabel}>{item.name}</Text>
                                                <Text style={styles.itemText}>{chainItem.chain}</Text>
                                                <Text style={styles.itemText}>{item.address}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => itemClick(chainItem.chain, item)}>
                                                <Image style={styles.next} source={require('../../../images/next.png')}></Image>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    )
                })}

            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showOption}
                onRequestClose={() => {
                    setShowOption(false);
                }}
            >
                <View style={bottomModal}>
                    <View style={bottomModalContainer}>
                        <TouchableOpacity onPress={toCopy} style={styles.optionItem} >
                            <Text style={styles.optionText}>{I18n.t('addressBook.copyAddress')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toEdit} style={styles.optionItem} >
                            <Text style={styles.optionText}>{I18n.t('addressBook.editContacts')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={optionCancel} style={[styles.optionItem, styles.optionCancel]} >
                            <Text style={styles.optionText}>{I18n.t('common.cancel')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Toast ref={toast} position='top' positionValue={10}></Toast>
        </View>
    )
}

export default connect(
    state => ({
        allAddress: state.addressReducer.allAddress
    }),
    {})(AddressBook)