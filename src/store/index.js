import { createStore, combineReducers, applyMiddleware } from "redux";
import { tokenReducer } from "./tokenReducer";
import { certificateReducer } from "./certificateReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { loadingReducer } from "./loadingReducer";
import { errorGlobalResuder } from "./errorGlobalReducer";
import { messageGlobalResuder } from "./messageGlobalReducer";
import { userReducer } from "./userReducer";
import { modalReducer } from "./modalReducer";

const rootReducer = combineReducers({
    token: tokenReducer,
    certificates: certificateReducer,
    loading: loadingReducer,
    error: errorGlobalResuder,
    message: messageGlobalResuder,
    user: userReducer,
    modal: modalReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
