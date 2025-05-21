"use client";

import React from "react";
import { useFormikContext } from "formik";
import { Text, Title } from "@/components/ui/typography";
import FormikInput from "@yegna-systems/lib/forms/input";
import RichTextEditor from "@/components/Input/RichTextEditor";

type GeneralInformationFormValues = {
  name: string;
  description: string;
};

const GeneralInformation = () => {
  const { values, setFieldValue } =
    useFormikContext<GeneralInformationFormValues>();
  return (
    <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full">
      <div className="col-span-4 ">
        <Title as="h6" className="font-medium capitalize">
          General Information.
        </Title>
        <Text
          as="p"
          className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
        >
          Add your General information from here
        </Text>
      </div>
      <div className="col-span-8 space-y-3  ">
        <div>
          <Title as="h6" className="font-normal w-full">
            Role name
          </Title>

          <FormikInput
            name="name"
            variant="outline"
            placeholder="Enter role name"
            value={values.name}
            onChange={(event) => setFieldValue("name", event.target.value)}
            className="bg-white"
          />
        </div>

        <div>
          <Title as="h6" className="font-normal w-full mb-2">
            Product Description
          </Title>

          <RichTextEditor
            value={values.description}
            onChange={(value) => setFieldValue("description", value)}
            className="border-2 border-gray-100  rounded-bl-lg rounded-br-lg editor-content"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralInformation;
