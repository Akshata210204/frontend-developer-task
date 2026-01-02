import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

// ✅ EMAIL VALIDATION FUNCTION (USED)
const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.com$/;
  return emailRegex.test(email);
};

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name) {
      alert("Name is required");
      return;
    }

    if (!isValidEmail(form.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!form.password || form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      await api.post("/auth/register", form);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h3 className="text-center mb-3">Register</h3>

        <form onSubmit={submit}>
          <input
            className="form-control mb-3"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
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

          <button className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
