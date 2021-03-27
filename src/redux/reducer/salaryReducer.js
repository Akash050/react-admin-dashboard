import * as employeeActionType from "../actionsType/employeeActionType";

export default (state = {}, action) => {
    switch (action.type) {
        case employeeActionType.EMPLOYEE_SALARY:
            console.log("create reducer", action.payload);
            return { ...state, payload: action.payload };
        default:
            return state;
    }
};
