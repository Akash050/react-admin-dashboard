import * as authActionType from "../actionsType/authActionType";

export default (state = {}, action) => {
    switch (action.type) {
        case authActionType.FORGET_PASS:
            return {
                ...state,
                payload: action.payload,
            };
        case authActionType.RESET_PASS:
            return {
                ...state,
                payload: action.payload,
            };
        default:
            return state;
    }
};
