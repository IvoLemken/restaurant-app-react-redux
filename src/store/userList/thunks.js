import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken, selectUser } from "../user/selectors";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import { getAllUsers } from "./slice";
import { showMessageWithTimeout } from "../appState/thunks";

export const loadAllUsers = () => {
  return async (dispatch, getState) => {
    // get token and user from the state
    const token = selectToken(getState());
    const user = selectUser(getState());

    // if we have no token or user, stop
    if (token === null || user === null) return;

    // if user is not an admin, stop
    if (!user.isAdmin) return;

    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/users/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      dispatch(getAllUsers({ users: response.data.users }));
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

export const blockUnblockUser = (id, accountBlocked) => {
  return async (dispatch, getState) => {
    // get token and user from the state
    const token = selectToken(getState());
    const user = selectUser(getState());

    // if we have no token or user, stop
    if (token === null || user === null) return;

    // if user is not an admin, stop
    if (!user.isAdmin) return;

    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/users/blockUnblock`, {
        "id": id,
        "accountBlocked": accountBlocked
      }, { headers: { Authorization: `Bearer ${token}` }});
      console.log(response);

      dispatch(showMessageWithTimeout("success", true, response.data.message));
      dispatch(loadAllUsers());
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