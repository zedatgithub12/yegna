import React from "react";
import RequestActionViewCard from "./request-action-view-card";
import RejectRequestConfirmation from "./rejection-confirmation";
import ApproveRequestConfirmation from "./approve-confirmation";
import SectionWrapper from "@coop-super-app/lib/view/section-wrapper";

const CheckerActions = () => {
  const action = {
    Text: (
      <RequestActionViewCard
        title="title"
        description="description"
        rejectConfirmView={<RejectRequestConfirmation url="" />}
        approveConfirmView={<ApproveRequestConfirmation url="" />}
      />
    ),
  };
  return (
    <SectionWrapper>
      {" "}
      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 ">
        {action["Text"]}
        {action["Text"]}
      </div>
    </SectionWrapper>
  );
};

export default CheckerActions;
