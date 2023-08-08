const defaultValue = {
    message: ''
}

const SET_GLOBAL_MESSAGE = "SET_GLOBAL_MESSAGE"

export const messageGlobalResuder = (state = defaultValue, action) => {
    switch (action.type) {
        case SET_GLOBAL_MESSAGE: {
            return { ...state, message: action.payload }
        }
        default: {
            return state
        }
    }
}

export const setGlobalMessageAction = (payload) => ({
    type: SET_GLOBAL_MESSAGE,
    payload: payload,
})

