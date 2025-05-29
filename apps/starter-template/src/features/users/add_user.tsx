"use client";

import PageWrapper from "@/components/PagesWrapper";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import useDynamicMutation from "@/lib/api/use-post-data";
import { createUserValidationSchema } from "@/validations/user.schema";
import { Button } from "@yegna-systems/ui/button";
import { Text, Title } from "@yegna-systems/ui/typography";
import { Form, Formik } from "formik";
import { useRouter } from "nextjs-toploader/app";
import React from "react";
import { toast } from "sonner";
import FormikMultiSelect from "@yegna-systems/lib/forms/multi-select";
import FormikInput from "@yegna-systems/lib/forms/input";
import FileUploader from "@/components/FileUploader";
import FormikPasswordInput from "@yegna-systems/lib/forms/password";

const AddUser = () => {
  const router = useRouter();
  const postMutation = useDynamicMutation({ type: "FormData" });

  const responsePayload = useFetchData(
    [queryKeys.get_roles],
    `${queryKeys.get_roles}`
  );

  const rolesData: rolesProps[] = responsePayload?.data?.data;

  const initialValues: UserFormValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    role: [],
    password: "",
    confirm_password: "",
    profileImage: null,
  };

  const handleFormSubmission = async (values: UserFormValues) => {
    try {
      const formData = new FormData();
      const fullName = [values.firstName, values.middleName, values.lastName]
        .filter(Boolean)
        .join(" ");

      formData.append("name", fullName);
      formData.append("phone", values.phoneNumber);
      formData.append("email", values.email);
      if (values.password) {
        formData.append("password", values.password);
      }
      values.role.forEach((roleId) => formData.append("roles[]", roleId));
      if (values.profileImage) {
        formData.append("profileImage", values.profileImage);
      }

      await postMutation.mutateAsync({
        url: queryKeys.get_users,
        method: "POST",
        body: formData,

        onSuccess: (res) => {
          if (res.success) {
            toast.success("Successfully added new user!");
            router.back();
          } else {
            toast.error(res.message);
          }
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
        validationSchema={createUserValidationSchema}
        onSubmit={handleFormSubmission}
      >
        {({ values, setFieldValue }) => (
          <Form className="pb-4 pr-4">
            <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full">
              <div className="col-span-12 md:col-span-4 ">
                <Title as="h6" className="font-medium capitalize">
                  User Information.
                </Title>
                <Text
                  as="p"
                  className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
                >
                  Add your user information from here
                </Text>
              </div>
              <div className="col-span-12 md:col-span-8 space-y-3">
                <div>
                  <Title as="h6" className="font-normal w-full">
                    First name
                  </Title>

                  <FormikInput
                    name="firstName"
                    variant="outline"
                    placeholder="Enter First Name"
                    value={values.firstName}
                    onChange={(event) =>
                      setFieldValue("firstName", event.target.value)
                    }
                  />
                </div>

                <div>
                  <Title as="h6" className="font-normal w-full">
                    Middle name
                  </Title>

                  <FormikInput
                    name="middleName"
                    variant="outline"
                    placeholder="Enter First Name"
                    value={values.middleName}
                    onChange={(event) =>
                      setFieldValue("middleName", event.target.value)
                    }
                  />
                </div>

                <div>
                  <Title as="h6" className="font-normal w-full">
                    Last name
                  </Title>

                  <FormikInput
                    name="lastName"
                    variant="outline"
                    placeholder="Enter Last Name"
                    value={values.lastName}
                    onChange={(event) =>
                      setFieldValue("lastName", event.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <Title as="h6" className="font-normal w-full">
                      Phone
                    </Title>

                    <FormikInput
                      name="phoneNumber"
                      variant="outline"
                      placeholder="Enter Phone Number"
                      value={values.phoneNumber}
                      pattern="number"
                      maxLength={10}
                      onChange={(event) =>
                        setFieldValue("phoneNumber", event.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Title as="h6" className="font-normal w-full">
                      Email
                    </Title>

                    <FormikInput
                      name="email"
                      variant="outline"
                      placeholder="Enter Email"
                      value={values.email}
                      onChange={(event) =>
                        setFieldValue("email", event.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <FormikMultiSelect
                    options={
                      rolesData
                        ? rolesData?.map((item) => ({
                            label: item.name,
                            value: item.uuid,
                          }))
                        : []
                    }
                    searchable
                    name="role"
                    label="Role"
                    placeholder="Select role"
                    onChange={(selectedOptions: string[]) =>
                      setFieldValue("role", selectedOptions)
                    }
                    value={values.role}
                  />
                </div>
              </div>
            </div>
            <hr className="border my-6" />
            <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full">
              <div className="col-span-12 md:col-span-4 ">
                <Title as="h6" className="font-medium capitalize">
                  Create Password.
                </Title>
                <Text
                  as="p"
                  className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
                >
                  Add the user signin password
                </Text>
              </div>

              <div className="col-span-12 md:col-span-8 ">
                <FormikPasswordInput
                  label="New Password"
                  name="password"
                  placeholder="Enter Your Password"
                  className="w-full mt-2"
                  labelClassName="text-[16px] font-light text-black"
                />

                <FormikPasswordInput
                  label="Confirm Password"
                  name="confirm_password"
                  placeholder="Enter Password Confirmation"
                  className="w-full mt-4"
                  labelClassName="text-[16px] font-light text-black"
                />
              </div>
            </div>

            <hr className="border my-6" />
            <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full">
              <div className="col-span-12 md:col-span-4 ">
                <Title as="h6" className="font-medium capitalize">
                  Upload Photo.
                </Title>
                <Text
                  as="p"
                  className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
                >
                  Upload user photo here
                </Text>
              </div>

              <div className="col-span-12 md:col-span-8 ">
                <FileUploader
                  title="Profile Image"
                  name="profileImage"
                  value={values.profileImage}
                  setSelectedFile={(profileImage) =>
                    setFieldValue("profileImage", profileImage)
                  }
                />

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
                    <Text className="text-secondary font-medium text-[16px]">
                      {" "}
                      Submit{" "}
                    </Text>
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  );
};

export default AddUser;
