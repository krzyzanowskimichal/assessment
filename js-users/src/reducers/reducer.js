import { ACTIONS } from "../actions/actions";

const reducer = (state, action) => {
    switch (action.type) {

      case ACTIONS.FETCH_SUCCESS: {
        return {
          ...state,
          loading: false,
          users: action.payload
        };
      }
      case ACTIONS.FETCH_ERROR: {
        return {
          ...state,
          loading: false,
          error: 'asdsada'
        };
      }
      case ACTIONS.ADD_USER:
        return {
          ...state,
          users: [...state.users, action.payload]
        };
  
      case ACTIONS.EDIT_USER:
        const editedUser = action.payload;
  
        const editedUsers = state.users.map((user) => {
          if (user.id === editedUser.id) {
            return editedUser;
          }
          return user;
        });
  
        return {
          ...state,
          users: editedUsers
        };
  
      default:
        return state;
    }
  };
  
  export default reducer;
  