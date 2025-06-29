import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// Normalized state for all contacts
const contactAdapter = createEntityAdapter();
const initialState = contactAdapter.getInitialState();

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Fetch all contacts (normalized)
    getContacts: builder.query({
      query: () => "/contacts",
      transformResponse: (responseData) => {
        const loadedContacts = responseData.map((contact) => {
          contact.id = contact._id;
          return contact;
        });
        return contactAdapter.setAll(initialState, loadedContacts);
      },
      providesTags: (result, error, arg) =>
        result?.ids
          ? [
              { type: "Contact", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Contact", id })),
            ]
          : [{ type: "Contact", id: "LIST" }],
    }),

    // 🔹 Upload CSV contact data
    addNewContact: builder.mutation({
      query: (initialContact) => ({
        url: "/contacts/upload",
        method: "POST",
        body: initialContact,
      }),
      invalidatesTags: [{ type: "Contact", id: "LIST" }],
    }),

    // 🔹 Get contacts by agent (return raw array)
    getContactsByAgentId: builder.query({
      query: (agentId) => `/agents/${agentId}/contacts`,
      transformResponse: (responseData) =>
        responseData.map((contact) => ({
          ...contact,
          id: contact._id,
        })),
      providesTags: (result, error, arg) =>
        result?.length
          ? [
              ...result.map((contact) => ({
                type: "Contact",
                id: contact.id,
              })),
            ]
          : [],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddNewContactMutation,
  useGetContactsByAgentIdQuery,
} = contactApiSlice;

// 🔹 Normalized Selectors for getContacts only
export const selectContactsResult =
  contactApiSlice.endpoints.getContacts.select();

const selectContactsData = createSelector(
  selectContactsResult,
  (contactsResult) => contactsResult?.data,
);

export const {
  selectAll: selectAllContacts,
  selectById: selectContactById,
  selectIds: selectContactIds,
} = contactAdapter.getSelectors(
  (state) => selectContactsData(state) ?? initialState,
);
