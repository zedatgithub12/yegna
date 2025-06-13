"use client";

import React from "react";
import { useFormikContext } from "formik";
import { Text, Title } from "@/components/ui/typography";
import { BasicInformationValues } from "./BasicInformation";

const SchoolLocation = () => {
  const { values, setFieldValue } = useFormikContext<BasicInformationValues>();

  return (
    <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full border-t-[1px] pt-5">
      <div className="col-span-4">
        <Title as="h6" className="font-medium capitalize">
          School Location
        </Title>
        <Text
          as="p"
          className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
        >
          Add School Location Here.
        </Text>
      </div>

      <div className="grid grid-cols-2 col-span-8 gap-4">
        <div>
          <Title as="h6" className="font-normal w-full mb-1">
            Add School Location{" "}
          </Title>
          <select
            name="school_info.location"
            value={values.school_info.location}
            onChange={(e) =>
              setFieldValue("school_info.location", e.target.value)
            }
            className="bg-white border border-gray-300 rounded-md w-full p-2 text-sm"
          >
            <option value="">Select location </option>
            <option value="Bole">Bole </option>
            <option value="Gerji">Gerji</option>
            <option value="CMC">CMC</option>
          </select>
        </div>
      </div>

      {/* <div className="grid grid-cols-2 col-span-8 gap-4">
        <div>
          <Title as="h6" className="font-normal w-full mb-1">
            Latitude
          </Title>
          <FormikInput
            name="latitude"
            placeholder="Latitude"
            value={values.latitude}
            onChange={(e) => setFieldValue("latitude", e.target.value)}
            className="bg-white"
          />
        </div>

        <div>
          <Title as="h6" className="font-normal w-full mb-1">
            Longitude
          </Title>
          <FormikInput
            name="longitude"
            placeholder="Longitude"
            value={values.longitude}
            onChange={(e) => setFieldValue("longitude", e.target.value)}
            className="bg-white"
          />
        </div>
      </div> */}
    </div>
  );
};

export default SchoolLocation;
