import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../store/user/User-Context";

const Sidebar = () => {
  const UserCtx = useContext(UserContext);
  const { userLogout } = UserCtx;

  const logoutHandler = () => {
    userLogout();
  };

  return (
    <div className="sidebar">
      <ul className="sidebar_lists">
        <li>Dashboard</li>
        <li>
          <Link to="/">Users</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li onClick={logoutHandler}>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
