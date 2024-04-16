export const authReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, user },
  } = action;

  switch (type) {
    case "SET_AUTH":
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        user,
      };
    case "EDIT_USER":
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};
