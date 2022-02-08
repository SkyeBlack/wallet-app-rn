import { CHAIN_COMPVERSE } from '../constants/chain'
import DeviceStorage from './DeviceStorage'
import store from '../redux/store'
import { ALL_ADDRESS_BOOK } from '../constants/storage'

// 初始化默认资产
const defaultAddressBook = [{
    chain: CHAIN_COMPVERSE,
    addresses: []
}]

/**
 * 读取本地地址簿
 */
export const getStorageAddressBook = async () => {
    // DeviceStorage.delete(ALL_ADDRESS_BOOK)
    let allAddressBook = await DeviceStorage.get(ALL_ADDRESS_BOOK)
    if (!allAddressBook) {
        allAddressBook = defaultAddressBook;
        await DeviceStorage.save(ALL_ADDRESS_BOOK, allAddressBook);
    }
    store.dispatch({ type: 'SET_ALL_ADDRESS', data: allAddressBook });
}

/**
 * 添加指定联系人
 * @param {String} chain 链名
 * @param {Object} contacts 联系人
 * @returns 
 */
export const addChainAddressBook = async (chain, contacts) => {
    let allAddressBook = store.getState().addressReducer.allAddress;
    for (const item of allAddressBook) {
        if (item.chain == chain) {
            for (const item2 of item.addresses) {
                if (item2.address == contacts.address) {
                    return false;
                }
            }
            item.addresses.push(contacts);
        }
    }

    await DeviceStorage.save(ALL_ADDRESS_BOOK, allAddressBook);
    store.dispatch({ type: 'SET_ALL_ADDRESS', data: allAddressBook });
    store.dispatch({ type: 'SET_CURRENT_ADDRESS', chain: chain });
    return true;
}

/**
 * 修改指定联系人
 * @param {String} chain 链名
 * @param {Object} contacts 联系人
 * @returns 
 */
export const updateChainAddressBook = async (chain, oldAddr, newContacts) => {
    let allAddressBook = store.getState().addressReducer.allAddress;
    let chainIndex = -1;
    let itemIndex = -1;
    for (const i in allAddressBook) {
        if (allAddressBook[i].chain == chain) {
            const itemChain = allAddressBook[i].addresses;
            for (const j in itemChain) {
                if (itemChain[j].address == newContacts.address && itemChain[j].address != oldAddr) {
                    return false;
                }

                if (itemChain[j].address == oldAddr) {
                    chainIndex = i;
                    itemIndex = j;
                }
            }
        }
    }

    if (chainIndex != -1 && itemIndex != -1) {
        allAddressBook[chainIndex].addresses[itemIndex].name = newContacts.name;
        allAddressBook[chainIndex].addresses[itemIndex].address = newContacts.address;
        await DeviceStorage.save(ALL_ADDRESS_BOOK, allAddressBook);
        store.dispatch({ type: 'SET_ALL_ADDRESS', data: allAddressBook });
        store.dispatch({ type: 'SET_CURRENT_ADDRESS', chain: chain });
        return true;
    }

    return false;
}

/**
 * 删除指定联系人
 * @param {String} chain 链名
 * @param {Object} contacts 联系人
 * @returns 
 */
export const deleteChainAsset = async (chain, contacts) => {
    let isDelete = false;
    let allAddressBook = store.getState().addressReducer.allAddress;
    for (const item of allAddressBook) {
        if (item.chain == chain) {
            for (const i in item.addresses) {
                if (item.addresses[i].address == contacts.address) {
                    item.addresses.splice(i, 1);
                }
                isDelete = true;
                break;
            }
        }
    }

    await DeviceStorage.save(ALL_ADDRESS_BOOK, allAddressBook)
    store.dispatch({ type: 'SET_ALL_ADDRESS', data: allAddressBook });
    store.dispatch({ type: 'SET_CURRENT_ADDRESS', chain: chain });
    return isDelete;
}