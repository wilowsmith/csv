import { useEffect, useContext, useState } from "react";
import axios from "axios";
import {
    EXPIRY_BUFFER_MILLI,
    SAML_LOGOUT_URL,
    SERVICE_HOST,
    START_SESSION_URL,
    TOKEN_EXPIRY_CHECK_MILLI,
    TOKEN_URL
} from "./config";

import { GlobalContext } from "../../components/contextProvider/ContextProvider";

/**
 * Token Object that lives in memory.
 */
let inMemoryToken;

/**
 * This is to store the inMemoryToken Object.
 *
 * @param jwtToken
 * @param expiryEpochMilli
 * @param expiryDate
 * @param tokenType
 * @param username
 * @param guid
 */
const storeToken = ({
    jwt,
    expiryEpochMilli,
    expiryDate,
    tokenType,
    username,
    guid
}) => {
    inMemoryToken = {
        token: jwt,
        expiry: expiryEpochMilli,
        readableExpiry: expiryDate,
        username,
        guid,
        tokenType
    };
};

/**
 * Logout function that logs people out of active tabs and redirect logout for SAML.
 * @name logout
 * @returns {Promise<void>}
 */
async function logout() {
    inMemoryToken = null;
    // remove all sessionStorage
    sessionStorage.clear();
    // to support logging out from all windows
    // TODO: set sessionStorage item with date
    sessionStorage.setItem("logout", Date.now());
    // TODO: WE don't have a api/logout that returns back. Instead just do a saml/logout redirect
    window.location.replace(SAML_LOGOUT_URL);
}

/**
 * This is to capture specific responses from API calls.
 */
// TODO: Add 500 service error to retry 3 times.
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error && error.response) {
            if (error.response.status === 401)
                window.location.replace(START_SESSION_URL);
            return Promise.reject(error.response);
        }
        return Promise.reject(error);
    }
);

/**
 * This uses Axios library to call the token service.
 * @name retrieveToken
 * @param {string} id
 * @returns {Promise<*>} {@link inMemoryToken}
 */
const retrieveToken = async (id) => {
    const options = {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": SERVICE_HOST
        },
        // This will pass the HTTP Only cookie we need to pass REST API.
        withCredentials: true
    };

    await axios
        .get(TOKEN_URL, options)
        .then((response) => {
            if (response.status === 401) {
                clearInterval(id);
            } else {
                storeToken(response.data.payload);
            }
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
        });

    return inMemoryToken;
};

/**
 * This Component does not return anything and instead just sets an interval
 * to call retrieveToken.
 * @name TokenRefresh
 * @constructor retrieveToken {@link retrieveToken}
 */
const TokenRefresh = () => {
    const [dispatchState, setDispatchState] = useState(null);
    const { dispatch } = useContext(GlobalContext);

    /**
     * Either set or reset the inMemoryToken
     */
    useEffect(() => {
        const id = setInterval(() => {
            if (inMemoryToken) {
                // call token service is token is expired
                if (+inMemoryToken.expiry - +EXPIRY_BUFFER_MILLI < Date.now()) {
                    inMemoryToken = null;
                    retrieveToken(id).then((response) => {
                        inMemoryToken = response;
                    });
                }
            } else {
                retrieveToken(id).then((response) => {
                    inMemoryToken = response;
                });
            }
            setDispatchState(inMemoryToken);
        }, TOKEN_EXPIRY_CHECK_MILLI);

        return () => clearInterval(id);
    }, []);

    /**
     * Retrieve the token and set it in Global Context
     */
    useEffect(() => {
        const runDispatch = (token) => {
            if (token) {
                dispatch({ type: "Token Update", token: token.token });
                dispatch({
                    type: "Get Username",
                    username: token.username
                });
            }
        };
        if (!dispatchState) {
            runDispatch(inMemoryToken);
        }
    }, [dispatch, dispatchState]);
};

/**
 * This is to just get the inMemoryToken.
 * @name readToken
 * @returns {*} {@link inMemoryToken}
 */
const readToken = () => {
    return inMemoryToken;
};

/**
 * Refresh the token, so that it doesn't expire
 * @name Auth
 * @return {null}
 * @constructor
 */
const Auth = () => {
    TokenRefresh();
    return null;
};

export { retrieveToken, logout, Auth, readToken };
