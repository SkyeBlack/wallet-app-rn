import { RNCamera } from 'react-native-camera'
import React, { Component } from 'react';
import { parse } from 'eth-url-parser';
import {
    StatusBar,
    StyleSheet,
    FlatList,
    SectionList,
    TouchableOpacity,
    Animated,
    PermissionsAndroid,
    default as Easing,
    ImageBackground,
    Alert
} from 'react-native';
import { Constants, View, Carousel, Text, PageControl, Colors, Image } from 'react-native-ui-lib'

import I18n from '../../../i18n/i18n'

export default class ScanQRCode extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            //中间横线动画初始值
            moveAnim: new Animated.Value(-2),
            shouldReadBarCode: true
        };
        this.requestCameraPermission = this.requestCameraPermission.bind(this)
    }

    componentWillMount() {
        this.requestCameraPermission();
    }

    componentDidMount() {
        this.startAnimation();
    }

    //请求权限的方法
    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: '申请摄像头权限',
                    message: '',
                    buttonNeutral: '等会再问我',
                    buttonNegative: '不行',
                    buttonPositive: '好吧',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('现在你获得摄像头权限了');
            } else {
                this.props.navigation.goBack()
            }
        } catch (err) {
            console.warn(err);
        }
    }

    /** 扫描框动画*/
    startAnimation = () => {
        this.state.moveAnim.setValue(-2);
        Animated.sequence([
            Animated.timing(
                this.state.moveAnim,
                {
                    toValue: 200,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.state.moveAnim,
                {
                    toValue: -1,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            )
        ]).start(() => this.startAnimation())

    };


    onBarCodeRead = (result) => {
        const { navigation, route } = this.props;
        const { data } = result; //只要拿到data就可以了
        if (!data) return false
        if (data.split('ethereum:').length > 1) {
            if (route.params.type == "transfer") {
                navigation.navigate('TransCompverse', {
                    account: parse(data).target_address
                })
            }
            if (route.params.type == "addressBook") {
                navigation.navigate('AddressBookEdit', {
                    account: parse(data).target_address
                })
            }
            this.setState({
                shouldReadBarCode: false
            })
        }
    };

    render() {
        const { shouldReadBarCode } = this.state
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    autoFocus={RNCamera.Constants.AutoFocus.on}/*自动对焦*/
                    style={[styles.preview,]}
                    type={RNCamera.Constants.Type.back}/*切换前后摄像头 front前back后*/
                    flashMode={RNCamera.Constants.FlashMode.off}/*相机闪光模式*/
                    onBarCodeRead={shouldReadBarCode ? this.onBarCodeRead : null}
                >
                    <View style={{
                        width: 500,
                        height: 220,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }} />
                    <View style={[{ flexDirection: 'row' }]}>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: 200, width: 200 }} />
                        <ImageBackground style={{ width: 200, height: 200 }} source={require("../../../images/scanBg.png")}>
                            <Animated.View style={[
                                styles.border,
                                { transform: [{ translateY: this.state.moveAnim }] }]} />
                        </ImageBackground>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: 200, width: 200 }} />
                    </View>

                    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: 500, alignItems: 'center' }}>
                        <Text style={styles.rectangleText}>{I18n.t('scan.msg1')}</Text>
                    </View>
                </RNCamera>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rectangleContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rectangle: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#fcb602',
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10
    },
    border: {
        flex: 0,
        width: 196,
        height: 2,
        backgroundColor: '#fcb602',
        borderRadius: 50
    }
});
