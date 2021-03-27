import * as companyActionType from "../actionsType/companyActionType";

export default (state = {}, action) => {
  switch (action.type) {
    case companyActionType.COMPANY_PAGING_DATA:
      return {
        ...state,
        totalPages: action.payload
      };
    case companyActionType.TOTAL_COMPANY:
      return {
        ...state,
        totalCompany: action.payload
      };
    default:
      return state;
  }
};
