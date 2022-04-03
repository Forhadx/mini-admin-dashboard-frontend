import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.scss";
import Dashboard from "./components/Dashboard";
import AddProduct from "./Pages/AddProduct";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import ProductList from "./Pages/ProductList";
import UserList from "./Pages/UserList";
import UpdateProduct from "./Pages/UpdateProduct";
import UserContext from "./store/user/User-Context";

const App = () => {
  const UserCtx = useContext(UserContext);

  const { token, autoLogin } = UserCtx;

  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      autoLogin();
    }
    if (token && (pathname === "/login" || pathname === "/signup")) {
      navigate("/");
    }
    if (!token && pathname === "/") {
      navigate("/login");
    }
  }, [autoLogin, token, pathname, navigate]);

  let routes = (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );

  if (token) {
    routes = (
      <Dashboard>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/update-product/:pId" element={<UpdateProduct />} />
        </Routes>
      </Dashboard>
    );
  }

  return <div className="App">{routes}</div>;
};

export default App;
