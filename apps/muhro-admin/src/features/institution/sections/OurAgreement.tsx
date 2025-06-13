import React from "react";
import { useFormikContext } from "formik";
import { Text, Title } from "@/components/ui/typography";
import FileUploader from "@/components/FileUploader";

type OurAgreementValues = {
  doc_school: File | null;
};

const OurAgreement = () => {
  const { values, setFieldValue } = useFormikContext<OurAgreementValues>();

  return (
    <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full border-t-[1px] pt-5">
      <div className="col-span-4">
        <Title as="h6" className="font-medium capitalize">
          Our Agreement
        </Title>
        <Text
          as="p"
          className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
        >
          Upload Signed agreement between institution
        </Text>
      </div>

      <div className="grid grid-cols-1 col-span-8 gap-4">
        <div>
          <FileUploader
            title="Upload Signed Document"
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

export default OurAgreement;
