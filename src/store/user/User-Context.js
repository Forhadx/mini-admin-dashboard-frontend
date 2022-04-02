import { createContext, useCallback, useReducer } from "react";
import axios from "axios";
import Reducer from "./User-Reducer";

const UserContext = createContext({
  users: [],
  userId: null,
  token: null,
  loading: false,
  error: false,
  userSignup: function (userData) {},
  userLogin: function (data) {},
  userLogout: function () {},
  autoLogin: function () {},
  fetchUsers: function () {},
});

const initialState = {
  userId: null,
  token: null,
  loading: false,
  error: false,
};

export function UserContextProvider(props) {
  const [userState, dispatch] = useReducer(Reducer, initialState);

  // USER SIGNUP
  const onUserSignup = useCallback(async (data) => {
    dispatch({
      type: "USER_SIGNUP_START",
    });
    try {
      const result = await axios.post("http://localhost:5000/api/signup", data);
      const expirationDate = new Date(
        new Date().getTime() + 365 * 24 * 3600 * 1000
      );
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userId", result.data.userId);
      dispatch({
        type: "USER_SIGNUP",
        token: result.data.token,
        userId: result.data.userId,
      });
    } catch (err) {
      dispatch({
        type: "USER_SIGNUP_ERROR",
      });
    }
  }, []);

  // USER LOGIN
  const onUserLogin = useCallback(async (data) => {
    dispatch({
      type: "USER_LOGIN_START",
    });
    try {
      const result = await axios.post("http://localhost:5000/api/login", data);
      const expirationDate = new Date(
        new Date().getTime() + 365 * 24 * 3600 * 1000
      );
      console.log("res: ", result);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userId", result.data.userId);
      dispatch({
        type: "USER_LOGIN",
        token: result.data.token,
        userId: result.data.userId,
      });
    } catch (err) {
      dispatch({
        type: "USER_LOGIN_ERROR",
      });
    }
  }, []);

  //  LOGOUT
  const onUserLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    dispatch({
      type: "USER_LOGOUT",
    });
  };

  // AUTH TIMEOUT
  const checkAuthTimeout = useCallback(async (expirationTime) => {
    setTimeout(() => {
      onUserLogout();
    }, expirationTime * 1000);
  }, []);

  // AUTO LOGIN
  const onAutoLogin = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      onUserLogout();
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        onUserLogout();
      } else {
        dispatch({
          type: "USER_AUTO_LOGIN",
          token: localStorage.getItem("token"),
          userId: localStorage.getItem("userId"),
        });
        await checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        );
      }
    }
  }, [checkAuthTimeout]);

  // FETCH ALL USERS
  const onFetchUsers = useCallback(async () => {
    dispatch({
      type: "FETCH_USERS_START",
    });
    try {
      const result = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZAZi5jb20iLCJ1c2VySWQiOiI2MjQ4NTQ5MjllZGU3ZjQwYzE4MmRjNzkiLCJpYXQiOjE2NDg5MjQzMTMsImV4cCI6MTY1MTUxNjMxM30.zrbYXK6XnrVXHbZ5Hg6BOyZJuuJL3CirXPvpr7IeCTY",
        },
      });
      dispatch({
        type: "FETCH_USERS",
        users: result.data.users,
      });
    } catch (err) {
      dispatch({
        type: "FETCH_USERS_ERROR",
      });
    }
  }, []);

  const context = {
    users: userState.users,
    token: userState.token,
    userId: userState.userId,
    userSignup: onUserSignup,
    userLogin: onUserLogin,
    userLogout: onUserLogout,
    autoLogin: onAutoLogin,
    fetchUsers: onFetchUsers,
  };
  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
