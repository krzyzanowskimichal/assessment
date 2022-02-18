import { createContext, useEffect, useReducer } from "react";
import { ACTIONS } from "../actions/actions";
import reducer from "../reducers/reducer";

const initialState = {
  users: [],
  loading: false,
  error: null
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("https://assessment-users-backend.herokuapp.com/users", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        fetchUsers(data);
      });
  }, []);

  const fetchUsers = (user) => {
    dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: user });
  };

  const fetchError = (error) => {
    dispatch({ type: ACTIONS.FETCH_ERROR, payload: error });
  };

  const addUser = (user) => {
    dispatch({
      type: ACTIONS.ADD_USER,
      payload: user
    });
  };

  const editUser = (user) => {
    dispatch({
      type: ACTIONS.EDIT_USER,
      payload: user
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        users: state.users,
        fetchUsers,
        fetchError,
        addUser,
        editUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
