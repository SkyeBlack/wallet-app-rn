let initialState = {
    allAddress: [],
    currentAddressBook: {
        chain: '',
        addresses: []
    }
}

const addressReducer = ((state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALL_ADDRESS':
            return {
                ...state,
                allAddress: [...action.data]
            };
        case 'SET_CURRENT_ADDRESS':
            const chainAddress = state.allAddress.filter(item => item.chain == action.chain);
            return {
                ...state,
                currentAddressBook: { ...chainAddress[0] }
            };
        default:
            return state;
    }
})

export default addressReducer