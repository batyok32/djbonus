import { LOAD_ACCOUNT_DATA, LOAD_PERMISSIONS } from "../types/types";

import errors from "./../messages/errors.json";
import axios from "axios";

export const get_account_info = () => async (dispatch) => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${localStorage.getItem("access")}`,
                Accept: "application/json",
            },
        };

        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_VERSION_URL}/account/info/`,
                config
            );
            dispatch({ type: LOAD_ACCOUNT_DATA, payload: res.data });
            return res;
        } catch (error) {
            return errors.error3;
        }
    } else {
        return errors.error1;
    }
};

export const get_user_permissions = () => async (dispatch) => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${localStorage.getItem("access")}`,
                Accept: "application/json",
            },
        };

        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_VERSION_URL}/users/permissions/`,
                config
            );
            dispatch({ type: LOAD_PERMISSIONS, payload: res.data });
            // console.log("PERMISSIONS", res.data);
            return res.data;
        } catch (error) {
            return errors.error3;
        }
    } else {
        return errors.error1;
    }
};
