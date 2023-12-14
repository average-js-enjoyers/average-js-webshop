//src/slices/userApiSlice.js

import { USER_URL } from "config/constants";
import { apiSlice } from "slices/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: `${USER_URL}/profile`,
        method: "GET",
      }),
      transformResponse: (response) => {
        const { data } = response;
        const { user } = data;
        return user;
      },
    }),
    getUserAddresses: builder.query({
      query: () => ({
        url: `${USER_URL}/profile/address`,
        method: "GET",
      }),
      transformResponse: (response) => {
        const { data } = response;
        return data.data;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserQuery, useGetUserAddressesQuery } = userApi;
