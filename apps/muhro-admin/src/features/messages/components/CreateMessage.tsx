import React from "react";
import { Input } from "@yegna-systems/ui/input";
import { Textarea } from "@yegna-systems/ui/textarea";
import { Button } from "@yegna-systems/ui/button";
import useDynamicMutation from "@/lib/api/use-post-data";
import { queryKeys } from "@/lib/api/query-keys";
import { messageCreateSchema } from "@/validations/message.schema";
import { Form, Formik } from "formik";
import { useFetchData } from "@/lib/api/use-fetch-data";
import { Title } from "@yegna-systems/ui/typography";
import FileUploader from "@/components/FileUploader";

interface CreateMessageFormProps {
  onClose?: () => void;
  onSubmit?: (data: MessageCreateProps) => void;
}

const CreateMessageForm: React.FC<CreateMessageFormProps> = ({
  onClose,
  onSubmit,
}) => {
  const postMutation = useDynamicMutation({ type: "FormData" });

  const categoriePayload = useFetchData(
    [queryKeys.getAll_categories],
    `${queryKeys.getAll_categories}`
  );

  const categoriesData: AllCategories = categoriePayload?.data?.data || [];

  const usersPayload = useFetchData(
    [queryKeys.get_users],
    `${queryKeys.get_users}`
  );

  const usersData: UserDataProps[] = usersPayload?.data?.data?.data || [];

  const initialValues: MessageCreateProps = {
    recipients: [],
    title: "",
    category_id: "",
    message: "",
    attachments: [],
  };

  const handleSubmit = async (values: MessageCreateProps) => {
    try {
      const formData = new FormData();

      // Ensure recipients is always an array
      const recipientsArray = Array.isArray(values.recipients)
        ? values.recipients
        : [values.recipients].filter(Boolean);

      recipientsArray.forEach((recipient) => {
        if (recipient) formData.append("recipients[]", recipient);
      });

      formData.append("title", values.title);
      formData.append("category_id", values.category_id);
      formData.append("message", values.message);

      if (values.attachments) {
        values.attachments.forEach((file) => {
          if (file) formData.append("attachments[]", file);
        });
      }

      const response = await postMutation.mutateAsync({
        url: queryKeys.messages,
        method: "POST",
        body: formData,
      });

      if (onSubmit) {
        onSubmit(values);
      }

      if (onClose) {
        onClose();
      }

      return response;
    } catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  };

  return (
    <div className="p-4 h-[98dvh] ">
      <h2 className="text-xl font-semibold mb-4">New Message</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={messageCreateSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          setFieldValue,
          isSubmitting,
          errors,
          touched,
        }) => (
          <Form className="space-y-4 h-[85dvh]  overflow-y-auto scrollbar-hide ">
            <div>
              <Title as="h6" className="font-normal w-full mb-1">
                Recipient
              </Title>
              <select
                name="recipients"
                value={values.recipients[0] || ""} // Handle single selection
                onChange={(e) => {
                  setFieldValue("recipients", [e.target.value]);
                }}
                className="bg-white border border-gray-300 rounded-md w-full p-2 text-sm"
                required
              >
                <option value="">Select recipient Group</option>
                {usersData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {touched.recipients && errors.recipients && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.recipients}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="Enter message title"
                required
              />
              {touched.title && errors.title && (
                <div className="text-red-500 text-sm mt-1">{errors.title}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Message Category
              </label>
              <select
                name="category_id"
                value={values.category_id}
                onChange={(e) => setFieldValue("category_id", e.target.value)}
                className="bg-white border border-gray-300 rounded-md w-full p-2 text-sm"
                required
              >
                <option value="">Select the message type</option>
                {categoriesData.map(
                  (category: { id: string; name: string }) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  )
                )}
              </select>
              {touched.category_id && errors.category_id && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.category_id}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <Textarea
                name="message"
                value={values.message}
                onChange={handleChange}
                placeholder="Enter your message"
                rows={4}
                required
              />
              {touched.message && errors.message && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.message}
                </div>
              )}
            </div>

            <div>
              <FileUploader
                title="Upload Attachments"
                name="attachments"
                setSelectedFile={(files) => {
                  setFieldValue("attachments", files);
                }}
                value={values.attachments?.[0] || null}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button type="submit" color="primary" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Create Message"}
              </Button>
            </div>

            {postMutation.isError && (
              <div className="text-red-500 text-sm mt-2">
                Error submitting form: {postMutation.error.message}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateMessageForm;
