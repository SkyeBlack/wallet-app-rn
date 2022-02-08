import { combineReducers } from "redux"
import accounts from "./accountsReducer"
import netReducer from "./netReducer"
import assetReducer from "./assetReducer"
import addressReducer from "./addressReducer"
import currentAccount from "./currentAccount";

export default combineReducers({
    accounts,
    netReducer,
    assetReducer,
    addressReducer,
    currentAccount
})