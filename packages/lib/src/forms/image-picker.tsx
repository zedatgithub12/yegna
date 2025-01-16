"use client";
import React from "react";
import { ErrorMessage, FormikValues, useField, useFormikContext } from "formik";
import Dropzone, { DropzoneOptions } from "react-dropzone";
import Image from "../views/image";
import { toast } from "sonner";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Toaster } from "sonner";
import { Text } from "@coop-super-app/ui/typography";
import cn from "@coop-super-app/ui/cn";

export interface Accept {
  [key: string]: string[];
}

interface FilePickerProps {
  name: string;
  maxFiles?: number;
  label: React.ReactNode;
  accept?: Accept;
  showImage?: boolean;
  className?: string;
  required?: boolean;
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
  const [images, setImages] = React.useState<File[] | undefined>(undefined);
  const [meta] = useField(name);
  const { value } = meta;
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return;
      }
      if (maxFiles > 1) {
        const files = [...acceptedFiles, ...values[name]];
        setImages(files);
        setFieldValue(name, files.slice(0, maxFiles));
      } else {
        const file = acceptedFiles[0];
        setFieldValue(name, file);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name]
  );

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let file: File | File[] | undefined | null;
    if (maxFiles > 1) {
      file = Array.from(event.target.files || []);
      if (file.length > 0) {
        setFieldValue(name, [
          ...(values[name] || []),
          ...file.slice(0, maxFiles),
        ]);
        setImages([...(images || []), ...file.slice(0, maxFiles)]);
      }
    } else {
      file = event.target.files && event.target.files[0];
      if (file) {
        setFieldValue(name, file);
      }
    }
  };

  const dropzoneOptions: DropzoneOptions = {
    maxSize: 3 * 1024 * 1024, // 30 MB
    maxFiles,
    onDrop: handleDrop,
    accept: accept
      ? accept
      : {
          "image/jpeg": [".jpg", ".jpeg"],
          "image/png": [".png"],
          "image/svg": [".svg"],
          "image/webp": [".webp"], // Add webp file format
          // Add more file types if needed
        },
    onDropRejected() {
      toast.warning("Invalid file format");
    },
  };

  return (
    <>
      <div className={cn("w-full", className)}>
        <label className=" text-sm block font-medium text-[#515151] pb-1 capitalize">
          {label}
        </label>

        <Dropzone {...dropzoneOptions}>
          {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
            <section className="w-full flex flex-col items-start space-y-2">
              <div
                {...getRootProps()}
                onClick={handleClick}
                className={`border ${
                  isDragActive
                    ? "border-gray-100"
                    : isDragReject
                      ? "border-red-500"
                      : "bg-[#f8f8f8]"
                } border-dashed border-gray-100
              rounded-md cursor-pointer w-full p-8 flex
              items-center space-x-3 justify-center bg-gray-50 dark:bg-[#2C3345]`}
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
        {value && showImage && (
          <div className="pt-2">
            <Image
              src={URL.createObjectURL(value)}
              alt="Image"
              className="h-20 w-full object-contain"
            />
          </div>
        )}
        <ErrorMessage
          name={name}
          component="div"
          className={"text-xs text-red-500 pt-1 font-medium"}
        />
      </div>
      <Toaster richColors position="bottom-center" />
    </>
  );
};

export default FilePicker;
