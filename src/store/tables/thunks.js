import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectTables } from "./selectors";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import { getTables, reservedTables } from "./slice";

export const loadTables = () => {
  return async (dispatch, getState) => {
    // get tables from the state
    const tableState = selectTables(getState());

    // if we already have tables, return them
    if (tableState !== null) {
      return tableState
    }

    dispatch(appLoading());
    try {
      // if we don't have tables,
      // retrieve them
      const response = await axios.get(`${apiUrl}/tables/`, {});
      
      dispatch(getTables({ tables: response.data.tables }));
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

export const loadReservations = (date) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/reservations/forDate`, {
        "reservationDate": date
      });
      
      const reservations = [];

      response.data.reservedTables.forEach(res => {
        reservations.push(res.tableId)
      });

      dispatch(reservedTables({ reserved: reservations }));
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