import React, { useState, useEffect } from "react";
import { useAddNewContactMutation } from "./contactApiSlice";

const AddContactForm = () => {
  const [file, setFile] = useState(null);

  const [addNewContact, { isLoading, isSuccess, isError, error }] =
    useAddNewContactMutation();

  useEffect(() => {
    if (isSuccess) {
      setFile(null);
      alert("Contacts distributed successfully!");
    }
  }, [isSuccess]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (
      selected &&
      [
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].includes(selected.type)
    ) {
      setFile(selected);
    } else {
      alert("Only CSV, XLS, XLSX files allowed.");
      setFile(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a valid file first.");

    const formData = new FormData();
    formData.append("csv", file);

    try {
      await addNewContact(formData).unwrap();
      
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="mb-10 ">
      <h1 className="text-2xl font-bold text-blue-600 text-center mb-4">
        Upload & Distribute Contacts
      </h1>

      <form
        onSubmit={handleUpload}
        className="bg-white p-6 max-w-md space-y-4"
      >
        {isError && (
          <p className="text-red-600 text-sm">
            {error?.data?.message || "Upload failed"}
          </p>
        )}

        <input
          type="file"
          accept=".csv, .xlsx, .xls"
          onChange={handleFileChange}
          className="w-full border p-2 rounded"
          disabled={isLoading}
        />

        {file && (
          <p className="text-sm text-gray-600">Selected file: {file.name}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded text-white font-semibold transition ${
            isLoading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Uploading..." : "Upload & Distribute"}
        </button>
      </form>
    </div>
  );
};

export default AddContactForm;
