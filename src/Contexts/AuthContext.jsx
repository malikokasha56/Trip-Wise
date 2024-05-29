import { createContext, useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "updateUser":
      return { ...state, user: { ...state.user, ...action.payload } };
    case "updateToken":
      return { ...state, isAuthenticated: true, token: action.payload };
    case "logout":
      return { ...state, isAuthenticated: false, token: null, user: null };
    default:
      throw new Error("Unknown action performed");
  }
}

function AuthProvider({ children }) {
  // Initialize state from local storage if available
  const storedState = JSON.parse(localStorage.getItem("authState"));
  const initialAuthState = storedState || initialState;

  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    // Update local storage whenever state changes
    localStorage.setItem("authState", JSON.stringify(state));
  }, [state]);

  function updateUser(data) {
    dispatch({ type: "updateUser", payload: data });
  }

  function updateToken(token) {
    dispatch({ type: "updateToken", payload: token });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        user: state.user,
        dispatch,
        logout,
        updateUser,
        updateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("Auth context is used out of its provider");
  }
  return context;
}

export { AuthProvider, useAuth };
