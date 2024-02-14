import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
const AuthContext = createContext();

const initialState = { isAuthenticated: false, token: null, user: null };

function reducer(state, action) {
  switch (action.type) {
    case "updateUser":
      return { ...state, user: { ...state.user, ...action.payload } };
    case "updateToken":
      return { ...state, isAuthenticated: true, token: action.payload };

    case "logout":
      return { ...state, isAuthenticated: false };
    default:
      throw new Error("Unknown action performed");
  }
}

function AuthProvider({ children }) {
  const [{ isAuthenticated, token, user }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function updateUser(data) {
    dispatch({ type: "updateUser", payload: data });
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, dispatch, logout, updateUser, user }}
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
