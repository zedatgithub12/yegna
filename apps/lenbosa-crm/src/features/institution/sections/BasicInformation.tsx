"use client";

import React from "react";
import { useFormikContext } from "formik";
import { Title, Text } from "@/components/ui/typography";
import FormikInput from "@yegna-systems/lib/forms/input";
import InstitutionLocation from "./InstitutionLocation";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { queryKeys } from "@/lib/api/query-keys";

type BasicInformationValues = {
  name: string;
  email: string;
  phone: string;
  tin_number: string;
  number_of_agents: number;
  latitude: string;
  longitude: string;
  category_id: string;
};

const BasicInformation = () => {
  const { values, setFieldValue } = useFormikContext<BasicInformationValues>();

  const responsePayload = useFetchData(
    [queryKeys.get_categories],
    `${queryKeys.get_categories}`
  );

  const categoriesData = responsePayload?.data?.data?.data ?? [];

  return (
    <>
      <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full">
        <div className="col-span-4">
          <Title as="h6" className="font-medium capitalize">
            Institution Information.
          </Title>
          <Text
            as="p"
            className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
          >
            Add your Institution information here
          </Text>
        </div>

        <div className="col-span-8 space-y-4">
          <div>
            <Title as="h6" className="font-normal w-full mb-1">
              Name of Institution
            </Title>
            <FormikInput
              name="name"
              placeholder="Enter institution name"
              value={values.name}
              onChange={(e) => setFieldValue("name", e.target.value)}
              className="bg-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Title as="h6" className="font-normal w-full mb-1">
                Type
              </Title>
              <select
                name="category_id"
                value={values.category_id}
                onChange={(e) => setFieldValue("category_id", e.target.value)}
                className="bg-white border border-gray-300 rounded-md w-full p-2 text-sm"
              >
                <option value="">Select Institution Type</option>
                {categoriesData.map(
                  (category: { id: string; name: string }) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <Title as="h6" className="font-normal w-full mb-1">
                TIN Number
              </Title>
              <FormikInput
                name="tin_number"
                placeholder="Enter TIN number"
                value={values.tin_number}
                onChange={(e) => setFieldValue("tin_number", e.target.value)}
                className="bg-white"
              />
            </div>
          </div>

          <div>
            <Title as="h6" className="font-normal w-full mb-1">
              Number of Agents
            </Title>
            <FormikInput
              name="number_of_agents"
              type="number"
              placeholder="Enter number of agents"
              value={values.number_of_agents}
              onChange={(e) =>
                setFieldValue("number_of_agents", Number(e.target.value))
              }
              className="bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Title as="h6" className="font-normal w-full mb-1">
                Email Address
              </Title>
              <FormikInput
                name="email"
                type="email"
                placeholder="Enter email"
                value={values.email}
                onChange={(e) => setFieldValue("email", e.target.value)}
                className="bg-white"
              />
            </div>

            <div>
              <Title as="h6" className="font-normal w-full mb-1">
                Phone Number
              </Title>
              <FormikInput
                name="phone"
                placeholder="Enter phone number"
                value={values.phone}
                onChange={(e) => setFieldValue("phone", e.target.value)}
                className="bg-white"
              />
            </div>
          </div>
        </div>
      </div>
      <InstitutionLocation />
    </>
  );
};

export default BasicInformation;
