import { Button } from "@coop-super-app/ui/button";
import { Text } from "@coop-super-app/ui/typography";
import React from "react";

type Props = {
  message: string;
  onRefresh: () => void;
};
const ErrorMessage = ({ message, onRefresh }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-1 w-full p-3 py-5">
      <Text>{message}</Text>
      <Button onClick={onRefresh}>Try Again</Button>
    </div>
  );
};

export default ErrorMessage;
