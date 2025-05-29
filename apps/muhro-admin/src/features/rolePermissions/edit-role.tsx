"use client";

import PageWrapper from "@/components/PagesWrapper";
import React from "react";

import { Button } from "@yegna-systems/ui/button";
import { Text } from "@yegna-systems/ui/typography";
import { generalInfoValidationSchema } from "@/validations/role.schema";
import { Form, Formik } from "formik";
import useDynamicMutation from "@/lib/api/use-post-data";
import { queryKeys } from "@/lib/api/query-keys";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import GeneralInformation from "./sections/GeneralInformation";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { useParams } from "next/navigation";
import Permissions from "./sections/Permissions";

const EditRole = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const postMutation = useDynamicMutation({});

  const handleFormSubmission = async (values: CreateRoleProps) => {
    try {
      await postMutation.mutateAsync({
        url: `${queryKeys.get_roles}/${id}`,
        method: "PATCH",
        body: values,

        onSuccess: (res) => {
          if (res.success) {
            toast.success(res.message);
            router.back();
          } else {
            toast.error(res.message);
          }
        },
      });
    } catch {
      toast.error("There is error saving changes");
    }
  };

  const responsePayload = useFetchData(
    [queryKeys.get_roles, id],
    `${queryKeys.get_roles}/${id}`
  );

  const roleData: rolesProps = responsePayload?.data?.data;

  const permissionUuids: string[] = Array.isArray(roleData?.permissions)
    ? roleData.permissions.map((perm: { uuid: string }) => perm.uuid)
    : [];

  const initialValues = {
    name: roleData?.name || "",
    description: roleData?.description || "",
    permissions: permissionUuids,
  };

  return (
    <PageWrapper
      isLoading={responsePayload.isFetching}
      title="Edit Role"
      isError={responsePayload.isError}
      back={true}
      search={false}
      breadcrumb={true}
      childrenClassnames="bg-white rounded-xl p-4 mt-4"
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={generalInfoValidationSchema}
        onSubmit={handleFormSubmission}
      >
        {() => (
          <Form className="pb-4 pr-4">
            <GeneralInformation />
            <Permissions />
            <div className=" py-4 flex items-center justify-end gap-4 w-full">
              <Button
                variant="outline"
                size="md"
                className="px-1 w-36 border-gray-400 rounded-md font-semibold"
                onClick={() => router.back()}
              >
                <Text className="text-gray-600"> Cancel </Text>
              </Button>

              <Button
                variant="solid"
                size="md"
                color="primary"
                className="px-1 w-36 rounded-md font-bold"
                type="submit"
                isLoading={postMutation.isPending}
              >
                <Text className="text-secondary"> Save Changes </Text>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  );
};

export default EditRole;
