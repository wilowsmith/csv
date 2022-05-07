import React, { useReducer } from "react";
import PropTypes from "prop-types";

// Set up our reducer function to act on Previous and Next selections
function reducer(state, action) {
    switch (action.type) {
        case "Token Update":
            return {
                ...state,
                token: action.token
            };
        case "Get Username":
            return {
                ...state,
                username: action.username
            };
        default:
            return { token: null };
    }
}

// Set the count to 0
const initialState = { token: null, username: null };
// Create a counter context, initially storing the initialState
const GlobalContext = React.createContext(initialState);
// Create a counter-provider to pass down the
const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        /**
         * Pass an object with the current state and dispatch values as props
         * to the context provider and allow all children of <CounterProvider/>
         * component to have these context values
         */
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};

ContextProvider.propTypes = {
    children: PropTypes.node
};

ContextProvider.defaultProps = {
    children: null
};

export { GlobalContext, ContextProvider };
