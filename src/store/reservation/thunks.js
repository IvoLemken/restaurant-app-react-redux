import { apiUrl } from "../../config/constants";
import axios from "axios";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import { getReservations } from "./slice";
import { selectToken, selectUser } from "../user/selectors";
import { showMessageWithTimeout } from "../appState/thunks";
import { loadReservations } from "../tables/thunks";

export const loadAllReservations = () => {
  return async (dispatch, getState) => {
    // get token and user from the state
    const token = selectToken(getState());
    const user = selectUser(getState());

    // if we have no token or user, stop
    if (token === null || user === null) return;

    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/reservations/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });  
      
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

export const makeReservation = (date, tableId) => {
  return async (dispatch, getState) => {
    // get token and user from the state
    const token = selectToken(getState());
    const user = selectUser(getState());

    // if we have no token or user, stop
    if (token === null || user === null) return;

    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/reservations/create`, {
        "date": date,
        "tableId": tableId
      }, { headers: { Authorization: `Bearer ${token}` }});

      dispatch(showMessageWithTimeout("success", true, "Reservation created"));
      dispatch(loadReservations(date));
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