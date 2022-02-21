import { useCallback, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../components/contextProvider/ContextProvider";
import UserDao from "../dao/UserDao";

/**
 * Query the user service for a user's details and write it to sessionStorage
 * @name UserDetails
 * @return {[]}
 */
const UserDetails = () => {
    // user details sessionStorage item may not be written onLoad
    const [userDetails, setUserDetails] = useState(
        JSON.parse(sessionStorage.getItem("user_details"))
    );

    // gets state from context provider
    const { state } = useContext(GlobalContext);
    const { token, username } = state || null;

    /**
     * Write UserDetails to session storage.
     * @name writeUserDetails
     * @param {string} name
     * @param {{}} payload
     */
    const writeUserDetails = (name, payload) => {
        sessionStorage.setItem(name, JSON.stringify(payload));
    };

    /**
     * Query the UserDetail service and set a 'user_detail' sessionStorage item.
     * @name callUserDetails
     * @callback
     * @return {Promise<unknown>}
     */
    const callUserDetails = useCallback(async () => {
        const options = {
            action: "userDetailsRead",
            username,
            token
        };
        UserDao(options)
            .then((response) => {
                writeUserDetails("user_details", response.data.payload);
            })
            .catch((error) => {
                // @TODO: log the error to a service?
                // eslint-disable-next-line no-console
                console.log(error);
                // if there is a problem, remove the existing session storage item
                sessionStorage.removeItem("user_details");
            });
    }, [token, username]);

    /**
     * Retrieve user details from the user_details session storage
     * @name getUserDetails
     * @callback
     */
    const getUserDetails = useCallback(
        (userInterval) => {
            const user = JSON.parse(sessionStorage.getItem("user_details"));
            if (user) {
                setUserDetails(user);
                clearInterval(userInterval);
            } else if (token && username) {
                callUserDetails().then();
            }
        },
        [token, username, callUserDetails]
    );

    /**
     * If unable to read user_details sessionStorage, set an interval to keep checking
     */
    useEffect(() => {
        if (!userDetails) {
            const userInterval = setInterval(() => {
                getUserDetails(userInterval);
            }, 1000);
        }
    }, [getUserDetails, userDetails]);

    return userDetails || null;
};

export default UserDetails;
