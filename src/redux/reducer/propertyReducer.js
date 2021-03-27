import * as propertyActionType from "../actionsType/propertyActionType";

export default (state = [], action) => {
  switch (action.type) {
    case propertyActionType.CREATE_PROPERTY:
      return [...state, action.payload];
    case propertyActionType.ALL_PROPERTIES:
      return [
        ...action.payload.filter((item, index) => item.deleted === false),
      ];
    case propertyActionType.UPDATE_PROPERTY:
      return [...state, action.payload];
    case propertyActionType.DELETE_PROPERTY:
      return [...state.filter((item, index) => item.id !== action.payload)];
    default:
      return state;
  }
};
