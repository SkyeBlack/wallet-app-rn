import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Alert, Image } from 'react-native'
import { connect } from 'react-redux'
import { Picker } from '@react-native-picker/picker'
import Toast from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { colors, baseStyles, fontStyles } from '../../../styles/common'
import { normalBtnView, normalBtnStyle, normalBtnText } from '../../../styles/comBtn'
import { normalInputStyle } from '../../../styles/comInput'
import { addChainAddressBook, updateChainAddressBook } from '../../../util/addressBook'
import { compverse2CheckAddress } from '../../../chain'
import { CHAIN_COMPVERSE } from '../../../constants/chain'
import I18n from '../../../i18n/i18n'

const styles = StyleSheet.create({
    mainContainer: {
        ...baseStyles.flexGrow,
        justifyContent: 'space-between',
        backgroundColor: colors.bgNormal
    },
    viewPadding: {
        ...baseStyles.containerPadding
    },
    inputTitle: {
        marginTop: 20,
        marginBottom: 10,
        ...fontStyles.medium,
        ...fontStyles.normalSize,
        color: colors.fontDark
    },
    pickerView: {
        height: 48,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.borderLight2,
        backgroundColor: colors.white
    }
})

const AddressBookEdit = ({ route, navigation, currentNet }) => {
    const [isAdd, setIsAdd] = useState(true)
    const [oldContacts, setOldContacts] = useState(null)
    const [selectedChain, onChangeChain] = useState('')
    const [contactsName, onChangeName] = useState('')
    const [contactsAddr, onChangeAddr] = useState('')

    const toast = useRef()

    useEffect(() => {
        const account = route.params?.account || ''
        onChangeAddr(account)
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity title="Update" onPress={() => navigation.navigate('ScanQRCode', {
                    type: 'addressBook'
                })}>
                    <Image style={{ width: 24, height: 22 }} source={require("../../../images/scan.png")}></Image>
                </TouchableOpacity >
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate('AddressBook')}>
                    <Image style={{ width: 9, height: 17 }} source={require("../../../images/back-icon.png")}></Image>
                </TouchableOpacity >
            )
        });
        if (route.params.editContacts) {
            setIsAdd(false)
            setOldContacts(route.params.editContacts)
            onChangeChain(route.params.editContacts.chain)
            onChangeName(route.params.editContacts.contacts.name)
            onChangeAddr(route.params.editContacts.contacts.address)
        } else {
            setIsAdd(true)
            onChangeChain(currentNet.chain)
        }
    }, [])

    const checkName = () => {
        if (contactsName == '') return false;
        return true;
    }

    const checkAddr = () => {
        if (contactsAddr == '') return false;

        switch (selectedChain) {
            case CHAIN_COMPVERSE:
                return compverse2CheckAddress(contactsAddr)
            default:
                return false;
        }
    }


    const saveContacts = async () => {
        if (!checkName()) {
            Alert.alert(I18n.t('addressBookEdit.nameMsg'));
            return;
        }

        if (!checkAddr()) {
            Alert.alert(I18n.t('common.invalidAddress'));
            return;
        }

        let result;
        if (isAdd) {
            result = await addChainAddressBook(selectedChain, { name: contactsName, address: contactsAddr });
            if (result) {
                toast.current.show(I18n.t('addressBookEdit.addContactsSuccess'));
                navigation.navigate('AddressBook');
            }
            else {
                toast.current.show(I18n.t('addressBookEdit.contactsExist'));
            }
        } else {
            if (oldContacts.contacts.name == contactsName && oldContacts.contacts.address == contactsAddr) {
                toast.current.show(I18n.t('addressBookEdit.noUpdate'));
                return;
            }
            result = await updateChainAddressBook(selectedChain, oldContacts.contacts.address, { name: contactsName, address: contactsAddr });
            if (result) {
                toast.current.show(I18n.t('addressBookEdit.updateSuccess'));
                navigation.navigate('AddressBook');
            }
            else {
                toast.current.show(I18n.t('addressBookEdit.contactsExist'));
            }
        }
    }

    return (
        <View style={styles.mainContainer}>
            <KeyboardAwareScrollView style={styles.viewPadding}>
                <Text style={styles.inputTitle}>{I18n.t('addressBookEdit.contactsName')}</Text>
                <TextInput
                    style={normalInputStyle}
                    placeholder={I18n.t('addressBookEdit.contactsNameP')}
                    onChangeText={text => onChangeName(text)}
                    value={contactsName}>
                </TextInput>
                <Text style={styles.inputTitle}>{I18n.t('addressBookEdit.chain')}</Text>
                <View style={styles.pickerView}>
                    <Picker
                        selectedValue={selectedChain}
                        enabled={isAdd}
                        onValueChange={text => onChangeChain(text)}
                    >
                        <Picker.Item label="COMPVERSE" value="COMPVERSE" />
                    </Picker>
                </View>
                <Text style={styles.inputTitle}>{selectedChain}{I18n.t('common.address')}</Text>
                <TextInput
                    style={normalInputStyle}
                    placeholder={I18n.t('addressBookEdit.addressP')}
                    onChangeText={text => onChangeAddr(text)}
                    value={contactsAddr}>
                </TextInput>
            </KeyboardAwareScrollView>

            <View style={normalBtnView}>
                <TouchableOpacity style={normalBtnStyle} onPress={saveContacts}>
                    <Text style={normalBtnText}>{I18n.t('common.save')}</Text>
                </TouchableOpacity >
            </View>

            <Toast ref={toast} position='top' positionValue={10}></Toast>
        </View>
    )
}

export default connect(
    state => ({
        currentNet: state.netReducer.currentNet
    }),
    {})(AddressBookEdit)