import * as employeeActionType from "../actionsType/employeeActionType";

export default (state = {}, action) => {
    switch (action.type) {
        case employeeActionType.TOTAL_EMPLOYEE:
            return { ...state, payload: action.payload };
        default:
            return state;
    }
};
