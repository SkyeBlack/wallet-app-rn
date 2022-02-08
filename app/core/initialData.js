import store from '../redux/store'
import { getStorageNet } from "../util/networks"
import { getStorageAsset } from "../util/assets"
import { getStorageAddressBook } from '../util/addressBook'

export async function initData() {
    await getStorageNet()
    await getStorageAsset()
    const chain = store.getState().netReducer.currentNet.chain;
    store.dispatch({ type: 'SET_CURRENT_ASSET', chain: chain });    
    await getStorageAddressBook()
    store.dispatch({ type: 'SET_CURRENT_ADDRESS', chain: chain });
}