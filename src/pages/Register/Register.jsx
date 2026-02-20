import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Toast from "../../components/Toast/Toast";
import PageTransition from "../../components/PageTransition/PageTransition";
import useToast from "../../hooks/useToast";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { register, user } = useAuth();
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
      await register(form);
      navigate("/");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed";
      showToast(message);
    }
  };

  return (
    <PageTransition>
      <div className="auth-page">
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
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
            Register
          </button>
        </form>
        <p>
          Already a member? <Link to="/login">Login</Link>
        </p>
        <Toast message={message} />
      </div>
    </PageTransition>
  );
};

export default Register;
