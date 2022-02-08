import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { rightPad } from 'web3-utils'

import { colors, baseStyles, otherStyles, fontStyles } from '../../styles/common'
import I18n from '../../i18n/i18n'

const styles = StyleSheet.create({
    mainContainer: {
        ...baseStyles.flexGrow,
        ...baseStyles.containerPadding,
        paddingTop: 20,
        backgroundColor: colors.white
    },
    title1: {
        ...fontStyles.normalSize,
        ...fontStyles.medium,
        color: colors.fontDark
    },
    title2: {
        paddingTop: 5,
        paddingBottom: 15,
        ...fontStyles.tinySize,
        ...fontStyles.normal,
        color: colors.fontDark
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        ...baseStyles.containerPadding,
        height: 38,
        borderRadius: 27,
        borderWidth: 1,
        borderColor: colors.borderLight2
    },
    searchInput: {
        ...baseStyles.flexGrow,
        ...fontStyles.normal,
        ...fontStyles.smallSize,
        color: colors.fontDark
    },
    searchImg: {
        ...baseStyles.flexStatic,
        width: 18,
        height: 18
    },
    searchRecent: {
        marginTop: 20,
        marginBottom: 10,
        ...fontStyles.smallSize,
        ...fontStyles.medium,
        color: colors.fontDark
    },
    searchRecentUrl: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    urlItem: {
        marginTop: 10,
        marginRight: 35,
        width: 40
    },
    urlImgView: {
        width: 40,
        height: 40,
        ...baseStyles.flexCenter,
        borderRadius: 20,
        backgroundColor: colors.fontHighLight
    },
    itemText: {
        ...fontStyles.tinySize,
        ...fontStyles.normal,
        color: colors.fontDark
    }
})

export const Dapp = ({ navigation }) => {
    const recentUrl = [{
        name: 'http://10.0.5.3:8080',
        url: 'http://10.0.5.3:8080',
        icon: require('../../images/dapp.png'),
        width: 20,
        height: 20
    }, {
        name: 'http://localhost:8081',
        url: 'http://localhost:8081',
        icon: '',
        width: 25,
        height: 19
    }]

    const [searchUrl, onChangeUrl] = useState('');

    const toSearch = (searchUrl) => {
        console.log("to search=", searchUrl)
        navigation.navigate('ToBrowser', { searchUrl: searchUrl })
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title1}>{I18n.t('dapp.title')}</Text>
            <Text style={styles.title2}>{I18n.t('dapp.text')}</Text>
            <View style={styles.search}>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={text => onChangeUrl(text)}
                    value={searchUrl}>
                </TextInput>
                <TouchableOpacity onPress={() => toSearch(searchUrl)}>
                    <Image style={styles.searchImg} source={require('../../images/search.png')}></Image>
                </TouchableOpacity>
            </View>
            <Text style={styles.searchRecent}>{I18n.t('dapp.recent')}</Text>
            <View style={styles.searchRecentUrl}>
                {
                    recentUrl.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} style={styles.urlItem} onPress={() => toSearch(item.url)}>
                                <View style={styles.urlImgView}>
                                    {
                                        item.icon ? <Image style={{ width: item.width, height: item.height }} source={item.icon}></Image> : <Image style={{ width: item.width, height: item.height }} source={require('../../images/defaultUrlIcon.png')}></Image>
                                    }
                                </View>
                                <Text style={styles.itemText} numberOfLines={1} ellipsizeMode={'tail'}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    )
}