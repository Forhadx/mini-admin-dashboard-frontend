const Reducer = (state, action) => {
  switch (action.type) {
    case "USER_SIGNUP_START":
      return {
        ...state,
        token: null,
        userId: null,
        loading: true,
        error: false,
      };
    case "USER_SIGNUP_ERROR":
      return {
        ...state,
        token: null,
        userId: null,
        loading: false,
        error: true,
      };
    case "USER_SIGNUP":
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        loading: false,
        error: false,
      };
    case "USER_LOGIN_START":
      return {
        ...state,
        token: null,
        userId: null,
        loading: true,
        error: false,
      };
    case "USER_LOGIN_ERROR":
      return {
        ...state,
        token: null,
        userId: null,
        loading: false,
        error: true,
      };
    case "USER_LOGIN":
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        loading: false,
        error: false,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        token: null,
        userId: null,
        loading: false,
        error: false,
      };
    case "USER_AUTO_LOGIN":
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        loading: false,
        error: false,
      };
    case "FETCH_USERS_START":
      return {
        ...state,
        users: [],
        loading: true,
        error: false,
      };
    case "FETCH_USERS_ERROR":
      return {
        ...state,
        users: [],
        loading: false,
        error: true,
      };
    case "FETCH_USERS":
      return {
        ...state,
        users: action.users,
        loading: false,
        error: false,
      };

    default:
      return state;
  }
};

export default Reducer;
