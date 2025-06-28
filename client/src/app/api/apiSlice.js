import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      console.log("TOKEN SETTING IN HEADER:", token); // 🔍

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Agents", "Contacts", "Dashboard"],

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getDashboardStats: builder.query({
      query: () => ({
        url: "/admin/stats",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useLoginMutation, useGetDashboardStatsQuery } = apiSlice;
