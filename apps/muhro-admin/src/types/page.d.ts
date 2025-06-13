interface pageWrapperProps {
  hasHeader?: boolean;
  title?: string;
  search?: React.ReactNode;
  back?: boolean;
  breadcrumb?: boolean;
  hasActionButton?: boolean;
  actionButtons?: React.ReactNode;
  children?: React.ReactNode;
  isLoading?: boolean;
  notfound?: boolean;
  isError?: boolean;
  fallback?: {
    status_code?: string;
    title: string;
    message: string;
    action?: React.ReactNode;
  };
  childrenClassnames?: string;
  staticComponent?: React.ReactNode;
}
