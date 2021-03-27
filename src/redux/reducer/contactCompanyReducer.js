import * as contactCompanyActionType from "../actionsType/contactCompanyActionType";

export default (state = [], action) => {
  switch (action.type) {
    case contactCompanyActionType.CREATE_CONTACT_COMPANY:
      return [...state, action.payload];
    case contactCompanyActionType.ALL_CONTACT_COMPANIES:
      return action.payload;
    case contactCompanyActionType.UPDATE_CONTACT_COMPANY:
      return [...state, action.payload];
    case contactCompanyActionType.DELETE_CONTACT_COMPANY:
      return [...state.filter((item, index) => item.id !== action.payload)];
    default:
      return state;
  }
};
