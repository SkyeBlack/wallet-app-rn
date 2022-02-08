import { CHAIN_COMPVERSE } from '../constants/chain'
import DeviceStorage from './DeviceStorage'
import store from '../redux/store'
import { compverse2Init } from '../chain'
import { ALL_NET, CURRENT_NET } from '../constants/storage'

// 初始化默认网络
const defaultNet = [{
	chain: CHAIN_COMPVERSE,
	nets: [{
		name: 'Compverse Test Network',
		rpcTarget: 'https://rpcpeg.compverse.io',
		chainId: 3476,
		networkId: 3476,
		ticker: 'CVERSE',
		explorTarget: 'https://pegasus.compverse.io'
	}]
}]

/**
 * 读取本地网络
 */
export async function getStorageNet() {
	// DeviceStorage.delete(ALL_NET)
	// DeviceStorage.delete(CURRENT_NET)
	let allNet = await DeviceStorage.get(ALL_NET);
	if (!allNet) {
		allNet = defaultNet;
		await DeviceStorage.save(ALL_NET, defaultNet);
	}
	store.dispatch({ type: 'SET_ALL_NET', data: allNet });

	let currentNet = await DeviceStorage.get(CURRENT_NET);
	if (!currentNet) {
		currentNet = {
			chain: allNet[0].chain,
			net: allNet[0].nets[0]
		}
		await DeviceStorage.save(CURRENT_NET, currentNet);
	}
	store.dispatch({ type: 'SET_CURRENT_NET', data: currentNet });

	if (currentNet.chain == CHAIN_COMPVERSE) {
		compverse2Init(currentNet.net.rpcTarget, currentNet.net.chainId);
	}
}













import { MAINNET, TESTNET, RPC } from '../constants/chain';

/**
 * List of the supported networks
 * including name, id, and color
 *
 * This values are used in certain places like
 * navbar and the network switcher.
 */
const NetworkList = {
	[MAINNET]: {
		name: 'Compverse Main Network',
		rpcTarget: 'https://rpc.compverse.io',
		chainId: 6779,
		networkId: 6779,
		ticker: 'CVERSE',
		explorTarget: 'https://scan.compverse.io'
	},
	[TESTNET]: {
		name: 'Compverse Test Network',
		rpcTarget: 'https://rpcpeg.compverse.io',
		chainId: 3476,
		networkId: 3476,
		ticker: 'CVERSE',
		explorTarget: 'https://pegasus.compverse.io'
	},
	[RPC]: {
		name: 'Private Network'
	}
};

const NetworkListKeys = Object.keys(NetworkList);

export default NetworkList;