import * as usersApis from "../../services/users";
import * as usersActionTypes from "../actionsType/usersActionType";

export const usersList = () => async (dispatch) => {
  const response = await usersApis.users();
  dispatch({
    type: usersActionTypes.GET_USERS,
    payload: response?.data?.data,
  });
};
