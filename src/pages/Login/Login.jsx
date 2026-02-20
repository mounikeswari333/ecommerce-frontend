import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Toast from "../../components/Toast/Toast";
import PageTransition from "../../components/PageTransition/PageTransition";
import useToast from "../../hooks/useToast";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const { message, showToast } = useToast();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Invalid credentials";
      showToast(message);
    }
  };

  return (
    <PageTransition>
      <div className="auth-page">
        <h2>Welcome back</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
          <button className="button" type="submit">
            Login
          </button>
        </form>
        <p>
          New here? <Link to="/register">Create account</Link>
        </p>
        <Toast message={message} />
      </div>
    </PageTransition>
  );
};

export default Login;
