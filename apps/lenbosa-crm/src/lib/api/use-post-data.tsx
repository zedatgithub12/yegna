/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetHeaders } from "@/lib/hooks/use-get-headers";
import { useMutation } from "@tanstack/react-query";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosProgressEvent,
} from "axios";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

type MutationOptions = {
  url: string;
  method: AxiosRequestConfig["method"];
  body?: any;
  headers?: AxiosRequestConfig["headers"];
  onSuccess?: (data: AxiosResponse["data"]) => void;
  onError?: (error: any) => void;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403) {
      signOut();
    }

    return Promise.reject(error);
  }
);
const useDynamicMutation = ({type="Json"}:{type?: "FormData" | "Json";}) => {
  const header = useGetHeaders({type});
  const dynamicMutation = useMutation({
    mutationFn: async (options: MutationOptions) => {
      const {
        url,
        method,
        body,
        headers,
        onUploadProgress,
        onDownloadProgress,
      } = options;
      try {
        const response = await axios.request({
          url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
          method,
          headers: headers || header,
          data: body,
          onUploadProgress,
          onDownloadProgress,
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      if (variables.onSuccess) {
        variables.onSuccess(data);
      }
    },
    onError: (error, variables) => {
      if (variables.onError) {
        variables.onError(error);
      }
      const isString =
        typeof (error as any)?.response?.data?.message === "string";
      toast.error(
        isString
          ? (error as any)?.response?.data?.message
          : "Something went wrong",
        { className: "bg-red-500 text-white" }
      );
    },
    retry: false,
  });

  return dynamicMutation;
};

export default useDynamicMutation;
