import * as employeeActionType from "../actionsType/employeeActionType";
import * as companyActionType from "../actionsType/companyActionType";

export default (state = {}, action) => {
  switch (action.type) {
    case employeeActionType.UPDATED:
      return { employeeUpdated: action.payload };
    case employeeActionType.CREATED:
      return { employeeCreated: action.payload };
    case employeeActionType.PAGING_DATA:
      return { totalPages: action.payload };
    case employeeActionType.TOTAL_DATA:
        return { numberOfElements: action.payload };
    case employeeActionType.TOTAL_EMPLOYEE:
        return { totalEmployee: action.payload };
    default:
      return state;
  }
};
