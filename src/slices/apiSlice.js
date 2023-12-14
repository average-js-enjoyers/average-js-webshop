//src/slices/apiSlice.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BASE_URL,
  USER_URL,
  AUTH_URL,
  ADMIN_URL,
  PRODUCT_URL,
} from "config/constants";

// Set of protected endpoints that require authentication with JWT token
const protectedEndpoints = new Set(["getUser", "getUserAddresses"]);

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { endpoint }) => {
    if (protectedEndpoints.has(endpoint)) {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Cart", "Address"],
  endpoints: (builder) => ({
    // Endpoints are injected here by the various api slices
  }),
});

export default apiSlice;
