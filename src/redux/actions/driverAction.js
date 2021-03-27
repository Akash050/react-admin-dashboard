import * as driversApis from "../../services/drivers";
import * as driversActionType from "../actionsType/driversActionType";

export const driversList = () => async (dispatch) => {
  const response = await driversApis.drivers();
  dispatch({
    type: driversActionType.GET_DRIVERS,
    payload: response?.data?.data,
  });
};
