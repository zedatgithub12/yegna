import Loader from "@/components/Loader";
import { Switch } from "@/components/ui/switch";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import FallbackComponent from "@/utils/fallback/NotFound";
import { Text } from "@yegna-systems/ui/typography";
import { useFormikContext } from "formik";
import React from "react";

const PlanFeatures = () => {
  const { values, setFieldValue } = useFormikContext<SubscriptionFormValues>();
  const responsePayload = useFetchData(
    [queryKeys.features],
    `${queryKeys.features}`
  );

  const subscriptionPlanFeatures: SubscriptionPlanFeatures[] =
    responsePayload?.data?.data;

  const handleFeatureSelection = (
    inputValue: string,
    values: SubscriptionFormValues
  ) => {
    if (!values.features.includes(inputValue)) {
      setFieldValue("features", [...values.features, inputValue.trim()]);
    } else {
      const filteredFeatures = values?.features?.filter(
        (feature) => feature !== inputValue
      );
      setFieldValue("features", filteredFeatures);
    }
  };

  return (
    <div>
      {responsePayload.isFetching ? (
        <div className="w-full h-52 flex flex-col items-center justify-center">
          <Loader key="loader" size={14} />
        </div>
      ) : responsePayload.isError ? (
        <FallbackComponent
          status_code="500"
          title="There is error getting features"
          message="Try again"
        />
      ) : subscriptionPlanFeatures.length === 0 ? (
        <FallbackComponent
          status_code="400"
          title="No feature found"
          message="Unable to load the features, please contact the system super admin"
        />
      ) : (
        <div className="divide-y">
          {subscriptionPlanFeatures.map((feature) => (
            <div
              key={feature.id}
              className="flex items-center justify-between py-1.5 cursor-pointer overflow-hidden"
              onClick={() => handleFeatureSelection(feature.id, values)}
            >
              <Text className="text-[14.6px] font-medium">{feature.name}</Text>
              <Switch
                type="checkbox"
                size="sm"
                checked={values.features.includes(feature.id)}
                readOnly
                switchKnobClassName={`${values.features.includes(feature.id) ? "bg-secondary text-primary" : ""} `}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlanFeatures;
