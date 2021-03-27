import * as propertyTemplateActionType from "../actionsType/propertyTemplateActionType";
export default (state = [], action) => {
  switch (action.type) {
    case propertyTemplateActionType.CREATE_PROPERTY_TEMPLATE:
      return [...state, action.payload];
    case propertyTemplateActionType.ALL_PROPERTIES_TEMPLATE:
      return action.payload
    case propertyTemplateActionType.UPDATE_PROPERTY_TEMPLATE:
      console.log('inaction', action.payload)
      return Object.assign(state, state.map(item => {
        return item.id === action.payload.id ? action.payload : item;
      }))
    // return Object.assign({}, state, {
    //   state: state.map(item => {
    //     return item.id === action.payload.id ? action.payload : item;
    //   }) // replace matched item and returns the array 
    // });
    case propertyTemplateActionType.DELETE_PROPERTY_TEMPLATE:
      return [...state.filter((item, index) => item.id !== action.payload)];
    default:
      return state;
  }
};