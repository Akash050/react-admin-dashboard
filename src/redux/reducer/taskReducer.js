import * as taskActionType from "../actionsType/taskActionType";

export default (state = [], action) => {
  switch (action.type) {
    case taskActionType.CREATE_TASK:
      console.log("create reducer", action.payload);
      return [...state, action.payload];
    case taskActionType.ALL_TASKS:
      return action.payload;
    case taskActionType.GET_TOP_THREE_TASKS:
      console.log("top 3", action.payload);
      return action.payload;
    case taskActionType.UPDATE_TASK:
      return [...state, action.payload];
    case taskActionType.DELETE_TASK:
      return [...state.filter((item, index) => item.id !== action.payload)];
    default:
      return state;
  }
};
