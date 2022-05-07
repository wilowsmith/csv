import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Auth, retrieveToken } from "../../utils/auth/Auth";
import { ContextProvider } from "../contextProvider/ContextProvider";

const PrivateRoute = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        retrieveToken().then((response) => {
            setToken(response);
        });
    }, []);

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return token ? (
        <ContextProvider>
            <Outlet />
            <Auth />
        </ContextProvider>
    ) : (
        <Auth />
    );
};

export default PrivateRoute;
