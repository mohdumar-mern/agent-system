import React from 'react';
import { useGetDashboardStatsQuery } from '../../app/api/apiSlice';

const Dashboard = () => {
  const { data, isLoading, isError, error } = useGetDashboardStatsQuery();

  if (isLoading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (isError)
    return (
      <div className="p-6 text-red-600">
        Error: {error?.data?.message || error?.message || "Something went wrong"}
      </div>
    );

  const agentCount = data?.agentCount || 0;
  const contactCount = data?.contactCount || 0;
  const status = data?.admin ? 'Yes' : 'No';

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Welcome, Admin!</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <StatCard label="Total Agents" value={agentCount} color="text-blue-600" />
        <StatCard label="Total Contacts" value={contactCount} color="text-green-600" />
        <StatCard label="Logged In" value={status} color="text-purple-600" />
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }) => (
  <div className="bg-white p-6 rounded shadow text-center">
    <h2 className="text-lg font-semibold text-gray-700 mb-2">{label}</h2>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);

export default Dashboard;
