import * as ridesApis from "../../services/rides";
import * as ridesActionType from "../actionsType/ridesActionType";

export const rideList = () => async (dispatch) => {
  const response = await ridesApis.rides();
  dispatch({
    type: ridesActionType.GET_RIDES,
    payload: response?.data?.data,
  });
};
