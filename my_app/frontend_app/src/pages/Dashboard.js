import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/profile/me").then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <div className="dashboard-bg">
      <div className="dashboard-content">
        <h1 className="dashboard-title">
        Welcome, {user.username ?? user.email?.split("@")[0]}
        </h1>
        <p className="dashboard-sub">{user.email}</p>

        <div className="dashboard-cards">
          <div
            className="dash-card"
            onClick={() => navigate("/profile")}
          >
            <h3>Profile</h3>
            <p>View & update your profile</p>
          </div>

          <div
            className="dash-card"
            onClick={() => navigate("/tasks")}
          >
            <h3>Tasks</h3>
            <p>Manage your daily tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
