const defaultValue = {
    modal: false,
}

const SET_MODAL_STATE = "SET_MODAL_STATE"

export const modalReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case SET_MODAL_STATE: {
            return { ...state, modal: action.payload }
        }
        default:
            return state
    }
}

export const setModalStateAction = (payload) => ({
    type: SET_MODAL_STATE,
    payload: payload
})
