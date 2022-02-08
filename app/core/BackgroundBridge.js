import URL from 'url-parse';
import { NetworkController } from '@metamask/controllers';
import { query } from '@metamask/controllers/dist/util'

import { JS_POST_MESSAGE_TO_PROVIDER, JS_IFRAME_POST_MESSAGE_TO_PROVIDER } from '../util/browserScripts';
import MobilePortStream from './MobilePortStream';
import { setupMultiplex } from '../util/streams';
import { TESTNET, RPC } from "../constants/chain";
import NetworkList from '../util/networks'

// eslint-disable-next-line import/no-nodejs-modules
const EventEmitter = require('events');
const { JsonRpcEngine } = require('json-rpc-engine');
const { createEngineStream } = require('json-rpc-middleware-stream/dist');
const { providerAsMiddleware } = require('eth-json-rpc-middleware/dist');
const pump = require('pump');

/**
 * Module that listens for and responds to messages from an InpageBridge using postMessage
 */
class Port extends EventEmitter {
    constructor(window, isMainFrame) {
        super();
        this._window = window;
        this._isMainFrame = isMainFrame;
    }

    postMessage = (msg, origin = '*') => {
        console.log("postMessage-----------", msg)
        const js = this._isMainFrame
            ? JS_POST_MESSAGE_TO_PROVIDER(msg, origin)
            : JS_IFRAME_POST_MESSAGE_TO_PROVIDER(msg, origin);
        if (this._window.webViewRef && this._window.webViewRef.current) {
            this._window && this._window.injectJavaScript(js);
        }
    };
}

export class BackgroundBridge extends EventEmitter {
    constructor({ webview, url, getRpcMethodMiddleware, isMainFrame }) {
        super();
        this.url = url;
        this.hostname = new URL(url).hostname;
        this.isMainFrame = isMainFrame;
        this._webviewRef = webview && webview.current;
        this.createMiddleware = getRpcMethodMiddleware;
        this.port = new Port(this._webviewRef, isMainFrame);

        this.engine = null;

        const portStream = new MobilePortStream(this.port, url);
        // setup multiplexing
        const mux = setupMultiplex(portStream);
        // connect features
        this.setupProviderConnection(mux.createStream('metamask-provider'));
    }

    /**
     * A method for serving our ethereum provider over a given stream.
     * @param {*} outStream - The stream to provide over.
     */
    setupProviderConnection(outStream) {
        this.engine = this.setupProviderEngine();

        // setup connection
        const providerStream = createEngineStream({ engine: this.engine });

        pump(outStream, providerStream, outStream, err => {
            // handle any middleware cleanup
            this.engine._middleware.forEach(mid => {
                if (mid.destroy && typeof mid.destroy === 'function') {
                    mid.destroy();
                }
            });
            if (err) Logger.log('Error with provider stream conn', err);
        });
    }

    /**
     * A method for creating a provider that is safely restricted for the requesting domain.
     **/
    setupProviderEngine() {
        const origin = this.hostname;
        // setup json rpc engine stack
        const engine = new JsonRpcEngine();

        const networkController = new NetworkController(
            undefined, {
            name: NetworkList[TESTNET].name,
            network: NetworkList[TESTNET].networkId,
            isCustomNetwork: true,
            provider: {
                rpcTarget: NetworkList[TESTNET].rpcTarget,
                type: RPC,
                chainId: NetworkList[TESTNET].chainId
            },
            properties: {}
        });
        networkController.setProviderType(RPC);
        networkController.setRpcTarget(NetworkList[TESTNET].rpcTarget, NetworkList[TESTNET].chainId, NetworkList[TESTNET].ticker, NetworkList[TESTNET].name);
        const provider = networkController.provider;
        provider.sendAsync = provider.sendAsync.bind(provider);

        engine.push(this.createMiddleware({
            hostname: this.hostname,
            getProviderState: this.getProviderState.bind(this)
        }));

        engine.push(providerAsMiddleware(provider));
        return engine;
    }

    getProviderState() {
        return {
            isUnlocked: false,
            networkVersion: {
                isInitialized: true,
                isUnlocked: false,
                network: NetworkList[TESTNET].networkId,
                selectedAddress: '0x0000D36196F6975703a38ff316b6e407040d440F'
            },
            chainId: `0x${parseInt(chainId, 10).toString(16)}`
        };
    }

    onMessage = msg => {
        this.port.emit('message', { name: msg.name, data: msg.data });
    };
}

export default BackgroundBridge;