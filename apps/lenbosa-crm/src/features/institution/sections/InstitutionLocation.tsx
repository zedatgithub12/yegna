"use client";

import React from "react";
import { useFormikContext } from "formik";
import { Text, Title } from "@/components/ui/typography";
import FormikInput from "@yegna-systems/lib/forms/input";

type InstitutionLocationValues = {
  latitude: string;
  longitude: string;
};

const InstitutionLocation = () => {
  const { values, setFieldValue } =
    useFormikContext<InstitutionLocationValues>();

  return (
    <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full">
      <div className="col-span-4">
        <Title as="h6" className="font-medium capitalize">
          Institution Location
        </Title>
        <Text
          as="p"
          className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
        >
          Add Institution location Here.
        </Text>
      </div>

      <div className="grid grid-cols-2 col-span-8 gap-4">
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
      </div>
    </div>
  );
};

export default InstitutionLocation;
