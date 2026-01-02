import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    api.get("/profile/me").then((res) => setUser(res.data));
    api.get("/tasks/").then((res) => setTasks(res.data));

    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) setProfileImage(savedImage);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem("profileImage", reader.result);
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const updatePassword = async () => {
    if (!newPassword) {
      alert("Please enter a new password");
      return;
    }

    await api.put("/profile/", null, {
      params: { password: newPassword },
    });

    alert("Password updated successfully");
    setNewPassword("");
  };

  const pendingTasks = tasks.filter((t) => !t.completed);

  return (
    <div className="profile-bg">
      <div className="profile-card">

        {/* LEFT */}
        <div className="profile-left">
          <div className="image-wrapper">
            <img
              src={
                profileImage ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              alt="Profile"
            />

            <label className="image-upload">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </label>
          </div>

          <h3>{user.username}</h3>
          <p>{user.email}</p>

          <hr />

          <h5>Update Password</h5>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={updatePassword}>Update Password</button>
        </div>

        {/* RIGHT */}
        <div className="profile-right">
          <h2>Pending Tasks</h2>

          {pendingTasks.length === 0 ? (
            <p className="empty"> No pending tasks</p>
          ) : (
            pendingTasks.map((task) => (
              <div className="task-card" key={task.id}>
                <strong>{task.title}</strong>
                <p>{task.description}</p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Profile;
