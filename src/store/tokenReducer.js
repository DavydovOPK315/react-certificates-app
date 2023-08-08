const defaultState = {
    token: '',
}

const ADD_ACCESS_TOKEN = "ADD_ACCESS_TOKEN"
const REMOVE_ACCESS_TOKEN = "REMOVE_ACCESS_TOKEN"

export const tokenReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_ACCESS_TOKEN:
            return { ...state, token: action.payload }
        case REMOVE_ACCESS_TOKEN:
            return { ...state, token: '' }
        default:
            return state
    }
}

export const addAccessTokenAction = (payload) => ({
    type: ADD_ACCESS_TOKEN,
    payload: payload
})

export const removeAccessTokenAction = (payload) => ({
    type: REMOVE_ACCESS_TOKEN,
    payload: payload
})