"use client";

import React from "react";
import { useFormikContext } from "formik";
import { Title, Text } from "@/components/ui/typography";
import FormikInput from "@yegna-systems/lib/forms/input";

const AdminInformation = () => {
  const { values, setFieldValue } = useFormikContext<institutionProps>();

  return (
    <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full">
      <div className="col-span-4">
        <Title as="h6" className="font-medium capitalize">
          Institution Admin Information.
        </Title>
        <Text
          as="p"
          className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
        >
          Add your Institution Admin information here
        </Text>
      </div>

      <div className="col-span-8 space-y-4">
        <div>
          <Title as="h6" className="font-normal w-full mb-1">
            Full Name
          </Title>
          <FormikInput
            name="admin_name"
            placeholder="Enter full name"
            value={values.admin_name}
            onChange={(e) => setFieldValue("admin_name", e.target.value)}
            className="bg-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Title as="h6" className="font-normal w-full mb-1">
              Email Address
            </Title>
            <FormikInput
              name="admin_email"
              type="email"
              placeholder="Enter email"
              value={values.admin_email}
              onChange={(e) => setFieldValue("admin_email", e.target.value)}
              className="bg-white"
            />
          </div>
          <div>
            <Title as="h6" className="font-normal w-full mb-1">
              Phone Number
            </Title>
            <FormikInput
              name="admin_phone"
              placeholder="Enter phone number"
              value={values.admin_phone}
              onChange={(e) => setFieldValue("admin_phone", e.target.value)}
              className="bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInformation;
