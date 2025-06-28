import React, { useEffect, useState } from "react";
import { useAddNewAgentMutation } from "./agentApiSlice";

const AddAgentForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [addNewAgent, { isLoading, isSuccess, isError, error }] =
    useAddNewAgentMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Agent added successfully!");
      setForm({ name: "", email: "", phone: "", password: "" });
      // Optional: show success toast/alert here
    }
  }, [isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.password) return;
    try {
      await addNewAgent(form).unwrap();
    } catch (err) {
      console.error("Agent creation failed:", err);
    }
  };

  return (
    <div className="mb-10 max-w-md w-full mx-auto">
      <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Add New Agent
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-5"
      >
        {isError && (
          <p className="text-red-600 text-sm text-center">
            {error?.data?.message || "Something went wrong."}
          </p>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            placeholder="John Doe"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="example@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone (with country code)
          </label>
          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91XXXXXXXXXX"
            className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-4 py-2 rounded text-white font-semibold ${
            isLoading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 transition"
          }`}
        >
          {isLoading ? "Adding..." : "Add Agent"}
        </button>
      </form>
    </div>
  );
};

export default AddAgentForm;
