import Image from "next/image";
import React, { useState } from "react";
import { Text } from "../ui/typography";
import { UploadCloud } from "lucide-react";
import { ErrorMessage } from "formik";

const FileUploader = ({
  name,
  value,
  previewUrl,
  setSelectedFile,
  title = true,
}: {
  name: string;
  value: File | null;
  previewUrl?: string;
  setSelectedFile: (file: File | null) => void;
  title?: boolean;
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setSelectedFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleTriggeringFileUpload = () => {
    const fileField = document.getElementById("file-upload");

    fileField?.click();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setSelectedFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };
  return (
    <div className="w-full mx-auto">
      {title ? (
        <Text className="text-[16px] font-medium mb-2">Upload Image</Text>
      ) : (
        <Text className="text-[16px] font-medium mb-2" />
      )}
      <div
        className="min-h-24 border-2 border-gray-100 rounded-lg p-2 flex items-center justify-center text-center cursor-pointer hover:border-primary "
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {(preview && value) || previewUrl ? (
          <div
            className="flex flex-col items-center"
            onClick={handleTriggeringFileUpload}
          >
            <Image
              src={preview || previewUrl || ""}
              alt="Preview"
              width={150}
              height={150}
              className="w-full max-h-52 object-cover mx-auto rounded-lg"
            />
          </div>
        ) : (
          <div
            className="flex items-center justify-center h-full"
            onClick={handleTriggeringFileUpload}
          >
            <UploadCloud size={18} className="text-gray-400 mr-2" />
            <Text className="text-gray-400 font-medium text-[16px] ">
              Drop or Select file
            </Text>
          </div>
        )}
        <input
          name={name}
          type="file"
          className="hidden"
          id="file-upload"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <ErrorMessage name="thumbnail">
        {(msg) => <Text className="text-red-500">{msg}</Text>}
      </ErrorMessage>
    </div>
  );
};

export default FileUploader;
