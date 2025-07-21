"use client";

import PageWrapper from "@/components/PagesWrapper";
import { queryKeys } from "@/lib/api/query-keys";
import { useFetchData } from "@/lib/api/use-fetch-data";
import useDynamicMutation from "@/lib/api/use-post-data";
import { Button } from "@yegna-systems/ui/button";
import { Text, Title } from "@yegna-systems/ui/typography";
import { Form, Formik } from "formik";
import { useRouter } from "nextjs-toploader/app";
import React from "react";
import { toast } from "sonner";
import FormikMultiSelect from "@yegna-systems/lib/forms/multi-select";
import FormikInput from "@yegna-systems/lib/forms/input";
import banks from "@/data/banks.json";

import { useParams } from "next/navigation";
import { editStaffValidationSchema } from "@/validations/staff.schema";

const EditEmployee = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  console.log("Employee ID:", id);

  const postMutation = useDynamicMutation({ type: "Json" });

  const responsePayload = useFetchData(
    [queryKeys.get_school_roles],
    `${queryKeys.get_school_roles}`
  );

  const rolesData: rolesProps[] = responsePayload?.data?.data?.docs;

  //get the selected employee detail
  const employeeDataResponse = useFetchData(
    [queryKeys.get_single_employee, id],
    `${queryKeys.get_single_employee}${id}`
  );

  const employeeData: Staff = employeeDataResponse?.data?.data;

  const initialValues: Staff = {
    first_name: employeeData?.first_name || "",
    middle_name: employeeData?.middle_name || "",
    last_name: employeeData?.last_name || "",
    phone_number: employeeData?.phone_number || "",
    email: employeeData?.email || "",
    access_role: employeeData?.access_role || [],
    user_name: employeeData?.user_name,
    gender: employeeData?.gender || "",
    department: "admin",
    collection_account:
      typeof employeeData?.collection_account === "number"
        ? employeeData.collection_account
        : Number(employeeData?.collection_account) || 0,
    // net_salary: 0,
  };

  const handleFormSubmission = async (values: Staff) => {
    try {
      const payload = {
        first_name: values.first_name,
        middle_name: values.middle_name,
        last_name: values.last_name,
        phone_number: values.phone_number,
        email: values.email,
        access_role: values.access_role,
        // net_salary: values.net_salary,
        department: values.department,
        gender: values.gender,
        user_name: values.user_name,
        // collection_account: values.collection_account,
      };

      await postMutation.mutateAsync({
        url: `${queryKeys.get_single_employee}${id}`,
        method: "PATCH",
        body: payload,

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
      title="Edit Staff"
      back={true}
      search={false}
      isLoading={employeeDataResponse.isFetching}
      isError={employeeDataResponse.isError}
      breadcrumb={true}
      childrenClassnames="bg-white rounded-xl p-4 mt-4"
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={editStaffValidationSchema}
        onSubmit={handleFormSubmission}
      >
        {({ values, setFieldValue }) => (
          <Form className="pb-4 pr-4">
            <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full">
              <div className="col-span-12 md:col-span-4 ">
                <Title as="h6" className="font-medium capitalize">
                  Employee Information.
                </Title>
                <Text
                  as="p"
                  className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
                >
                  Add your employee information from here
                </Text>
              </div>
              <div className="col-span-12 md:col-span-8 space-y-3">
                <div>
                  <Title as="h6" className="font-normal w-full">
                    First name
                  </Title>

                  <FormikInput
                    name="first_name"
                    variant="outline"
                    placeholder="Enter First Name"
                    value={values.first_name}
                    onChange={(event) =>
                      setFieldValue("first_name", event.target.value)
                    }
                  />
                </div>

                <div>
                  <Title as="h6" className="font-normal w-full">
                    Middle name
                  </Title>

                  <FormikInput
                    name="middle_name"
                    variant="outline"
                    placeholder="Enter Middle Name"
                    value={values.middle_name}
                    onChange={(event) =>
                      setFieldValue("middle_name", event.target.value)
                    }
                  />
                </div>

                <div>
                  <Title as="h6" className="font-normal w-full">
                    Last name
                  </Title>

                  <FormikInput
                    name="last_name"
                    variant="outline"
                    placeholder="Enter Last Name"
                    value={values.last_name}
                    onChange={(event) =>
                      setFieldValue("last_name", event.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <Title as="h6" className="font-normal w-full">
                      Phone
                    </Title>

                    <FormikInput
                      name="phone_number"
                      variant="outline"
                      placeholder="Enter Phone Number"
                      value={values.phone_number}
                      pattern="number"
                      maxLength={10}
                      onChange={(event) =>
                        setFieldValue("phone_number", event.target.value)
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

                {/* <div>
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
                    name="access_role"
                    label="Role"
                    placeholder="Select role"
                    onChange={(selectedOptions: string[]) =>
                      setFieldValue("access_role", selectedOptions)
                    }
                    value={values.access_role}
                  />
                </div> */}
                <div>
                  <Title as="h6" className="font-normal w-full">
                    User Name
                  </Title>

                  <FormikInput
                    name="user_name"
                    variant="outline"
                    placeholder="Enter  user name"
                    value={values.user_name}
                    onChange={(event) =>
                      setFieldValue("user_name", event.target.value)
                    }
                  />
                </div>
                <div>
                  <Title as="h6" className="font-normal w-full mb-1">
                    Gender
                  </Title>
                  <select
                    name="gender"
                    value={values.gender}
                    onChange={(e) => setFieldValue("gender", e.target.value)}
                    className="bg-white border border-gray-300 rounded-md w-full p-2 text-sm"
                  >
                    <option value="">Select gender</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </select>
                </div>
                {/* <div>
                  <Title as="h6" className="font-normal w-full mb-1">
                    Net Salary
                  </Title>
                  <FormikInput
                    name="net_salary"
                    placeholder="Enter Your net salary"
                    value={values.net_salary}
                    pattern="number"
                    onChange={(e) =>
                      setFieldValue("net_salary", e.target.value)
                    }
                  />
                </div> */}
              </div>
            </div>

            <hr className="border my-6" />
            <div className="grid grid-cols-1 gap-4 p-2 justify-between w-full">
              {/* <div className="col-span-12 md:col-span-4 ">
                <Title as="h6" className="font-medium capitalize">
                  Payroll Information
                </Title>
                <Text
                  as="p"
                  className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
                >
                  Add user’s payroll information here.
                </Text>
              </div> */}

              <div className="col-span-12 md:col-span-8 ">
                {/* <div className="grid grid-cols-1 col-span-8 gap-4">
                  <div>
                    <Title as="h6" className="font-normal w-full mb-1">
                      Collection Account Number
                    </Title>
                    <FormikInput
                      name="collection_account"
                      placeholder="Enter Collection Account Number"
                      value={values.collection_account}
                      pattern="number"
                      onChange={(e) =>
                        setFieldValue("collection_account", e.target.value)
                      }
                    />
                  </div>
                </div> */}
                <div className="col-span-12 md:col-span-8 ">
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
            </div>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  );
};

export default EditEmployee;
