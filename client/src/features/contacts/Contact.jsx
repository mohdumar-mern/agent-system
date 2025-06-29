import AddContactForm from "./AddContactForm";
import { useGetContactsQuery, selectAllContacts } from "./contactApiSlice";
import { useSelector } from "react-redux";

const Contact = () => {
  const { isLoading, isSuccess, isError, error, refetch } =
    useGetContactsQuery();

  const allContacts = useSelector(selectAllContacts);

  // Group contacts by agent or "Unassigned"
  const groupedContacts = {};
  allContacts?.forEach((contact) => {
    const key = contact.assignedTo || "Unassigned";
    if (!groupedContacts[key]) groupedContacts[key] = [];
    groupedContacts[key].push(contact);
  });

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* 🧾 Contact Upload Form (Always Visible) */}
      <div className="p-6 max-w-md mx-auto rounded shadow bg-white">
        <AddContactForm />

        {isLoading && (
          <p className="text-center text-gray-500 mt-4">Loading contacts...</p>
        )}

        {isError && (
          <div className="text-center mt-4">
            <p className="text-red-600 font-semibold">
              Error: {error?.data?.message || "Failed to fetch contacts"}
            </p>
            <button
              onClick={refetch}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      {/* 📊 Contact Display */}
      {isSuccess && allContacts?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Distributed Contacts by Agent
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(groupedContacts).map(([agentId, contactList]) => (
              <div key={agentId} className="bg-white p-4 rounded shadow">
                <h3 className="text-blue-600 font-bold mb-2">
                  Agent ID: {agentId}
                </h3>
                <ul className="text-sm space-y-1">
                  {contactList.map((c, idx) => (
                    <li key={idx} className="border-b pb-1">
                      <strong>{c.firstName}</strong> - {c.phone}
                      <br />
                      <span className="text-gray-500 italic">{c.notes}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🟡 Fallback if no contacts */}
      {isSuccess && allContacts?.length === 0 && (
        <div className="text-center mt-6 text-gray-600">
          No contacts uploaded yet.
        </div>
      )}
    </div>
  );
};

export default Contact;
