export const setAllAsset = (data) => {
    return { type: 'SET_ALL_ASSET', data }
}

export const setCurrentBalance = (data) => {
    return { type: 'SET_CURRENT_BALANCE', data }
}

export const setTokenBalance = (balance, address) => {
    return { type: 'SET_TOKEN_BALANCE', balance, address }
}