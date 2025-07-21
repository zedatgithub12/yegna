"use client";

import React, { useState } from "react";
import { useFormikContext } from "formik";
import { Title, Text } from "@/components/ui/typography";
import FormikInput from "@yegna-systems/lib/forms/input";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { queryKeys } from "@/lib/api/query-keys";

const AdminInformation = () => {
  const { values, setFieldValue } = useFormikContext<institutionProps>();
  const [currentPage, setCurrentPage] = useState(1);

  const responsePayload = useFetchData(
    [queryKeys.get_school_roles, currentPage],
    `${queryKeys.get_school_roles}`
  );

  const roleUsers: SchoolRole[] = responsePayload?.data?.data?.docs;

  return (
    <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full">
      <div className="col-span-4">
        <Title as="h6" className="font-medium capitalize">
          School Admin Information.
        </Title>
        <Text
          as="p"
          className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
        >
          Add your School Admin information from here
        </Text>
      </div>

      <div className="col-span-8 space-y-4">
        <div className="grid grid-row gap-4">
          <FormikInput
            name="first_name"
            placeholder="First name"
            value={values.admin_info.first_name}
            onChange={(e) =>
              setFieldValue("admin_info.first_name", e.target.value)
            }
            label="First Name"
            className="bg-white"
          />
          <FormikInput
            name="admin_info.middle_name"
            placeholder="Middle name"
            value={values.admin_info.middle_name}
            onChange={(e) =>
              setFieldValue("admin_info.middle_name", e.target.value)
            }
            label="Middle Name"
            className="bg-white"
          />
          <FormikInput
            name="admin_info.last_name"
            placeholder="Last name"
            value={values.admin_info.last_name}
            onChange={(e) =>
              setFieldValue("admin_info.last_name", e.target.value)
            }
            label="Last Name"
            className="bg-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormikInput
            name="admin_info.email"
            type="email"
            placeholder="Enter email"
            value={values.admin_info.email}
            onChange={(e) => setFieldValue("admin_info.email", e.target.value)}
            label="Email Address"
            className="bg-white"
          />
          <FormikInput
            name="admin_info.phone_number"
            placeholder="Enter phone number"
            value={values.admin_info.phone_number}
            onChange={(e) =>
              setFieldValue("admin_info.phone_number", e.target.value)
            }
            label="Phone Number"
            className="bg-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Title as="h6" className="font-normal w-full mb-1">
              Gender
            </Title>
            <select
              name="admin_info.gender"
              value={values.admin_info.gender}
              onChange={(e) =>
                setFieldValue("admin_info.gender", e.target.value)
              }
              className="bg-white border border-gray-300 rounded-md w-full p-2 text-sm"
            >
              <option value="">Select gender</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
          <FormikInput
            name="admin_info.user_name"
            placeholder="Enter user name"
            value={values.admin_info.user_name}
            onChange={(e) =>
              setFieldValue("admin_info.user_name", e.target.value)
            }
            label="User name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Title as="h6" className="font-normal w-full mb-1">
              Access Role
            </Title>
            <select
              name="admin_info.access_role"
              value={values.admin_info.access_role}
              onChange={(e) =>
                setFieldValue("admin_info.access_role", e.target.value)
              }
              className="bg-white border border-gray-300 rounded-md w-full p-2 text-sm"
            >
              <option value="">Select access role</option>
              {roleUsers?.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.role}
                </option>
              ))}
            </select>
          </div>

          <FormikInput
            name="admin_info.position"
            placeholder="Enter position"
            value={values.admin_info.position}
            onChange={(e) =>
              setFieldValue("admin_info.position", e.target.value)
            }
            label="Position"
            className="bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminInformation;
