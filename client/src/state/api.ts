import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { FetchArgs, BaseQueryApi } from "@reduxjs/toolkit/query";

const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    // Adicione headers se necessário
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  });

  try {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error) {
      return { error: result.error };
    }

    if (result.data) {
      return {
        data: result.data || result.data,
      };
    }

    return {
      error: {
        status: "CUSTOM_ERROR",
        error: "No data received",
      },
    };
  } catch (error: unknown) {
    return {
      error: {
        status: "FETCH_ERROR",
        error: error instanceof Error ? error.message : "Unknown error",
      },
    };
  }
};
export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "api",
  tagTypes: ["Courses"],
  endpoints: (build) => ({
    getCourses: build.query<Course[], { category?: string }>({
      query: ({ category }) => ({
        url: "courses",
        params: { category },
      }),
      providesTags: ["Courses"],
    }),
    getCourse: build.query<Course, string>({
      query: (id) => `courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Courses", id }],
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseQuery } = api;
