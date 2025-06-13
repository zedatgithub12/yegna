"use client";

import React from "react";
import PageWrapper from "@/components/PagesWrapper";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { queryKeys } from "@/lib/api/query-keys";
import { useParams } from "next/navigation";
import MoreInfoPanel from "./components/MoreInfo";

import InstitutionDetailsPanel from "./components/InstitutionDetails";

const InstitutionDetail: React.FC = () => {
  const params = useParams();
  const id = params?.id;

  const schoolDataResponse = useFetchData(
    [queryKeys.get_school_single, id],
    `${queryKeys.get_school_single}/${id}`
  );

  const institutionData = schoolDataResponse?.data?.data;

  if (!institutionData) {
    return (
      <PageWrapper
        title="User Account Details"
        back={true}
        search={false}
        isLoading={schoolDataResponse.isFetching}
        isError={schoolDataResponse.isError}
        notfound={!institutionData}
        fallback={{
          status_code: "404",
          title: "User data not found",
          message: "",
        }}
        breadcrumb={true}
      />
    );
  }

  return (
    <PageWrapper
      title="User Account Details"
      back={true}
      search={false}
      isLoading={schoolDataResponse.isFetching}
      isError={schoolDataResponse.isError}
      notfound={!institutionData}
      fallback={{
        status_code: "404",
        title: "User data not found",
        message: "",
      }}
      breadcrumb={true}
      hasActionButton
      childrenClassnames="bg-white rounded-xl p-4 mt-4"
    >
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 md:col-span-6">
          <InstitutionDetailsPanel id={id as string} values={institutionData} />
        </div>
        <div className="col-span-12 md:col-span-6">
          <MoreInfoPanel
            agreements={institutionData.agreements}
            documents={institutionData.documents}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default InstitutionDetail;
