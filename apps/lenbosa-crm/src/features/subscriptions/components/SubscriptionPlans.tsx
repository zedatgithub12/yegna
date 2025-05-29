import { Text, Title } from "@yegna-systems/ui/typography";
import { Button } from "@yegna-systems/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { routes } from "@/lib/config/routes";
import { Switch } from "@/components/ui/switch";
import EditPencil from "@/components/icons/edit-pencil";

type Props = {
  plans: SubscriptionPlans[];
};

const SubscriptionPlans: React.FC<Props> = ({ plans }) => {
  const router = useRouter();
  return (
    <section className="p-1.5 my-4">
      <Title as="h4">Subscription Plans</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl  px-2 pt-6 pb-3.5 flex flex-col "
          >
            <div className="flex items-start justify-between mb-4 px-2">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  background: plan.color
                    ? `linear-gradient(45deg, ${plan.color})`
                    : "#ddd",
                }}
              >
                {" "}
                <div className="w-6 h-6 rounded-full bg-white" />{" "}
              </div>
              {/* <Tooltip
                content={
                  <div
                    className="text-sm text-gray-400 my-1 w-52"
                    dangerouslySetInnerHTML={{ __html: plan.description ?? "" }}
                  />
                }
              >
                <InfoIcon color="#AAAAAA" className="w-5 h-5" />
              </Tooltip> */}

              <div className="flex items-center gap-2">
                <Text className="text-[#4BB543]">
                  {plan.is_active ? "Active" : "InActive"}
                </Text>
                <Switch
                  variant="flat"
                  checked={plan.is_active}
                  size="sm"
                  onIcon={<Check className="p-0.5 text-primary" />}
                />
              </div>
            </div>

            <div className="border-b pb-2 px-2">
              <Title as="h4" className="text-lg font-bold mt-4">
                {plan.name}
              </Title>
              <div
                className="text-sm text-gray-400 my-1"
                dangerouslySetInnerHTML={{ __html: plan.description ?? "" }}
              />
            </div>

            <ul className="space-y-4 flex-1 pt-3 px-2">
              {plan?.features?.map((feature, i) => (
                <li key={i} className="flex items-center text-sm text-gray-700">
                  <Check className="text-green-500 w-4 h-4 mr-2" />
                  {feature.feature.name}
                </li>
              ))}
            </ul>

            <div className="w-full px-2 pb-1">
              <Button
                variant="outline"
                color="primary"
                className="mt-6 w-full rounded-lg py-3 border-primary text-[15px] font-medium text-primary flex items-center justify-center gap-2"
                onClick={() => router.push(routes.subscription.edit(plan.id))}
              >
                <EditPencil
                  className="w-4 h-4 text-inherit"
                  stroke="#0B4650"
                  color="#0B4650"
                />{" "}
                Edit Plan
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubscriptionPlans;
