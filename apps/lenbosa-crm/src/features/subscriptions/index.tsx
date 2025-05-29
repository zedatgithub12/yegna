"use client";

import React from "react";
import PageWrapper from "@/components/PagesWrapper";
import SvgWrapper from "@/components/SvgWrapper";
import BillingCycle from "./components/BillingCycle";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { routes } from "@/lib/config/routes";
import { Button } from "@yegna-systems/ui/button";
import { useRouter } from "nextjs-toploader/app";
import SubscriptionPlans from "./components/SubscriptionPlans";

const Subscriptions = () => {
  const router = useRouter();

  const subscriptionPayload = useFetchData(
    [queryKeys.subscriptions],
    queryKeys.subscriptions
  );
  const subscriptionData: SubscriptionPlans[] =
    subscriptionPayload?.data?.data?.data;

  return (
    <PageWrapper
      isLoading={subscriptionPayload.isFetching}
      title="Subscription Management"
      back={false}
      search={true}
      isError={subscriptionPayload.isError}
      breadcrumb={true}
      hasActionButton
      actionButtons={
        <Button
          variant="solid"
          color="primary"
          className="hover:bg-primary-dark text-secondary font-medium cursor-pointer gap-1 rounded-lg py-5"
          onClick={() => router.push(routes.subscription.create)}
        >
          <SvgWrapper
            src="/icons/add-01.svg"
            width="22px"
            height="22px"
            color="#bbf451"
          />
          Add New Plan
        </Button>
      }
    >
      <BillingCycle />
      <SubscriptionPlans plans={subscriptionData} />
    </PageWrapper>
  );
};

export default Subscriptions;
