import { CHAIN_COMPVERSE, ASSET_COMPVERSE } from '../constants/chain'
import DeviceStorage from './DeviceStorage'
import store from '../redux/store'
import { ALL_ASSET } from '../constants/storage'

// 初始化默认资产
const defaultAsset = [{
    chain: CHAIN_COMPVERSE,
    defaultAsset: { name: ASSET_COMPVERSE, balance: 0 },
    assets: []
}]

/**
 * 读取本地资产
 */
export const getStorageAsset = async () => {
    // DeviceStorage.delete(ALL_ASSET)
    let allAsset = await DeviceStorage.get(ALL_ASSET)
    if (!allAsset) {
        allAsset = defaultAsset;
        await DeviceStorage.save(ALL_ASSET, allAsset);
    }
    store.dispatch({ type: 'SET_ALL_ASSET', data: allAsset });
}

/**
 * 添加指定Token
 * @param {String} chain 链名
 * @param {Object} asset Token
 * @returns 
 */
export const addChainAsset = async (chain, asset) => {
    let allAsset = store.getState().assetReducer.allAsset;
    for (const item of allAsset) {
        if (item.chain == chain) {
            for (const item2 of item.assets) {
                if (item2.address == asset.address) {
                    return false;
                }
            }
            item.assets.push(asset);
        }
    }

    await DeviceStorage.save(ALL_ASSET, allAsset);
    store.dispatch({ type: 'SET_ALL_ASSET', data: allAsset });
    store.dispatch({ type: 'SET_CURRENT_ASSET', chain: chain });
    return true;
}

/**
 * 删除指定Token
 * @param {String} chain 链名
 * @param {Object} asset Token
 * @returns 
 */
export const deleteChainAsset = async (chain, asset) => {
    let isDelete = false;
    let allAsset = store.getState().assetReducer.allAsset;
    for (const item of allAsset) {
        if (item.chain == chain) {
            for (const i in item.assets) {
                if (item.assets[i].address == asset.address) {
                    item.assets.splice(i, 1);
                }
                isDelete = true;
                break;
            }
        }
    }

    await DeviceStorage.save(ALL_ASSET, allAsset);
    store.dispatch({ type: 'SET_ALL_ASSET', data: allAsset });
    store.dispatch({ type: 'SET_CURRENT_ASSET', chain: chain });
    return isDelete;
}