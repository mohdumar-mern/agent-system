import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// ✅ Adapter for Normalized State
const agentAdapter = createEntityAdapter({});
const initialState = agentAdapter.getInitialState();

export const agentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Fetch All Agents
    getAgents: builder.query({
      query: () => ({
        url: "/agents",
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      transformResponse: (responseData) => {
        const loadedAgents = responseData.map((agent) => {
          agent.id = agent._id;
          return agent;
        });
        return agentAdapter.setAll(initialState, loadedAgents);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Agent", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Agent", id })),
            ]
          : [{ type: "Agent", id: "LIST" }],
    }),

    // ✅ Add Agent
    addNewAgent: builder.mutation({
      query: (initialAgent) => ({
        url: "/agents",
        method: "POST",
        body: { ...initialAgent },
      }),
      invalidatesTags: [{ type: "Agent", id: "LIST" }],
    }),

    // Delete agent
    deleteAgent: builder.mutation({
      query: ( id ) => ({
        url: `/agents`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Agent", id: arg.id }],
    })
  }),
});

// ✅ Hooks
export const { useGetAgentsQuery, useAddNewAgentMutation, useDeleteAgentMutation } = agentApiSlice;

// ✅ Select Query Result
export const selectAgentsResult = agentApiSlice.endpoints.getAgents.select();

// ✅ Fixed: Memoized Selector with Fallback
const selectAgentsData = createSelector(
  selectAgentsResult,
  (agentsResult) => agentsResult?.data ?? initialState // ✅ Fallback added
);

// ✅ Export Normalized Selectors
export const {
  selectAll: selectAllAgents,
  selectById: selectAgentById,
  selectIds: selectAgentIds,
} = agentAdapter.getSelectors((state) => selectAgentsData(state));
