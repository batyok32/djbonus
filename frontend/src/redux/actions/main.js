import { LOAD_TARIFS } from "../types/types";

import errors from "./../messages/errors.json";
import success from "./../messages/success.json";
import axios from "axios";
import { load_user } from "./auth";

export const load_tarifs = () => async (dispatch) => {
    console.log("Loading tarifs");
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_API_VERSION_URL}/tarifs/`,
            config
        );
        console.log("RESULT", res.data);

        dispatch({
            type: LOAD_TARIFS,
            payload: res.data,
        });

        return res.data;
    } catch (error) {
        return error;
        // console.log("Not authenticated");
    }
};

export const buy_tarif = (tarif_id) => async (dispatch) => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${localStorage.getItem("access")}`,
                Accept: "application/json",
            },
        };

        const body = JSON.stringify({ tarif_id });

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_VERSION_URL}/buy-tarif/`,
                body,
                config
            );
            if (res.status === 200) {
                dispatch(load_user());
            }
            return res.status;
        } catch (error) {
            if (error.status === 400) {
                return 400;
            }
            // dispatch(get_access_token());
            console.log("Old access token");
        }
    } else {
        // dispatch({
        //     type: AUTHENTICATED_FAIL,
        // });
        console.log("No access token");
    }
};

export const payQr = (feature_id, username, password) => async (dispatch) => {
    console.log("Paying by qr code");
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ feature_id, username, password });
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_VERSION_URL}/pay-tarif/`,
            body,
            config
        );
        console.log("RESULT", res.status);

        return res.status;
    } catch (error) {
        return error;
        // console.log("Not authenticated");
    }
};
