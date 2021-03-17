import { combineReducers } from "redux";

import { UPDATE_SEARCH_RESULT } from "./action";

const initialState = {
    searchResult: {}
}

function app(state = initialState, action) {
    switch (action.type) {
        case UPDATE_SEARCH_RESULT:
            return {
                ...state,
                searchResult: action.result
            }
        default:
            return {
                ...state,
            }
    }
}

export default combineReducers({
    app
});
