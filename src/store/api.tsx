import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {
  fetchBaseQuery,
  createApi
} from "@reduxjs/toolkit/query/react";
import type { DetailMovieProps, MovieListProps } from "modules/types";

const baseUrl = "http://www.omdbapi.com";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
});

const fetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    console.log("error fetching:", result.error);

    switch (result.error.status) {
      case "FETCH_ERROR": {
        const message = "Oops.. Network request failed";
        const error = { ...result, error: { ...result.error, message } };
        return error;
      }
      default: {
        const message = "Oops.. Something went wrong";
        const error = { ...result, error: { ...result.error, message } };

        return error;
      }
    }
  }

  return result;
};

export const API = createApi({
  reducerPath: "API",
  baseQuery: fetchBase,
  endpoints: (builder) => ({
    getListMovies: builder.mutation<MovieListProps, string>({
      query: (param) => ({
        url: `/?apikey=448af22c&s=${param}`,
        method: "GET",
      }),
    }),
    getDetailMovies: builder.mutation<DetailMovieProps, string>({
      query: (param) => ({
        url: `/?apikey=448af22c&i=${param}`,
        method: "GET",
      }),
    }),
  }),
});


export const { useGetListMoviesMutation, useGetDetailMoviesMutation  } = API


