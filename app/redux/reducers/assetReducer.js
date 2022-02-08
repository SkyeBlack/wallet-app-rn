let initialState = {
    allAsset: [],
    currentAssets: {
        chain: '',
        defaultAsset: { name: '', balance: 0 },
        assets: []
    }
}

const assetReducer = ((state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALL_ASSET':
            return {
                ...state,
                allAsset: [...action.data]
            };
        case 'SET_CURRENT_ASSET':
            const chainAssets = state.allAsset.filter(item => item.chain == action.chain);
            return {
                ...state,
                currentAssets: { ...chainAssets[0] }
            };
        case 'SET_CURRENT_BALANCE':
            return {
                ...state,
                currentAssets: { ...state.currentAssets, defaultAsset: { ...state.currentAssets.defaultAsset, balance: action.data } }
            };
        case 'SET_TOKEN_BALANCE':            
            return {
                ...state,
                currentAssets: {
                    ...state.currentAssets, assets: state.currentAssets.assets.map(asset => {
                        if (asset.address === action.address) {
                            return { ...asset, balance: action.balance };
                        }
                        return { ...asset };
                    })
                }
            };
        default:
            return state;
    }
})

export default assetReducer