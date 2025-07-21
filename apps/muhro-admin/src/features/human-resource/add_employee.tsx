"use client";

import React from "react";
import PageWrapper from "@/components/PagesWrapper";
import { queryKeys } from "@/lib/api/query-keys";
import { Text, Title } from "@yegna-systems/ui/typography";
import { Form, Formik } from "formik";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import useDynamicMutation from "@/lib/api/use-post-data";
import FormikInput from "@yegna-systems/lib/forms/input";
import banks from "@/data/banks.json";
import { Button } from "@yegna-systems/ui/button";
import { createStaffValidationSchema } from "@/validations/staff.schema";

const AddEmployee = () => {
  const router = useRouter();
  const postMutation = useDynamicMutation({ type: "Json" });

  const rolesData = [
    { id: "1", label: "Admin", value: "admin" },
    { id: "2", label: "VehicleAssigner", value: "vehicleAssigner" },
    { id: "3", label: "TutorManager", value: "tutorManager" },
    { id: "4", label: "Staff", value: "staff" },
  ];

  const initialValues: Staff = {
    first_name: "",
    middle_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    access_role: [],
    // profileImage: null,
    net_salary: 0,
    department: "admin",
    user_name: "",
    gender: "male",
    collection_account: 0,
    bank: "",
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
        net_salary: values.net_salary,
        department: values.department,
        gender: values.gender,
        bank: values.bank,
        user_name: values.user_name,
        collection_account: values.collection_account,
      };

      const res = await postMutation.mutateAsync({
        url: queryKeys.create_staff,
        method: "POST",
        body: payload,
      });

      if (res.success) {
        toast.success("Successfully added new staff!");
        router.back();
      } else {
        toast.error(res.message || "Failed to add new staff.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while adding staff.");
    }
  };

  return (
    <PageWrapper
      isLoading={false}
      title="Add Staff"
      back={true}
      search={false}
      breadcrumb={true}
      childrenClassnames="bg-white rounded-xl p-4 mt-4"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={createStaffValidationSchema}
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
                    placeholder="Enter First Name"
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
                      // pattern="number"
                      maxLength={13}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <Title as="h6" className="font-normal w-full mb-1">
                      Access Role
                    </Title>
                    <select
                      name="access_role"
                      value={values.access_role[0] || ""}
                      onChange={(e) =>
                        setFieldValue(
                          "access_role",
                          e.target.value ? [e.target.value] : []
                        )
                      }
                      className="bg-white border border-gray-300 rounded-md w-full p-2 text-sm"
                    >
                      <option value="">Select Access Role</option>
                      {rolesData.map((role) => (
                        <option key={role.id} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </div>
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
                  <div>
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
                  </div>
                </div>
              </div>
            </div>
            <hr className="border my-6" />

            <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full">
              <div className="col-span-12 md:col-span-4 ">
                <Title as="h6" className="font-medium capitalize">
                  Payroll Information
                </Title>
                <Text
                  as="p"
                  className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
                >
                  Add user’s payroll information here.
                </Text>
              </div>

              <div className="col-span-12 md:col-span-8 ">
                <div className="grid grid-cols-1 col-span-8 gap-4">
                  <div>
                    <Title as="h6" className="font-normal w-full mb-1">
                      Bank
                    </Title>
                    <select
                      name="bank"
                      value={values.bank}
                      onChange={(e) => setFieldValue("bank", e.target.value)}
                      className="bg-white border border-gray-300 rounded-md w-full p-2 text-sm"
                    >
                      <option value="">Select Bank</option>
                      {banks.map((bank, index) => (
                        <option key={index} value={bank.name}>
                          {bank.name}
                        </option>
                      ))}
                    </select>
                  </div>

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
                </div>
              </div>
            </div>

            <hr className="border my-6" />
            <div className="grid grid-cols-1 gap-4 p-2 justify-between w-full">
              {/* <div className="col-span-12 md:col-span-4 ">
                <Title as="h6" className="font-medium capitalize">
                  Upload Photo.
                </Title>
                <Text
                  as="p"
                  className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
                >
                  Upload user photo here
                </Text>
              </div> */}

              <div className="col-span-12 md:col-span-8 ">
                {/* <FileUploader
                  title="Profile Image"
                  name="profileImage"
                  value={values.profileImage}
                  setSelectedFile={(profileImage) =>
                    setFieldValue("profileImage", profileImage)
                  }
                /> */}

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

export default AddEmployee;
