import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" py-16">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-6">
          Welcome to Agent Distribution System
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-8">
          Effortlessly manage your agents, distribute contacts equally,
          and keep everything organized with our smart dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition duration-200"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/agents"
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition duration-200"
          >
            Manage Agents
          </Link>
          <Link
            to="/contact/upload"
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-semibold transition duration-200"
          >
            Upload Contacts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
