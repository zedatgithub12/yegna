"use client";

import PageWrapper from "@/components/PagesWrapper";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import useDynamicMutation from "@/lib/api/use-post-data";
import { editUserValidationSchema } from "@/validations/user.schema";
import { Button } from "@yegna-systems/ui/button";
import { Text, Title } from "@yegna-systems/ui/typography";
import { Form, Formik } from "formik";
import { useRouter } from "nextjs-toploader/app";
import React from "react";
import { toast } from "sonner";
import FormikMultiSelect from "@yegna-systems/lib/forms/multi-select";
import FormikInput from "@yegna-systems/lib/forms/input";
import FileUploader from "@/components/FileUploader";
import { useParams } from "next/navigation";

const EditUser = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const postMutation = useDynamicMutation({ type: "FormData" });

  const responsePayload = useFetchData(
    [queryKeys.get_roles],
    `${queryKeys.get_roles}`
  );

  const rolesData: rolesProps[] = responsePayload?.data?.data;

  //get the selected user detail
  const userDataResponse = useFetchData(
    [queryKeys.get_users, id],
    `${queryKeys.get_users}/${id}`
  );

  const userData: UserDataProps = userDataResponse?.data?.data;
  const userName = userData?.name ? userData.name.split(" ") : [];

  const initialValues: UserFormValues = {
    firstName: userName![0] || "",
    middleName: userName![1] || "",
    lastName: userName![2] || "",
    phoneNumber: userData?.phone || "",
    email: userData?.email || "",
    role: userData?.roles.map((role) => role.uuid) || [],
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
      values.role.forEach((roleId) => formData.append("roles[]", roleId));
      if (values.profileImage) {
        formData.append("profile_photo_url", values.profileImage);
      }

      await postMutation.mutateAsync({
        url: `${queryKeys.get_users}/${id}`,
        method: "PATCH",
        body: formData,

        onSuccess: (res) => {
          if (res.success) {
            toast.success(res.message);
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
      title="Edit User"
      back={true}
      search={false}
      isLoading={userDataResponse.isFetching}
      isError={userDataResponse.isError}
      breadcrumb={true}
      childrenClassnames="bg-white rounded-xl p-4 mt-4"
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={editUserValidationSchema}
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
                            label: item.role,
                            value: item._id,
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
                  previewUrl={userData.profile_photo_url}
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
                      Save Changes
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

export default EditUser;
