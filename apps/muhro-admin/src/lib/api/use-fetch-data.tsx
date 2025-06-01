/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { signOut } from "next-auth/react";
import { useGetHeaders } from "@/lib/hooks/use-get-headers";

interface Header extends AxiosRequestConfig {
  headers: {
    "Content-Type": string;
    Accept: string;
    Authorization: string;
  };
}
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403) {
      signOut();
    }
    return Promise.reject(error);
  }
);
export const useFetchData = (
  queryKey: (string | number | boolean | undefined | null | any)[],
  url: string,
  headers?: Header["headers"] | any,
  enabled?: boolean
) => {
  const header = useGetHeaders({});
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${url}`,
        { headers: headers ?? header }
      );
      return response.data;
    },
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
    retry: true,
    enabled: enabled,
  });
};
