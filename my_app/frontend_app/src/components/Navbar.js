import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();              // clear token
    navigate("/login");    // ✅ redirect to login
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">MyApp</span>

      <div>
        {/* BEFORE LOGIN */}
        {!token && (
          <>
            <Link to="/login" className="btn btn-outline-light me-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline-light">
              Register
            </Link>
          </>
        )}

        {/* AFTER LOGIN */}
        {token && (
          <>
            <Link to="/dashboard" className="btn btn-outline-light me-2">
              Dashboard
            </Link>

            <Link to="/profile" className="btn btn-outline-light me-2">
              Profile
            </Link>

            <Link to="/tasks" className="btn btn-outline-light me-2">
              Tasks
            </Link>

            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
