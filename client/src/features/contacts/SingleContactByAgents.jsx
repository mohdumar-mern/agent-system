import { useParams } from "react-router-dom";
import { useGetContactsByAgentIdQuery } from "./contactApiSlice";

const AgentContacts = () => {
  const { id } = useParams();

  const {
    data: contacts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetContactsByAgentIdQuery(id);

  if (isLoading) return <div className="p-6 text-gray-600">Loading...</div>;

  if (isError)
    return (
      <div className="p-6 text-red-600 font-medium">
        Error: {error?.data?.message || "Something went wrong"}
      </div>
    );

  if (!contacts || contacts.length === 0) {
    return (
      <div className="p-6 text-gray-500">
        No contacts found for this agent.
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Contacts Assigned to Agent ID:{" "}
        <span className="text-blue-600 font-bold">{id}</span>
      </h2>

      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">First Name</th>
              <th className="p-3 border-b">Phone</th>
              <th className="p-3 border-b">Notes</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c, index) => (
              <tr
                key={c._id || index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-3 border-b">{index + 1}</td>
                <td className="p-3 border-b font-medium text-gray-700">
                  {c.firstName}
                </td>
                <td className="p-3 border-b text-gray-600">{c.phone}</td>
                <td className="p-3 border-b italic text-gray-500">{c.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentContacts;
