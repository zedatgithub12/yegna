"use client";

import React from "react";
import { useFormikContext } from "formik";
import { Text, Title } from "@/components/ui/typography";
import FormikInput from "@yegna-systems/lib/forms/input";
import { BasicInformationValues } from "./BasicInformation";
import banks from "@/data/banks.json";

const SchoolFeeCollection = () => {
  const { values, setFieldValue } = useFormikContext<BasicInformationValues>();

  return (
    <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full border-t-[1px] pt-5">
      <div className="col-span-4">
        <Title as="h6" className="font-medium capitalize">
          School Fee Collection
        </Title>
        <Text
          as="p"
          className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
        >
          Add School Fee Collection Here.
        </Text>
      </div>

      <div className="grid grid-cols-1 col-span-8 gap-4">
        <div>
          <Title as="h6" className="font-normal w-full mb-1">
            Bank
          </Title>
          <select
            name="school_info.bank"
            value={values.school_info.bank}
            onChange={(e) => setFieldValue("school_info.bank", e.target.value)}
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
            name="school_info.collection_account"
            placeholder="Enter Collection Account Number"
            value={values.school_info.collection_account}
            onChange={(e) =>
              setFieldValue("school_info.collection_account", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SchoolFeeCollection;
