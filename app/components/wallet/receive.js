import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import ViewShot from "react-native-view-shot"
import Share from 'react-native-share';

import I18n from '../../i18n/i18n'
import { AddressCopy } from '../../util/tool'

const Receive = ({ route, navigation }) => {
    const [uri1, setUri1] = useState('')
    const viewShot = useRef(null);

    const onShare = () => {
        try {
            viewShot.current.capture().then(async (uri) => {
                console.log("do something with ", uri);
                const uri1 = 'data:image/png;base64,' + uri;
                setUri1(uri1)
                const shareOptions = {
                    title: "React Native",
                    url: uri1,
                    type: 'image/*',
                }
                Share.open(shareOptions)
                    .then((res) => {
                        console.log(res, '111');
                    })
                    .catch((err) => {
                        err && console.log(err + '123');
                    });
            });
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    return (
        <View style={styles.receive_wrap}>
            <ViewShot style={styles.qrode_wrap} ref={viewShot} options={{ result: 'base64' }}>
                <Text style={{ ...styles.textSize, fontWeight: '400', color: "#000001" }}>{I18n.t('receive.scan')}</Text>
                <Text style={{ ...styles.baseSize, color: "#0059E7", marginTop: 41 }}>{I18n.t('receive.msg1', { chain: route.params.chain })}</Text>
                <QRCode
                    value={route.params.address}
                    size={200}
                />
                <Text style={styles.tip}>{I18n.t('receive.receiveAddress')}</Text>
                <Text style={styles.tip}>{route.params.address}</Text>
                <View style={styles.buttonWrap}>
                    {/* <TouchableOpacity style={{ ...styles.buttonItem, borderRightWidth: 1 }} onPress={onShare}>
                        <Image style={{ width: 21, height: 20, marginRight: 10 }} source={require('../../images/share.png')}></Image>
                        <Text>{I18n.t('common.share')}</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.buttonItem} onPress={() => AddressCopy(route.params.address)}>
                        <Image style={{ width: 20, height: 20, marginRight: 10 }} source={require('../../images/copy-black.png')}></Image>
                        <Text>{I18n.t('common.copy')}</Text>
                    </TouchableOpacity>
                </View>
            </ViewShot>
        </View>
    )
}

export default Receive

const styles = StyleSheet.create({
    baseSize: {
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        color: '#333333',
        lineHeight: 17,
        fontWeight: '400',
        fontSize: 12
    },
    textSize: {
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        color: '#333333',
        lineHeight: 22,
        fontWeight: '500',
        fontSize: 16
    },
    receive_wrap: {
        flex: 1,
        backgroundColor: '#0059E7',
        alignItems: 'center',
        paddingTop: 10
    },
    qrode_wrap: {
        width: 335,
        height: 460,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 20,
        position: 'relative'
    },
    tip: {
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        color: '#333333',
        lineHeight: 17,
        fontWeight: '400',
        fontSize: 12,
        color: '#989899',
        marginTop: 15,
        textAlign: 'center',
        width: 223
    },
    buttonWrap: {
        width: 319,
        borderTopWidth: 1,
        borderStyle: 'solid',
        borderColor: '#EAEAEA',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0
    },
    buttonItem: {
        width: '100%',
        height: 49,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 0,
        borderStyle: 'solid',
        borderColor: '#EAEAEA',
    },
    left: {
        width: 14,
        height: 14,
        borderRadius: 14,
        backgroundColor: '#0059E7',
        position: 'absolute',
        left: -8,
        top: 54
    },
    right: {
        width: 14,
        height: 14,
        borderRadius: 14,
        backgroundColor: '#0059E7',
        position: 'absolute',
        right: -8,
        top: 54
    },
    line: {
        width: 300,
        borderBottomWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#EAEAEA',
        position: 'absolute',
        top: 44,
        left: 16
    }
})