import React, { useState, useRef, useEffect, useCallback } from "react";
import { WebView } from "react-native-webview";
import URL from 'url-parse';
import PropTypes from 'prop-types';
import { TransactionController } from '@metamask/controllers';
import HttpProvider from 'ethjs-provider-http';
import Common from '@ethereumjs/common'
import { Transaction } from '@ethereumjs/tx'

import { StyleSheet, View, TouchableOpacity, Image, Text, Modal, Share } from 'react-native'
import { colors, baseStyles, fontStyles } from '../../../styles/common'
import { bottomModal } from '../../../styles/comModal'
import BackgroundBridge from '../../../core/BackgroundBridge';
import EntryScriptWeb3 from "../../../core/EntryScriptWeb3"
import { SPA_urlChangeListener } from '../../../util/browserScripts'
import I18n from '../../../i18n/i18n'

const { createAsyncMiddleware } = require('json-rpc-engine');
const Web3 = require("web3");

const styles = StyleSheet.create({
    headerRight: {
        width: 73,
        height: 27,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: colors.bgLight2,
        borderRadius: 27,
        borderWidth: 1,
        borderColor: colors.borderLight4
    },
    headerLine: {
        width: 1,
        height: 14,
        backgroundColor: colors.bgLight3
    },
    optionContainer: {
        borderTopLeftRadius: 9,
        borderTopRightRadius: 9,
        backgroundColor: colors.bgNormal2
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 25,
        paddingBottom: 25
    },
    itemImgView: {
        width: 52,
        height: 52,
        ...baseStyles.flexCenter,
        backgroundColor: colors.white,
        borderRadius: 4,
        shadowColor: 'rgba(227, 227, 227, 0.27)',
        shadowOffset: { width: 0, height: 4 }
    },
    itemText: {
        ...fontStyles.tinySize,
        ...fontStyles.normal,
        color: colors.fontPrimary,
        textAlign: 'center'
    },
    optionCancel: {
        height: 54,
        ...baseStyles.flexCenter,
        borderTopWidth: 1,
        borderTopColor: colors.borderLight3
    }
})

const BrowserTab = props => {
    const [showOption, setShowOption] = useState(false)
    const [showWallet, setShowWallet] = useState(false)
    const [progress, setProgress] = useState(0);
    const [initialUrl, setInitialUrl] = useState('');
    const [entryScriptWeb3, setEntryScriptWeb3] = useState(null);
    const [backgroundBridge, setBackgroundBridge] = useState(null);

    const webviewRef = useRef(null);
    const url = useRef('');

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={browserOption}>
                        <Image style={{ width: 16, height: 4 }} source={require('../../../images/browserMore.png')}></Image>
                    </TouchableOpacity >
                    <View style={styles.headerLine}></View>
                    <TouchableOpacity onPress={browserClose}>
                        <Image style={{ width: 12, height: 12 }} source={require('../../../images/browserClose.png')}></Image>
                    </TouchableOpacity >
                </View>

            ),
        });
    }, [])

    /**
     * Set initial url, dapp scripts and engine. Similar to componentDidMount
     */
    useEffect(() => {
        go(props.initialUrl, true);

        const getEntryScriptWeb3 = async () => {
            const entryScriptWeb3 = await EntryScriptWeb3.get();

            setEntryScriptWeb3(entryScriptWeb3 + SPA_urlChangeListener);
        };

        getEntryScriptWeb3();
    }, []);

    /**
     * Go to a url
     * */
    const go = useCallback(
        async (url, initialCall) => {
            const hasProtocol = url.match(/^[a-z]*:\/\//);
            const sanitizedURL = hasProtocol ? url : `${props.defaultProtocol}${url}`;
            setInitialUrl(sanitizedURL);
            setProgress(0);
            return sanitizedURL;
        },
        [props.defaultProtocol]
    );

    /**
     * Website started to load
     */
    const onLoadStart = async ({ nativeEvent }) => {
        const { hostname } = new URL(nativeEvent.url);
        changeUrl(nativeEvent, 'start');
        const origin = new URL(nativeEvent.url).origin;
        initializeBackgroundBridge(origin, true);
    };

    /**
     * Sets loading bar progress
     */
    const onLoadProgress = ({ nativeEvent: { progress } }) => {
        setProgress(progress);
    };

    /**
     * Handles state changes for when the url changes
     */
    const changeUrl = (siteInfo, type) => {
        url.current = siteInfo.url;
    };

    const initializeBackgroundBridge = (url, isMainFrame) => {
        const bridge = new BackgroundBridge({
            webview: webviewRef,
            url,
            getRpcMethodMiddleware,
            isMainFrame
        });
        setBackgroundBridge(bridge);
    };

    const getRpcMethodMiddleware = ({ hostname, getProviderState }) =>
        createAsyncMiddleware(async (req, res, next) => {
            const rpcMethods = {
                /**
                 * This method is used by the inpage provider to get its state on
                 * initialization.
                 */
                metamask_getProviderState: async () => {
                    const { networkProvider } = props;
                    let chainIdHex = null;

                    if (networkProvider.chainId) {
                        // Convert to hex
                        chainIdHex = `0x${parseInt(networkProvider.chainId, 10).toString(16)}`;
                    }

                    res.result = {
                        chainId: chainIdHex,
                        accounts: ['0x0000D36196F6975703a38ff316b6e407040d440F']
                    };
                },
                eth_chainId: async () => {
                    const { networkProvider } = props;

                    let chainId = networkProvider.chainId;

                    if (chainId) {
                        // Convert to hex
                        res.result = `0x${parseInt(chainId, 10).toString(16)}`;
                    }
                },
                eth_requestAccounts: async () => {
                    res.result = ['0x0000D36196F6975703a38ff316b6e407040d440F'.toLowerCase()];
                },
                eth_sendTransaction: async () => {
                    console.log("11111")
                    console.log(req)
                    const web3 = await new Web3(new Web3.providers.HttpProvider('https://rpcpeg.compverse.io'));
                    await web3.eth
                        .getTransactionCount('0x0000D36196F6975703a38ff316b6e407040d440F', web3.eth.defaultBlock.pending)
                        .then((nonce) => {
                            const txParams = {
                                nonce: web3.utils.toHex(nonce++),
                                gasLimit: `0x${parseInt(800000, 10).toString(16)}`,
                                ...req.params[0]
                            }

                            const common = Common.custom({ chainId: 3476 })
                            const tx = Transaction.fromTxData(txParams, { common })

                            const privateKey = Buffer.from(
                                '1fa5fe5e438b11bf8adaea2e8f98a8aa6a3905caec267b61f96b3203ac19a742',
                                'hex',
                            )

                            const signedTx = tx.sign(privateKey)

                            const serializedTx = signedTx.serialize()
                            const txHex = serializedTx.toString("hex");
                            console.log(serializedTx, txHex)
                            web3.eth.sendSignedTransaction(
                                "0x" + txHex,
                                (err, res) => {
                                    if (!err) {
                                        console.log("res---", res)
                                    } else {
                                        console.log("error---", err)
                                    }
                                }
                            );
                        });
                }
            };

            if (!rpcMethods[req.method]) {
                return next();
            }
            await rpcMethods[req.method]();
        });

    const onMessage = ({ nativeEvent }) => {
        let data = nativeEvent.data;

        try {
            data = typeof data === 'string' ? JSON.parse(data) : data;
            if (!data || (!data.type && !data.name)) {
                return;
            }
            if (data.name) {
                if (backgroundBridge.isMainFrame) {
                    const { origin } = data && data.origin && new URL(data.origin);
                    backgroundBridge.url === origin && backgroundBridge.onMessage(data);
                } else {
                    backgroundBridge.url === data.origin && backgroundBridge.onMessage(data);
                }
                return;
            }

            switch (data.type) {
                case 'GET_WEBVIEW_URL': {
                    // const { url } = data.payload;
                    // if (url === nativeEvent.url)
                    //     webviewUrlPostMessagePromiseResolve.current &&
                    //         webviewUrlPostMessagePromiseResolve.current(data.payload);
                    console.log("GET_WEBVIEW_URL")
                }
            }
        } catch (e) {
            console.error(e, `Browser::onMessage on ${url.current}`);
        }
    };

    const browserOption = () => {
        setShowOption(true)
    }

    const browserClose = () => {
        props.navigation.goBack()
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: props.initialUrl,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    const copyLink = () => {
        console.log(props.initialUrl)
    }

    const toReload = () => {
        setShowOption(false)
        webviewRef.current.reload()
    }

    const renderHomeOption = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showOption}
                onRequestClose={() => {
                    setShowOption(false);
                }}
            >
                <View style={bottomModal}>
                    <View style={styles.optionContainer}>
                        <View style={styles.options}>
                            <TouchableOpacity style={styles.optionItem} onPress={() => setShowWallet(true)}>
                                <View style={styles.itemImgView}>
                                    <Image style={{ width: 31, height: 26 }} source={require('../../../images/browserWallet.png')}></Image>
                                </View>
                                <Text style={styles.itemText}>{I18n.t('browserTab.changeWallet')}</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={styles.optionItem} onPress={onShare}>
                                <View style={styles.itemImgView}>
                                    <Image style={{ width: 26, height: 26 }} source={require('../../../images/browserShare.png')}></Image>
                                </View>
                                <Text style={styles.itemText}>{I18n.t('common.share')}</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity style={styles.optionItem} onPress={copyLink}>
                                <View style={styles.itemImgView}>
                                    <Image style={{ width: 28, height: 28 }} source={require('../../../images/browserLink.png')}></Image>
                                </View>
                                <Text style={styles.itemText}>{I18n.t('browserTab.copyLink')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionItem} onPress={toReload}>
                                <View style={styles.itemImgView}>
                                    <Image style={{ width: 26, height: 26 }} source={require('../../../images/browserRefresh.png')}></Image>
                                </View>
                                <Text style={styles.itemText}>{I18n.t('browserTab.refresh')}</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.optionCancel} onPress={() => setShowOption(false)}>
                            <Text>{I18n.t('common.cancel')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    return (
        <View style={{ ...baseStyles.flexGrow }}>
            {!!entryScriptWeb3 && (<WebView
                ref={webviewRef}
                source={{ uri: initialUrl }}
                style={{ marginTop: 20, backgroundColor: '#fff', padding: 10 }}
                injectedJavaScriptBeforeContentLoaded={entryScriptWeb3}
                onLoadStart={onLoadStart}
                onLoadProgress={onLoadProgress}
                onMessage={onMessage}
                javascriptEnabled

            />)}
            {renderHomeOption()}
        </View>
    )
}

BrowserTab.defaultProps = {
    defaultProtocol: 'https://'
};

BrowserTab.propTypes = {
    /**
     * InitialUrl
     */
    initialUrl: PropTypes.string,
    /**
     * Protocol string to append to URLs that have none
     */
    defaultProtocol: PropTypes.string,
    /**
     * react-navigation object used to switch between screens
     */
    navigation: PropTypes.object,
    /**
     * An object representing the selected network provider
     */
    networkProvider: PropTypes.object
}

export default BrowserTab;