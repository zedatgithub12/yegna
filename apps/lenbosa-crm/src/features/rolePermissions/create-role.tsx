"use client";

import PageWrapper from "@/components/PagesWrapper";
import React from "react";
import GeneralInformation from "./create/GeneralInformation";
import Permissions from "./create/Permissions";
import { Button } from "@yegna-systems/ui/button";
import { Text } from "@yegna-systems/ui/typography";
import { generalInfoValidationSchema } from "@/validations/role.schema";
import { Form, Formik } from "formik";

const CreateRole = () => {
  const initialValues = {
    name: "",
    description: "",
    permissions: [],
  };

  const handleFormSubmission = async (values: CreateRoleProps) => {
    console.log(values);
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
            <Permissions />{" "}
            <div className=" py-4 flex items-center justify-end gap-4 w-full">
              <Button
                variant="outline"
                size="md"
                className="px-1 w-36 border-gray-400 rounded-md font-semibold"
              >
                <Text className="text-gray-600"> Cancel </Text>
              </Button>

              <Button
                variant="solid"
                size="md"
                color="primary"
                className="px-1 w-36 rounded-md font-bold"
                type="submit"
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
