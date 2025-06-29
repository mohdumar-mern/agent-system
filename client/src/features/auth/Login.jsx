import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../app/api/apiSlice";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [login, { isLoading, error }] = useLoginMutation();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData).unwrap();
      localStorage.setItem("token", res.token);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed!");
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className=" shadow-xl shadow-gray-500 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Admin Login
        </h2>

        {error?.data?.message && (
          <p className="text-red-500 text-center mb-4">{error.data.message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
