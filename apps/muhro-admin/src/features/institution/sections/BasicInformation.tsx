"use client";

import React from "react";
import { useFormikContext } from "formik";
import { Title, Text } from "@/components/ui/typography";
import FormikInput from "@yegna-systems/lib/forms/input";

import FileUploader from "@/components/FileUploader";
import SchoolFeeCollection from "./SchoolFeeCollection";
import SchoolLegalDocument from "./SchoolLegalDocument";
import SchoolLocation from "./SchoolLocation";
// import FormikMultiSelect from "@yegna-systems/lib/forms/multi-select";

export type BasicInformationValues = {
  school_info: {
    school_name: string;
    // email: string;
    // phone: string;
    school_type: string;
    education_level: Array<"primary" | "secondary" | "preparatory">;
    number_of_agents: number;
    latitude: string;
    longitude: string;
    category_id: string;
    logo: File | null;
    location: string;
    collection_account: string;
    bank: string;
  };
};

const BasicInformation = () => {
  const { values, setFieldValue } = useFormikContext<BasicInformationValues>();

  return (
    <>
      <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full">
        <div className="col-span-4">
          <Title as="h6" className="font-medium capitalize">
            School Information.
          </Title>
          <Text
            as="p"
            className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
          >
            Add your School Information here
          </Text>
        </div>

        <div className="col-span-8 space-y-4">
          <div>
            <Title as="h6" className="font-normal w-full mb-1">
              School Name
            </Title>
            <FormikInput
              name="school_name"
              placeholder="Enter Enter School Name"
              value={values.school_info.school_name}
              onChange={(e) =>
                setFieldValue("school_info.school_name", e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Title as="h6" className="font-normal w-full mb-1">
                Type
              </Title>
              <select
                name="school_type"
                value={values.school_info.school_type}
                onChange={(e) =>
                  setFieldValue("school_info.school_type", e.target.value)
                }
                className="bg-white border border-gray-300 rounded-md w-full p-2 text-sm"
              >
                <option value="">Select School type</option>
                <option value="international">international</option>
              </select>
            </div>
            <div>
              <select
                multiple
                name="school_info.education_level"
                value={values.school_info.education_level || []}
                onChange={(e) => {
                  const selected = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  );
                  setFieldValue("school_info.education_level", selected);
                }}
                className="bg-white border border-gray-300 rounded-md w-full p-2 text-sm"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="preparatory">Preparatory</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* <div>
              <Title as="h6" className="font-normal w-full mb-1">
                Email Address
              </Title>
              <FormikInput
                name="email"
                type="email"
                placeholder="Enter email"
                value={values.school_info.email}
                onChange={(e) =>
                  setFieldValue("school_info.email", e.target.value)
                }
                className="bg-white"
              />
            </div> */}

            {/* <div>
              <Title as="h6" className="font-normal w-full mb-1">
                Phone Number
              </Title>
              <FormikInput
                name="phone"
                placeholder="Enter phone number"
                value={values.school_info.phone}
                onChange={(e) =>
                  setFieldValue("school_info.phone", e.target.value)
                }
                className="bg-white"
              />
            </div> */}
          </div>
          <div>
            <FileUploader
              title="Upload School Logo"
              name="logo"
              value={values.school_info.logo}
              setSelectedFile={(file: File | null) => {
                setFieldValue("school_info.logo", file);
              }}
            />
          </div>
        </div>
      </div>
      <SchoolFeeCollection />
      <SchoolLegalDocument />
      <SchoolLocation />
    </>
  );
};

export default BasicInformation;
