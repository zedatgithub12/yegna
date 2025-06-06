"use client";

import React from "react";
import PageWrapper from "@/components/PagesWrapper";
import useDynamicMutation from "@/lib/api/use-post-data";
import FormikInput from "@yegna-systems/lib/forms/input";
import FileUploader from "@/components/FileUploader";
import { queryKeys } from "@/lib/api/query-keys";
import { Button } from "@yegna-systems/ui/button";
import { Text, Title } from "@yegna-systems/ui/typography";
import { Form, Formik } from "formik";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import RichTextEditor from "@/components/Input/RichTextEditor";
import { advertValidationSchema } from "@/validations/advert.schema";
import ReactDatePicker from "@/components/ui/date-picker";
import { CalendarDays } from "lucide-react";

const CreateAdvert = () => {
  const router = useRouter();
  const postMutation = useDynamicMutation({ type: "FormData" });

  const initialValues: AdvertFormValues = {
    title: "",
    start_date: "",
    end_date: "",
    description: "",
    ad_banner: null,
  };

  const handleFormSubmission = async (values: AdvertFormValues) => {
    try {
      const formData = new FormData();

      formData.append("name", values.title);
      formData.append("start_date", values.start_date);
      formData.append("end_date", values.end_date);
      formData.append("body", values.description);
      if (values.ad_banner) {
        formData.append("image", values.ad_banner);
      }

      await postMutation.mutateAsync({
        url: queryKeys.adverts,
        method: "POST",
        body: formData,

        onSuccess: (res) => {
          if (res.success) {
            toast.success("Successfully created!");
            router.back();
          } else {
            toast.error(res.message);
          }
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const datetimeFromStrings = (dateStr: string) => {
    if (!dateStr) return null;

    const [day, month, year] = dateStr.split("/");
    const dateObj = new Date(`${year}-${month}-${day}-`);
    return isNaN(dateObj.getTime()) ? null : dateObj;
  };

  return (
    <PageWrapper
      isLoading={false}
      title="Create Advert"
      back={true}
      search={false}
      breadcrumb={true}
      childrenClassnames="bg-white rounded-xl p-4 mt-4"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={advertValidationSchema}
        onSubmit={handleFormSubmission}
      >
        {({ values, setFieldValue }) => (
          <Form className="pb-4 pr-4">
            <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full">
              <div className="col-span-12 md:col-span-4 ">
                <Title as="h6" className="font-medium capitalize">
                  Ad Information.
                </Title>
                <Text
                  as="p"
                  className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
                >
                  Add the Ad information from here
                </Text>
              </div>
              <div className="col-span-12 md:col-span-8 space-y-3">
                <div>
                  <Title as="h6" className="font-normal w-full">
                    Title
                  </Title>

                  <FormikInput
                    name="title"
                    variant="outline"
                    placeholder="Enter Ad title"
                    value={values.title}
                    onChange={(event) =>
                      setFieldValue("title", event.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <Title as="h6" className="font-normal w-full">
                      Start Date
                    </Title>

                    <ReactDatePicker
                      name="start_date"
                      selected={datetimeFromStrings(values.start_date)}
                      onChange={(date) => {
                        if (!date) return;

                        const formattedDate = date.toISOString().slice(0, 10);

                        setFieldValue("start_date", formattedDate);
                      }}
                      minDate={new Date()}
                      dateFormat="dd/MM/yyyy"
                      className="w-full mt-1.5"
                      showPrefix={false}
                      suffix={
                        <CalendarDays className="w-5 h-5 text-gray-500" />
                      }
                      placeholderText="Select Start date"
                    />
                  </div>
                  <div>
                    <Title as="h6" className="font-normal w-full">
                      End Date
                    </Title>

                    <ReactDatePicker
                      name="end_date"
                      selected={datetimeFromStrings(values.end_date)}
                      onChange={(date) => {
                        if (!date) return;

                        const formattedDate = date.toISOString().slice(0, 10);

                        setFieldValue("end_date", formattedDate);
                      }}
                      minDate={
                        values.start_date
                          ? new Date(values.start_date)
                          : new Date()
                      }
                      dateFormat="dd/MM/yyyy"
                      className="w-full mt-1.5"
                      showPrefix={false}
                      suffix={
                        <CalendarDays className="w-5 h-5  text-gray-500" />
                      }
                      placeholderText="Select End date"
                    />
                  </div>
                </div>

                <div>
                  <Title as="h6" className="font-normal w-full mb-2">
                    Description
                  </Title>

                  <RichTextEditor
                    value={values.description}
                    onChange={(value) => setFieldValue("description", value)}
                    className={
                      "border-2 border-gray-100  rounded-bl-lg rounded-br-lg editor-content"
                    }
                  />
                </div>
              </div>
            </div>

            <hr className=" my-6" />
            <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full">
              <div className="col-span-12 md:col-span-4 ">
                <Title as="h6" className="font-medium capitalize">
                  Upload Banner.
                </Title>
                <Text
                  as="p"
                  className="text-gray-400 text-sm mt-0.5 font-normal capitalize"
                >
                  Upload ad banner here
                </Text>
              </div>

              <div className="col-span-12 md:col-span-8 ">
                <FileUploader
                  title="Ad Banner"
                  name="ad_banner"
                  value={values.ad_banner}
                  setSelectedFile={(ad_banner) =>
                    setFieldValue("ad_banner", ad_banner)
                  }
                />
              </div>
            </div>

            <hr className="my-6" />

            <div className="grid grid-cols-12 gap-4 p-2 justify-between w-full">
              <div className="col-span-12 md:col-span-4 "></div>

              <div className="col-span-12 md:col-span-8 ">
                <div className="  flex items-center justify-end gap-4 w-full">
                  <Button
                    variant="outline"
                    size="md"
                    className="px-1 w-36 border-gray-400 rounded-md font-semibold"
                    onClick={() => router.back()}
                  >
                    <Text className="text-gray-600"> Cancel </Text>
                  </Button>

                  <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    className="px-1 w-36 rounded-md font-bold"
                    type="submit"
                    isLoading={postMutation.isPending}
                  >
                    <Text className="text-secondary font-medium text-[14px]">
                      Submit
                    </Text>
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  );
};

export default CreateAdvert;
