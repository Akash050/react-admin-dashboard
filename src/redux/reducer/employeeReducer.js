import * as employeeActionType from "../actionsType/employeeActionType";

export default (state = [], action) => {
  switch (action.type) {
    case employeeActionType.CREATE_EMPLOYEE:
      console.log("create reducer", action.payload);
      return [...state, action.payload];
    case employeeActionType.ALL_EMPLOYEES:
      return [
        ...action.payload.filter((item, index) => item.deleted === false),
      ];
    case employeeActionType.UPDATE_EMPLOYEE:
      return [...state, action.payload];
    case employeeActionType.DELETE_EMPLOYEE:
      return [...state.filter((item, index) => item.id !== action.payload)];
    case employeeActionType.RESET_STATE: {
      return (state = []);
    }
    default:
      return state;
  }
};
