import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";
import Swal from "sweetalert2";

export default function Registration() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { post, endpoints } = useContext(ApiContext);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required.";
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        await post(endpoints.register, formData);
        setSubmitted(true);
        setErrors({});
        Swal.fire("Success", "Registration successful!", "success");
        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        console.error("Registration error:", error);
        setErrors({ general: "Registration failed. Please try again." });
        Swal.fire("Error", "Registration failed. Please try again.", "error");
        setSubmitted(false);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-800 to-black p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-green-900">Register</h2>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm px-4 py-2 focus:ring-green-600 focus:border-green-600"
          />
          {errors.username && <p className="text-red-600 text-sm">{errors.username}</p>}
        </div>

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

        <div>
          <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm px-4 py-2 focus:ring-green-600 focus:border-green-600"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-green-400" : "bg-green-700 hover:bg-green-800"
          } text-white font-semibold py-2 px-4 rounded-xl transition duration-200`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {submitted && (
          <p className="text-green-700 text-center font-semibold mt-4">
            Registration successful! Redirecting to login...
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
