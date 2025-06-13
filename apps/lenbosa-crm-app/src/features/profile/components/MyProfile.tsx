"use client";

import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { toast } from "sonner";
import { IoMdClose } from "react-icons/io";
import { Text, Title } from "@yegna-systems/ui/typography";
import { Button } from "@yegna-systems/ui/button";
import { validationSchema } from "@/validations/user.schema";
import { signIn, useSession } from "next-auth/react";
import useDynamicMutation from "@/lib/api/use-post-data";
import Loader from "@yegna-systems/lib/table/loader";
import FormikInput from "@yegna-systems/lib/forms/input";

interface FormValues {
  email: string;
  your_name: string;
  father_name: string;
}

const MyProfile: React.FC = () => {
  const postMutation = useDynamicMutation({});
  const { data: session } = useSession();

  const [edit, setEdit] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const userInformation = useFetchData(
    [queryKeys.my_profile],
    `${queryKeys.my_profile}`
  );
  const data = userInformation?.data;

  const handleEditButtonClick = () => {
    setEdit(!edit);
  };

  const handleEditingProfile = async (values: FormValues) => {
    setSubmitting(true);
    const Payload = {
      name: values.your_name + " " + values.father_name,
    };

    try {
      await postMutation.mutateAsync({
        url: queryKeys.update_profile,
        method: "POST",
        body: Payload,
        onSuccess: (res) => {
          if (res.success) {
            const userData = {
              ...session,
              user: res?.data,
            };

            signIn("credentials", {
              data: JSON.stringify(userData),
              redirect: false,
            });
            toast.success("User updated successfully");
            setEdit(false);
          }
        },
      });
    } catch {
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:border-transparent";
  const errorClass = "text-sm text-red-600 mt-1";

  return (
    <div className="max-w-3xl mx-auto p-6">
      {userInformation.isFetching ? (
        <div className="mt-10 flex justify-center">
          <Loader />
        </div>
      ) : userInformation.error ? (
        <div>
          <Title as="h5">Problem Getting Your Profile</Title>
          <Text>There is error getting your profile</Text>
        </div>
      ) : !data ? (
        <div>
          <Title as="h5">Profile not found</Title>
          <Text>List of profile are not found</Text>
        </div>
      ) : (
        <Formik
          initialValues={{
            email: session?.user?.email || "",
            your_name: session?.user?.name?.split(" ")[0] || "",
            father_name: session?.user?.name?.split(" ")[1] || "",
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleEditingProfile}
        >
          {() => (
            <Form className="space-y-6">
              <div className="flex justify-end">
                {edit ? (
                  <button type="button" onClick={handleEditButtonClick}>
                    <IoMdClose size={20} />
                  </button>
                ) : (
                  <Button
                    variant="text"
                    type="button"
                    onClick={handleEditButtonClick}
                    className="text-primary underline"
                  >
                    Edit
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="your_name" className="block font-medium">
                    Your Name
                  </label>
                  <FormikInput
                    name="your_name"
                    type="text"
                    className={inputClass}
                    disabled={!edit}
                  />
                  {edit && (
                    <ErrorMessage
                      name="your_name"
                      component="div"
                      className={errorClass}
                    />
                  )}
                </div>

                <div>
                  <label htmlFor="father_name" className="block font-medium">
                    Father Name
                  </label>
                  <FormikInput
                    name="father_name"
                    type="text"
                    className={inputClass}
                    disabled={!edit}
                  />
                  {edit && (
                    <ErrorMessage
                      name="father_name"
                      component="div"
                      className={errorClass}
                    />
                  )}
                </div>
              </div>

              {!edit && (
                <div>
                  <label htmlFor="email" className="block font-medium">
                    Email Address
                  </label>
                  <FormikInput
                    name="email"
                    type="email"
                    className={inputClass}
                    disabled
                  />
                </div>
              )}

              {edit && (
                <div className="flex justify-end">
                  <Button
                    title="Save Changes"
                    variant="solid"
                    type="submit"
                    className="text-white px-6 py-2 rounded-md hover:bg-primary-dark disabled:opacity-50"
                    disabled={submitting}
                    isLoading={submitting}
                  >
                    <Text className="text-secondary">Save Changes</Text>
                  </Button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default MyProfile;
