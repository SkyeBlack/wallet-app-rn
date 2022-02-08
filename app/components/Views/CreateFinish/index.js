import React from "react"
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

import { colors, baseStyles, fontStyles } from '../../../styles/common'
import { normalBtnStyle, normalBtnText } from '../../../styles/comBtn'
import I18n from '../../../i18n/i18n'

const styles = StyleSheet.create({
    mainContainer: {
        ...baseStyles.flexGrow,
        ...baseStyles.flexCenter,
        ...baseStyles.containerPadding
    },
    finishImg: {
        width: 180,
        height: 180
    },
    chainImgs: {
        paddingTop: 35,
        paddingBottom: 40
    },
    chainLogo: {
        width: 30,
        height: 30
    },
    bottomBtn: {
        width: '100%',
        flexDirection: 'row'
    },
    btnNext: {
        width: 17,
        height: 14,
        marginLeft: 10
    },
    msgTip: {
        paddingTop: 25,
        ...fontStyles.medium,
        ...fontStyles.normalSize,
        color: colors.fontPrimary,
        lineHeight: 20,
        textAlign: 'center'
    }
})

const CreateFinish = ({ navigation }) => {
    const toHome = () => {
        navigation.navigate('nav')
    }

    return (
        <View style={styles.mainContainer}>
            <Image style={styles.finishImg} source={require('../../../images/createFinish.png')}></Image>
            <View style={styles.chainImgs}>
                <Image style={styles.chainLogo} source={require('../../../images/logo_60x60.png')}></Image>
            </View>
            <TouchableOpacity
                onPress={toHome}
                style={[styles.bottomBtn, normalBtnStyle]}
            >
                <Text style={normalBtnText}>{I18n.t('common.complete')}</Text>
                <Image style={styles.btnNext} source={require('../../../images/next_17x14.png')}></Image>
            </TouchableOpacity>
            <Text style={styles.msgTip}>{I18n.t('createFinish.msg')}</Text>
        </View>
    )
}

export default CreateFinish