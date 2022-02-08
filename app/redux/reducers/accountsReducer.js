const initState = [

]

export default function accountsReducer(state = initState, action) {
    const { type, data } = action
    //根据type决定如何加工数据
    switch (type) {
        case 'INIT_ACCOUNTS':
            return data
        case 'ADD_ACCOUNTS':
            let index = state.findIndex(item => item.chainName == action.chainName)
            if (index >= 0) {
                return state.map(item => {
                    if (item.chainName == action.chainName) {
                        item.accounts.push(data);
                    }
                    return item
                });
            }
            else {
                state.push({
                    chainName: action.chainName,
                    accounts: [
                        data
                    ]
                })
                return state
            }
        case 'DELETE_ACCOUNTS':
            state.map(item => {
                if (item.chainName == action.chainName) {
                    let index = item.accounts.findIndex(account => account.address == data.address)
                    return {
                        chainName: action.chainName,
                        accounts: item.accounts.splice(index, 1)
                    }
                }
                else {
                    return item
                }
            })
            return [...state]
        default:
            return state;
    }
}