import React from "react";
import Sidebar from "./Sidebar";

const Dashboard = (props) => {
  return (
    <div className="dashboard-page">
      <Sidebar />
      <main className="main">{props.children}</main>
    </div>
  );
};

export default Dashboard;
