import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const { post, endpoints } = useContext(ApiContext);
  const { login, user } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required.";
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const success = await login(formData.email, formData.password, endpoints.login);
      if (success) {
        setSubmitted(true);
        setErrors({});
      } else {
        setErrors({ general: "Invalid credentials" });
        setSubmitted(false);
      }
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === "Admin") {
        navigate("/leaderboard");
      } else {
        navigate(`/leaderboard/${user.id}`);
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-800 to-black p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-green-900">Othello Login</h2>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm px-4 py-2 focus:ring-green-600 focus:border-green-600"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm px-4 py-2 focus:ring-green-600 focus:border-green-600"
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
        >
          Login
        </button>

        {submitted && (
          <p className="text-green-700 text-center font-semibold mt-4">
            Login successful! Redirecting...
          </p>
        )}
        {errors.general && (
          <p className="text-red-600 text-center font-semibold mt-2">
            {errors.general}
          </p>
        )}
      </form>
    </div>
  );
}
