import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

// ✅ EMAIL VALIDATION FUNCTION (USED)
const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.com$/;
  return emailRegex.test(email);
};

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(form.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!form.password) {
      alert("Password is required");
      return;
    }

    try {
      const res = await api.post("/auth/login", form);
      login(res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={submit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="btn btn-success w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
