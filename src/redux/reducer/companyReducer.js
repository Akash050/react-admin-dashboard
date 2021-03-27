import * as companyActionType from "../actionsType/companyActionType";

export default (state = [], action) => {
  switch (action.type) {
    case companyActionType.CREATE_COMPANY:
      console.log("create reducer", action.payload);
      return [...state, action.payload];
    case companyActionType.ALL_COMPANY:
      return [
        ...action.payload.body.content
      ];
      case companyActionType.COMPANY_BY_ID:
        // let temp = [...action.payload.body]
         console.log("temp ->>", action.payload)
        return [
          action.payload
        ];
    case companyActionType.UPDATE_COMPANY:
      return [...state, action.payload];
    case companyActionType.DELETE_COMPANY:
      return [...state.filter((item, index) => item.id !== action.payload)];
    default:
      return state;
  }
};
