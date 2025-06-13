"use client";

import React from "react";
import { useFormikContext } from "formik";
import { Text, Title } from "@/components/ui/typography";
import FileUploader from "@/components/FileUploader";

type SchoolLegalDocumentValues = {
  doc_school: File | null;
};

const SchoolLegalDocument = () => {
  const { values, setFieldValue } =
    useFormikContext<SchoolLegalDocumentValues>();

  return (
    <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full border-t-[1px] pt-5">
      <div className="col-span-4">
        <Title as="h6" className="font-medium capitalize">
          School Legal Document
        </Title>
        <Text
          as="p"
          className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
        >
          Add School Legal Document Here.
        </Text>
      </div>

      <div className="grid grid-cols-1 col-span-8 gap-4">
        <div>
          <FileUploader
            title="Upload School Documents"
            name="logo"
            value={values.doc_school}
            setSelectedFile={(file: File | null) => {
              setFieldValue("logo", file);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SchoolLegalDocument;
