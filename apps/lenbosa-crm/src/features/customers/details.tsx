"use client";

import PageWrapper from "@/components/PagesWrapper";
import React from "react";
import UserDetailPanel from "./components/CustomerDetails";
import ActivityLogs from "./components/ActivityLogs";
import { useParams } from "next/navigation";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { formatDate } from "@/utils/lib/format-date-time";
import { EthiopianPhoneNumber } from "@/utils/lib/ethiopian-phone";

const Details = () => {
  const params = useParams();
  const id = params?.id;

  const customerDataResponse = useFetchData(
    [queryKeys.customers, id],
    `${queryKeys.customers}/${id}`
  );

  const customerData: customerDataProps = customerDataResponse?.data?.data;

  return (
    <PageWrapper
      title="Customer Details"
      back={true}
      search={false}
      isLoading={customerDataResponse.isFetching}
      isError={customerDataResponse.isError}
      notfound={!customerData}
      fallback={{
        status_code: "404",
        title: "Customer data not found",
        message: "",
      }}
      breadcrumb={true}
      childrenClassnames="bg-white rounded-xl p-4 mt-4"
    >
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 md:col-span-6">
          <UserDetailPanel
            profilePhoto={customerData?.profile_photo_url}
            name={customerData?.name}
            userName={customerData?.username}
            customer_type={customerData?.customer_type}
            registeredAt={formatDate(new Date(customerData?.created_at))}
            email={customerData?.email}
            phoneNumber={EthiopianPhoneNumber(customerData?.phone) || ""}
            subscription={customerData?.subscriptions}
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <ActivityLogs activities={[]} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Details;
