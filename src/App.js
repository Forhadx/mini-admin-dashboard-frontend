import React, { useContext, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.scss";
import Dashboard from "./components/Dashboard";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import ProductList from "./Pages/ProductList";
import UserList from "./Pages/UserList";
import UserContext from "./store/user/User-Context";

const App = () => {
  const UserCtx = useContext(UserContext);

  const { token, autoLogin } = UserCtx;

  useEffect(() => {
    if (!token) {
      autoLogin();
    }
  }, [autoLogin, token]);

  let routes = (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );

  if (token) {
    routes = (
      <Dashboard>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Dashboard>
    );
  }

  return <div className="App">{routes}</div>;
};

export default App;
