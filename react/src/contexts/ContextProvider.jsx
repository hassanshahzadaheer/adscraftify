import { createContext, useContext, useState } from "react";

// Create a context with initial values for user and token
const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

// Export a context provider component
export const ContextProvider = ({ children }) => {
    // State for user and token
    const [user, setUser] = useState( {
        name: 'aheer',
    });
    const [token, _setToken] = useState(() => localStorage.getItem("ACCESS_TOKEN") || null);


    // Function to set the token and update local storage
    const setToken = (token) => {
        _setToken(token);

        // If a token exists, store it in local storage; otherwise, remove it
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    // Render the context provider with the state and functions as the context value
    return (
        <StateContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

// Export a custom hook for accessing the context
export const useStateContext = () => useContext(StateContext);
