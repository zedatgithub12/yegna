import React from "react";
import { ErrorMessage, FormikValues, useField, useFormikContext } from "formik";
import Dropzone, { DropzoneOptions } from "react-dropzone";
import Image from "next/image";
import { toast } from "sonner";
import { FaCloudUploadAlt, FaTimesCircle } from "react-icons/fa";
import { Toaster } from "sonner";
import cn from "@yegna-systems/ui/cn";
import { Text } from "./typography";

export interface Accept {
  [key: string]: string[];
}

interface FilePickerProps {
  name: string;
  maxFiles?: number;
  label?: React.ReactNode;
  accept?: Accept;
  showImage?: boolean;
  className?: string;
}

const FilePicker: React.FC<FilePickerProps> = ({
  name,
  maxFiles = 1,
  label,
  accept,
  showImage = true,
  className,
}) => {
  const { setFieldValue, values } = useFormikContext<FormikValues>();
  const [meta] = useField(name);
  const { value } = meta;
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    if (maxFiles > 1) {
      const files = [...(values[name] || []), ...acceptedFiles].slice(
        0,
        maxFiles
      );
      setFieldValue(name, files);
    } else {
      const file = acceptedFiles[0];
      if (file) setFieldValue(name, file);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (maxFiles > 1) {
      const newFiles = Array.from(files).slice(0, maxFiles);
      setFieldValue(name, [...(values[name] || []), ...newFiles]);
    } else {
      const file = files[0];
      if (file) setFieldValue(name, file);
    }
  };

  const handleRemoveFile = (index: number) => {
    if (maxFiles > 1) {
      const updatedFiles = (values[name] || []).filter(
        (_: File | string, i: number) => i !== index
      );
      setFieldValue(name, updatedFiles);
    } else {
      setFieldValue(name, undefined);
    }
  };

  const dropzoneOptions: DropzoneOptions = {
    maxSize: 3 * 1024 * 1024, // 3 MB
    maxFiles,
    onDrop: handleDrop,
    accept: accept || {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/svg": [".svg"],
      "image/webp": [".webp"],
    },
    onDropRejected() {
      toast.warning("Invalid file format");
    },
  };

  return (
    <>
      <div className={cn("w-full", className)}>
        <label className="text-sm block font-medium text-[#515151] pb-1 capitalize">
          {label}
        </label>

        <Dropzone {...dropzoneOptions}>
          {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
            <section className="w-full flex flex-col items-start space-y-2">
              <div
                {...getRootProps()}
                onClick={() => fileInputRef.current?.click()}
                className={`border ${
                  isDragActive
                    ? "border-gray-100"
                    : isDragReject
                    ? "border-red-500"
                    : "bg-[#f8f8f8]"
                } border-dashed border-gray-100 rounded-md cursor-pointer w-full p-8 flex items-center space-x-3 justify-center bg-gray-50 dark:bg-[#2C3345]`}
              >
                <input
                  {...getInputProps()}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <div className="flex flex-col items-center justify-center">
                  <FaCloudUploadAlt className="mx-auto h-12 w-12" />
                  <Text className="font-medium text-gray-600 text-base text-center">
                    Choose a file or drag & drop it here
                  </Text>
                </div>
              </div>
            </section>
          )}
        </Dropzone>

        {showImage && value && (
          <div className="pt-2 flex gap-2">
            {maxFiles > 1 ? (
              value.map((file: File | string, index: number) => (
                <div key={index} className="relative h-20 w-20">
                  {typeof file === "string" ? (
                    // Display existing image URL
                    <Image
                      src={file}
                      alt="Preview"
                      className="object-cover h-full w-full rounded-md"
                      width={80}
                      height={80}
                    />
                  ) : (
                    // Display newly uploaded file
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="object-cover h-full w-full rounded-md"
                      width={80}
                      height={80}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="absolute bg-gray-100 top-0 right-0 text-black rounded-full"
                  >
                    <FaTimesCircle size={20} />
                  </button>
                </div>
              ))
            ) : typeof value === "string" ? (
              // Single existing image URL
              <div className="relative h-20 w-full">
                <Image
                  src={value}
                  alt="Preview"
                  className="object-cover h-full w-full rounded-md"
                  width={80}
                  height={80}
                />
                <button
                  onClick={() => handleRemoveFile(0)}
                  className="absolute bg-white top-0 right-0 text-black rounded-full"
                >
                  <FaTimesCircle size={16} />
                </button>
              </div>
            ) : (
              // Single newly uploaded file
              <div className="relative h-20 w-full">
                <Image
                  src={URL.createObjectURL(value)}
                  alt="Preview"
                  className="object-cover h-full w-full rounded-md"
                  width={80}
                  height={80}
                />
                <button
                  onClick={() => handleRemoveFile(0)}
                  className="absolute bg-white top-0 right-0 text-black rounded-full"
                >
                  <FaTimesCircle size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        <ErrorMessage
          name={name}
          component="div"
          className="text-xs text-red-500 pt-1 font-medium"
        />
      </div>
      <Toaster richColors position="bottom-center" />
    </>
  );
};

export default FilePicker;
