"use client";

import React from "react";

import { EthiopianPhoneNumber } from "@/utils/lib/ethiopian-phone";

import PageWrapper from "@/components/PagesWrapper";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { queryKeys } from "@/lib/api/query-keys";
import { useParams } from "next/navigation";
import MoreInfoPanel from "./components/MoreInfo";

import InstitutionDetailsPanel from "./components/InstitutionDetails";

const InstitutionDetail: React.FC = () => {
  const params = useParams();
  const id = params?.id;

  const institutionDataResponse = useFetchData(
    [queryKeys.get_institution, id],
    `${queryKeys.get_institution}/${id}`
  );

  const institutionData = institutionDataResponse?.data?.data;

  if (!institutionData) {
    return (
      <PageWrapper
        title="User Account Details"
        back={true}
        search={false}
        isLoading={institutionDataResponse.isFetching}
        isError={institutionDataResponse.isError}
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
      isLoading={institutionDataResponse.isFetching}
      isError={institutionDataResponse.isError}
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
          <InstitutionDetailsPanel
            profile_photo_url={institutionData.profile_photo_url}
            name={institutionData.name}
            email={institutionData.email}
            phone={EthiopianPhoneNumber(institutionData.phone) || ""}
            admin={{
              id: institutionData.admin.id,
              name: institutionData.admin.name,
              email: institutionData.admin.email,
              phone: institutionData.admin.phone,
              username: institutionData.admin.username,
              gender: institutionData.admin.gender,
              status: institutionData.admin.status,
              created_at: institutionData.admin.created_at,
              profile_photo_url: institutionData.admin.profile_photo_url,
            }}
            id={institutionData.id}
            user_id={institutionData.user_id}
            category_id={institutionData.category_id}
            tin_number={institutionData.tin_number}
            number_of_agents={institutionData.number_of_agents}
            location={{
              latitude: institutionData.location.latitude,
              longitude: institutionData.location.longitude,
            }}
            created_at={institutionData.created_at}
            documents={institutionData.documents}
            agreements={institutionData.agreements}
            category={{
              id: institutionData.category.id,
              name: institutionData.category.name,
              type: institutionData.category.type,
              created_at: institutionData.category.created_at,
            }} // address={institutionData.address}
          />
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
