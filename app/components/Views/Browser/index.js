import React from "react"
import BrowserTab from '../BrowserTab'
import { TESTNET } from "../../../constants/chain";
import NetworkList from '../../../util/networks'

const Browser = ({ route, navigation }) => {
	const networkProvider = NetworkList[TESTNET]

	return (<BrowserTab
		navigation={navigation}
		initialUrl={route.params.searchUrl}
		networkProvider={networkProvider}
	/>)
}

export default Browser