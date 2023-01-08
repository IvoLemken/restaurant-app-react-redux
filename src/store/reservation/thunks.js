import { apiUrl } from "../../config/constants";
import axios from "axios";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import { getReservations } from "./slice";

export const loadReservations = () => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/reservations/all`, {});      
      
      dispatch(getReservations({ reservation: response.data.reservedTables }));
      dispatch(appDoneLoading());

    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response
      dispatch(setMessage({
        variant: "danger",
        dismissable: true,
        text: error.response.data.message,
      }));
      dispatch(appDoneLoading());
    }
  };
};