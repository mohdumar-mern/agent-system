import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetAgentsQuery,
  selectAllAgents,
  useDeleteAgentMutation,
} from "./agentApiSlice";
import AddAgentForm from "./AddAgentForm";
import { Trash, Eye } from "lucide-react";

const Agent = () => {
  const navigate = useNavigate();
  const { isLoading, isError, error } = useGetAgentsQuery();
  const [deleteAgent, { error: deleteError }] = useDeleteAgentMutation();
  const agents = useSelector(selectAllAgents);

  const handleDelete = async (agentId) => {
    try {
      if (!agentId) throw new Error("Missing agentId");
      await deleteAgent(agentId).unwrap();
    } catch (err) {
      console.error(deleteError?.data?.message || err.message);
    }
  };

  const handleView = (agentId) => {
    if (!agentId) return;
    navigate(`/agents/${agentId}/contacts`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      {/* 🔽 Always show Add Agent Form */}
      <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
        <AddAgentForm />

        {isError && (
          <p className="text-red-600 text-sm mt-4">
            Error loading agents: {error?.data?.message || "Unknown error"}
          </p>
        )}
      </div>

      {/* 🔽 Show loader or agents table only if not error */}
      {!isError && (
        <div className="max-w-5xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            Agent List
          </h2>

          {isLoading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : Array.isArray(agents) && agents.length === 0 ? (
            <p className="text-center text-gray-600">No agents found.</p>
          ) : (
            <div className="overflow-x-auto bg-white shadow rounded-lg">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                  <tr>
                    <th className="p-3 border-b">#</th>
                    <th className="p-3 border-b">Name</th>
                    <th className="p-3 border-b">Email</th>
                    <th className="p-3 border-b">Mobile</th>
                    <th className="p-3 border-b text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent, idx) => (
                    <tr key={agent.id} className="hover:bg-gray-50">
                      <td className="p-3 border-b">{idx + 1}</td>
                      <td className="p-3 border-b">{agent.name}</td>
                      <td className="p-3 border-b">{agent.email}</td>
                      <td className="p-3 border-b">{agent.phone}</td>
                      <td className="p-3 border-b text-center space-x-2">
                        <button
                          onClick={() => handleView(agent.id)}
                          className="inline-flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          <Eye size={16} />
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(agent.id)}
                          className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          <Trash size={16} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Agent;
