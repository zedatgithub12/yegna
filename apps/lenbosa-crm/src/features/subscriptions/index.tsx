"use client";

import React, { useState } from "react";
import PageWrapper from "@/components/PagesWrapper";
import SvgWrapper from "@/components/SvgWrapper";
import BillingCycle from "./components/BillingCycle";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { routes } from "@/lib/config/routes";
import { Button } from "@yegna-systems/ui/button";
import { useRouter } from "nextjs-toploader/app";
import SubscriptionPlans from "./components/SubscriptionPlans";
import useDynamicMutation from "@/lib/api/use-post-data";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const Subscriptions = () => {
  const router = useRouter();
  const postMutation = useDynamicMutation({});
  const queryClient = useQueryClient();

  const [changingStatus, setChangingStatus] = useState(false);

  const subscriptionPayload = useFetchData(
    [queryKeys.subscriptions],
    queryKeys.subscriptions
  );
  const subscriptionData: SubscriptionPlans[] =
    subscriptionPayload?.data?.data?.data;

  const handleChangingPlanStatus = async (id: string) => {
    try {
      setChangingStatus(true);
      await postMutation.mutateAsync({
        url: `${queryKeys.changePlanStatus}/${id}`,
        method: "POST",

        onSuccess: (res) => {
          if (res.success) {
            toast.success(res?.data?.message);
            queryClient.invalidateQueries({
              queryKey: [queryKeys.subscriptions],
            });
          } else {
            toast.error(res.message);
          }
        },
      });
    } catch {
      toast.error("There is error changing the status");
    } finally {
      setChangingStatus(false);
    }
  };
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
      <SubscriptionPlans
        plans={subscriptionData}
        onChangePlanStatus={(id) => handleChangingPlanStatus(id)}
        isChanging={changingStatus}
      />
    </PageWrapper>
  );
};

export default Subscriptions;
