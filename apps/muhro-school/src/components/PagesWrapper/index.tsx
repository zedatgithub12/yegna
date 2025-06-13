import React from "react";
import Header from "../Header";
import FallbackComponent from "@/utils/fallback/NotFound";
import { Loader } from "rizzui/loader";
import cn from "@yegna-systems/ui/cn";

const PageWrapper = ({
  title,
  search,
  back = false,
  breadcrumb = true,
  hasActionButton = false,
  actionButtons,
  children,
  isLoading,
  isError,
  fallback,
  notfound,
  childrenClassnames,
  staticComponent,
}: pageWrapperProps) => {
  return (
    <div>
      <Header
        title={title}
        search={search}
        back={back}
        breadcrumb={breadcrumb}
        hasActionButton={hasActionButton}
        actionButtons={actionButtons}
      />

      <div className={cn("py-2 px-0.5", childrenClassnames)}>
        {staticComponent}
        {isLoading ? (
          <div className="w-full h-52 flex flex-col items-center justify-center">
            <Loader color="success" className="w-8 h-8 text-primary" />
          </div>
        ) : isError && fallback ? (
          <FallbackComponent
            status_code={fallback?.status_code}
            title={fallback?.title}
            message={fallback?.message}
            action={fallback?.action}
          />
        ) : notfound && fallback ? (
          <FallbackComponent
            status_code={fallback?.status_code}
            title={fallback?.title}
            message={fallback?.message}
            action={fallback?.action}
          />
        ) : (
          <div>{children}</div>
        )}
      </div>
    </div>
  );
};

export default PageWrapper;
