import React, { useState, useRef } from "react"
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Toast from 'react-native-easy-toast'
import _ from 'loadsh'

import { colors, baseStyles, otherStyles, fontStyles } from '../../../styles/common'
import { normalBtnStyle, normalBtnText } from '../../../styles/comBtn'
import { mneContainer, mneItem, mneNum, mneText } from '../../../styles/backupMnemonic'
import I18n from '../../../i18n/i18n'
import DeviceStorage from "../../../util/DeviceStorage"
import { addAccounts, updateCurrentAccount, saveMnemonic } from "../../../util/accounts"

const styles = StyleSheet.create({
    mainContainer: {
        ...baseStyles.flexGrow,
        justifyContent: 'space-between',
        ...baseStyles.containerPadding,
        paddingTop: 20,
        paddingBottom: 40,
        backgroundColor: colors.white
    },
    titleTip: {
        ...fontStyles.medium,
        ...fontStyles.normalSize,
        color: colors.fontPrimary,
        lineHeight: 25
    },
    mneContainerSort: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    mneItemSort: {
        marginBottom: 15,
        marginRight: 15,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 18,
        paddingRight: 18,
        borderRadius: otherStyles.samllRadius,
        borderWidth: 1,
        borderColor: colors.borderLight
    },
    mneTextSort: {
        ...fontStyles.normal,
        ...fontStyles.normalSize,
        color: colors.fontPrimary
    }
});

const BackupStep3 = ({ route, navigation }) => {
    const mnemonic = route.params.mnemonic
    const account = route.params.account
    const type = route.params.type

    const [unOrderMnemonic, setUnOrderMnemonic] = useState(_.shuffle(mnemonic))
    const [orderMnemonic, setOrderMnemonic] = useState([' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '])

    const toast = useRef()

    //创建完成
    const toCheckMnemonic = async () => {
        let flag = true
        for (let i = 0; i < mnemonic.length; i++) {
            if (mnemonic[i] != orderMnemonic[i]) flag = false
        }
        if (flag) { //导出助记词
            if (type == 'export') {
                navigation.navigate('walletManager')
            }
            else {  //创建账户
                addAccounts(account)
                updateCurrentAccount(account)
                saveMnemonic(mnemonic)
                navigation.navigate('CreateFinish')
            }
        }
        else {
            toast.current.show(I18n.t('backupStep2.mneError'));
            setUnOrderMnemonic(_.shuffle(mnemonic))
            setOrderMnemonic([' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '])
        }
    }
    const toShowMnemnoic = (item, index) => {
        let newArray = unOrderMnemonic.filter(orderItem => {
            return orderItem != item
        })
        let newOrder = orderMnemonic

        let findIndex = orderMnemonic.findIndex(item => item == ' ')

        if (findIndex != -1) {
            newOrder[findIndex] = item
        }

        setUnOrderMnemonic(newArray)
        setOrderMnemonic(newOrder)

    }
    return (
        <View style={styles.mainContainer}>
            <View>
                <Text style={styles.titleTip}>{I18n.t('backupStep2.text')}</Text>

                <View style={mneContainer}>
                    {orderMnemonic.map((item, index) => {
                        return (
                            <View style={mneItem} key={index}>
                                <Text style={mneNum}>{index}</Text>
                                <Text style={mneText}>{item}</Text>
                            </View>
                        )
                    })}
                </View>

                <View style={styles.mneContainerSort}>
                    {unOrderMnemonic.map((item, index) => {
                        return (
                            <TouchableOpacity style={styles.mneItemSort} key={index} onPress={() => toShowMnemnoic(item, index)}>
                                <Text style={styles.mneTextSort}>{item}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
            <View>
                <TouchableOpacity
                    onPress={toCheckMnemonic}
                    style={normalBtnStyle}
                >
                    <Text style={normalBtnText}>{I18n.t('common.complete')}</Text>
                </TouchableOpacity>
            </View>
            
            <Toast ref={toast} position='top' positionValue={10}></Toast>
        </View>
    )
}

export default connect(
    state => ({

    }),
    {

    }
)(BackupStep3)