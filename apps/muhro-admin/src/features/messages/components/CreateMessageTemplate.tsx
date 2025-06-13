import React from "react";
import { Input } from "@yegna-systems/ui/input";
import { Textarea } from "@yegna-systems/ui/textarea";
import { Button } from "@yegna-systems/ui/button";
import useDynamicMutation from "@/lib/api/use-post-data";
import { queryKeys } from "@/lib/api/query-keys";
import { Form, Formik } from "formik";
import { templateCreateSchema } from "@/validations/template.schema";

interface CreateMessageTemplateProps {
  onClose?: () => void;
  onSubmit?: (data: MessageTemplatesCreateProps) => void;
}

const CreateMessageTemplate: React.FC<CreateMessageTemplateProps> = ({
  onClose,
  onSubmit,
}) => {
  const postMutation = useDynamicMutation({ type: "FormData" });

  const initialValues: MessageTemplatesCreateProps = {
    name: "",
    body: "",
  };

  const handleSubmit = async (values: MessageTemplatesCreateProps) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("body", values.body);

      const response = await postMutation.mutateAsync({
        url: queryKeys.message_templates,
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
    <div className="p-4 h-[98dvh]">
      <h2 className="text-xl font-semibold mb-4">Add Message Template</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={templateCreateSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, isSubmitting, errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Enter message title"
                required
              />
              {touched.name && errors.name && (
                <div className="text-red-500 text-sm mt-1">{errors.name}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <Textarea
                name="body"
                value={values.body}
                onChange={handleChange}
                placeholder="Enter your message"
                rows={4}
                required
              />
              {touched.body && errors.body && (
                <div className="text-red-500 text-sm mt-1">{errors.body}</div>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button type="submit" color="primary" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Save Template"}
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

export default CreateMessageTemplate;
