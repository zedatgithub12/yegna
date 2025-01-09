import PasswordIcon from "@/components/icons/password";
import ModalHeader from "@/components/modal-header";
import useDynamicMutation from "@/lib/api/usePostData";
import useCustomerStore from "@/store/customer.store";
import { Avatar } from "@coop-super-app/ui/avatar";
import { Button } from "@coop-super-app/ui/button";
import { Input } from "@coop-super-app/ui/input";
import { Title, Text } from "@coop-super-app/ui/typography";
import React from "react";
import { toast } from "sonner";

type Props = {
  description: string;
};
const SearchCustomer = ({ description }: Props) => {
  const [inputValue, setInputValue] = React.useState("");
  const { customerInfo } = useCustomerStore((state) => state);
  const postMutation = useDynamicMutation();
  //must be post request previous is get
  return (
    <div className="flex flex-col items-center justify-center space-y-5 p-5">
      <ModalHeader
        icon={<PasswordIcon />}
        title="Search Customer"
        desc={description}
      />
      <div className="w-full">
        <Input
          placeholder="Search Customer by account number or phone number"
          label="Search Customer"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          inputClassName="text-sm bg-gray-50 dark:bg-gray-100 placeholder:!text-gray-950 [&>label>span]:font-medium border-gray-50  shadow-none !mr-0 !pr-0"
          size="md"
          suffix={
            <div className="flex items-end justify-end self-end">
              <Button
                className="!m-0 hover:bg-primary disabled:hover:bg-transparent"
                type="submit"
                size="md"
                color="primary"
                isLoading={postMutation.isPending}
                onClick={() => {
                  if (!inputValue) {
                    toast.warning(
                      "Please enter account number or phone number"
                    );
                    return;
                  }
                }}
              >
                Search
              </Button>
            </div>
          }
        />
        {customerInfo && (
          <div className="bg-[#F2F5FF] p-2 rounded-md flex items-center gap-3 w-full">
            <Avatar name={customerInfo.fullName ?? ""} size="md" />
            <div>
              <Title as="h6" className=" capitalize">
                {customerInfo.fullName}
              </Title>
              <Text className="capitalize">{customerInfo.phoneNumber}</Text>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCustomer;
