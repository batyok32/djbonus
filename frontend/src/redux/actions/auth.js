import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGN_UP_FAIL,
    SIGN_UP_SUCCESS,
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    USER_LOADED_SUCCESS,
    AUTHENTICATED_SUCCESS,
    LOGOUT,
    ADD_MESSAGE,
    ADD_ERROR,
    LOAD_ACCOUNT_DATA,
    PROFILE_LOADED_SUCCESS,
    AUTHENTICATED_FAIL,
} from "../types/types";

import errors from "./../messages/errors.json";
import success from "./../messages/success.json";
import axios from "axios";

export const load_user_profile = (url) => async (dispatch) => {
    if (localStorage.getItem("access")) {
        try {
            const authConfig = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.getItem("access")}`,
                    Accept: "application/json",
                },
            };
            console.log("URL", url);
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/${url}`,
                authConfig
            );
            dispatch({
                type: PROFILE_LOADED_SUCCESS,
                payload: res.data,
            });
        } catch (error) {
            return errors.error3;
        }
    } else {
        console.log("Not Authenticated");
    }
};
// ===============Load=User====================================
// Taking an access token and trying to retrieve user information

export const load_user = () => async (dispatch) => {
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
                `${process.env.REACT_APP_API_URL}/auth/users/me/`,
                config
            );
            console.log("RESULY", res);
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data,
            });
            if (res.data.type === "CLIENT") {
                dispatch(load_user_profile("credentials/client/me/"));
            } else if (res.data.type === "COMPANY") {
                dispatch(load_user_profile("credentials/company/me/"));
            }

            console.log("Fetched success: ", res.data);
        } catch (error) {
            console.log("Not authenticated");
        }
    } else {
        // console.log("Not logged");
    }
};

// ===============Login====================================
// Taking credentials and send it to take the jwt token

export const login = (username, password) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ username, password });
    console.log("Started login");
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
            body,
            config
        );
        console.log("Logged successfully", res.data);
        await dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch({
            type: ADD_MESSAGE,
            payload: success.success3,
        });

        await dispatch(load_user());
        return res;
    } catch (error) {
        console.error("Loggin error 1", error.message);
        return errors.error4;
    }
};
// ===============Get access token====================================
// Taking credentials and send it to take the jwt token

export const get_access_token = () => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ refresh: localStorage.getItem("refresh") });
    // console.log("Started refreshing token");
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`,
            body,
            config
        );
        // console.log("Logged successfully")
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: errors.error4,
        });
    }
};

// ===============Check=Auth====================================
// Taking access token from localstorage and trying to verify

export const checkAuthenticated = () => async (dispatch) => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${localStorage.getItem("access")}`,
                Accept: "application/json",
            },
        };

        const body = JSON.stringify({ token: localStorage.getItem("access") });

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
                body,
                config
            );

            if (res.data.code !== "token_not_valid") {
                // console.log("Checked successfully")
                dispatch({
                    type: AUTHENTICATED_SUCCESS,
                });
                return 200;
            } else {
                dispatch(get_access_token());
                // console.log("Token not valid");
            }
        } catch (error) {
            dispatch(get_access_token());
            // console.log("Old access token");
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL,
        });
        // console.log("No access token");
    }
};

export const check_user = (username) => async (dispatch) => {
    const body = JSON.stringify({ username });
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/credentials/user/exist/`,
            body,
            config
        );
        return res.data;
    } catch (error) {
        return errors.error4;
    }
};

// ===============Logout====================================
// Clearing an access and refresh token from localstorage

export const logout = () => async (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
    dispatch({
        type: ADD_MESSAGE,
        payload: success.success4,
    });
};

// =================Signup==================================
// Creating new user with this credentials
//======================= REGISTER ===============================
export const signUpClient = (data) => async (dispatch) => {
    const { username, password, password2, full_name, phoneNumber, email } =
        data;
    const body = JSON.stringify({
        username,
        password,
        password2,
        full_name,
        phone_number: phoneNumber,
        email,
    });
    const config = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    };

    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/credentials/client/`,
            body,
            config
        );
        dispatch(login(username, password));
        return res.data;
    } catch (error) {
        if (error.response.status === 400) {
            return error.message;
        } else {
            return errors.error5;
        }
    }
};
// ==============Activation=====================================
// Activate and account taking uid and token

export const verify = (uid, token) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ uid, token });
    try {
        await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/users/activation/`,
            body,
            config
        );
        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: ACTIVATION_FAIL,
            payload: errors.error3,
        });
    }
};

export const update_profile = (formInputs, file) => async (dispatch) => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `JWT ${localStorage.getItem("access")}`,
            },
        };

        let form_data = new FormData();
        if (file) {
            form_data.append("profile_img", file);
        }
        form_data.append("username", formInputs.username);
        form_data.append("phone_number", formInputs.phoneNumber);
        form_data.append("email", formInputs.email);
        form_data.append("city", formInputs.city);
        form_data.append("address", formInputs.address);
        // console.log("Profile data", formInputs);
        // console.log("Profile img", file);
        try {
            const res = await axios.patch(
                `${process.env.REACT_APP_API_URL}/auth/users/me/`,
                form_data,
                config
            );
            dispatch(load_user());
            return res;
        } catch (error) {
            return error;
            // console.log(error.message);
        }
    } else {
        // console.log("Not logged");
    }
};

// 👉
// 😱

// ================Reset=Password===================================
// Taking email and sending request to server for resetting password

export const reset_password = (email) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ email });

    try {
        await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,
            body,
            config
        );
        dispatch({
            type: ADD_MESSAGE,
            payload: success.success5,
        });
    } catch (error) {
        dispatch({
            type: ADD_ERROR,
            payload: errors.error3,
        });
    }
};

// ================Reset=Password=Confirm===================================
// Taking uid token and new password and reset password

export const reset_password_confirm =
    (uid, token, new_password, re_new_password) => async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({
            uid,
            token,
            new_password,
            re_new_password,
        });

        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
                body,
                config
            );

            dispatch({
                type: ADD_MESSAGE,
                payload: success.success6,
            });
        } catch (error) {
            dispatch({
                type: ADD_ERROR,
                payload: errors.error3,
            });
        }
    };
