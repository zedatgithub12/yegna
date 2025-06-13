"use client";

import PageWrapper from "@/components/PagesWrapper";
import React from "react";
import GeneralInformation from "./sections/GeneralInformation";
import Permissions from "./sections/Permissions";
import { Button } from "@yegna-systems/ui/button";
import { Text } from "@yegna-systems/ui/typography";
import { generalInfoValidationSchema } from "@/validations/role.schema";
import { Form, Formik } from "formik";
import useDynamicMutation from "@/lib/api/use-post-data";
import { queryKeys } from "@/lib/api/query-keys";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateRole = () => {
  const router = useRouter();
  const postMutation = useDynamicMutation({});
  const initialValues = {
    name: "",
    description: "",
    permissions: [],
  };

  const handleFormSubmission = async (values: CreateRoleProps) => {
    try {
      await postMutation.mutateAsync({
        url: queryKeys.create_role,
        method: "POST",
        body: {
          role: values.name,
          permissions: values.permissions,
        },

        onSuccess: () => {
          toast.success("Successfully created new role");
          router.back();
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <PageWrapper
      isLoading={false}
      title="Create New Role"
      back={true}
      search={false}
      breadcrumb={true}
      childrenClassnames="bg-white rounded-xl p-4 mt-4"
    >
      <Formik
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
                <Text className="text-secondary"> Create Role </Text>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  );
};

export default CreateRole;
