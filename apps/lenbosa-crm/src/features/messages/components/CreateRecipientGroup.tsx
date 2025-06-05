import React from "react";
import { Input } from "@yegna-systems/ui/input";
import { Textarea } from "@yegna-systems/ui/textarea";
import { Button } from "@yegna-systems/ui/button";
import useDynamicMutation from "@/lib/api/use-post-data";
import { queryKeys } from "@/lib/api/query-keys";
import { Form, Formik } from "formik";
import { useFetchData } from "@/lib/api/use-fetch-data";
import FormikMultiSelect from "@yegna-systems/lib/forms/multi-select";
import { toast } from "sonner";
import { groupCreateSchema } from "@/validations/group.schema";

interface CreateRecipientGroupProps {
  onClose?: () => void;
  onSubmit?: (data: groupPropCreateProps) => void;
}

const CreateRecipientGroup: React.FC<CreateRecipientGroupProps> = ({
  onClose,
  onSubmit,
}) => {
  const postMutation = useDynamicMutation({ type: "FormData" });

  const { data: usersResponse, isLoading: isLoadingUsers } = useFetchData(
    [queryKeys.get_users],
    queryKeys.get_users
  );

  const usersData: UserDataProps[] = usersResponse?.data?.data || [];

  const initialValues: groupPropCreateProps = {
    name: "",
    description: "",
    users: [],
  };

  const handleSubmit = async (values: groupPropCreateProps) => {
    try {
      const payload = {
        name: values.name,
        description: values.description,
        users: values.users,
      };

      const response = await postMutation.mutateAsync({
        url: `${queryKeys.group}`,
        method: "POST",
        body: payload,
      });

      toast.success("Recipient group created successfully!");

      if (onSubmit) {
        onSubmit(values);
      }

      if (onClose) {
        onClose();
      }

      return response;
    } catch (error) {
      toast.error("Failed to create recipient group");
      console.error("Error creating recipient group:", error);
      throw error;
    }
  };

  return (
    <div className="p-4 h-[98dvh]">
      <h2 className="text-xl font-semibold mb-4">Add Recipient Group</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={groupCreateSchema}
        onSubmit={(values) => {
          console.log("Submitting", values);
          return handleSubmit(values);
        }}
      >
        {({
          values,
          handleChange,
          isSubmitting,
          errors,
          touched,
          setFieldValue,
        }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Enter Recipient Group Title"
                required
              />
              {touched.name && errors.name && (
                <div className="text-red-500 text-sm mt-1">{errors.name}</div>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <Textarea
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Enter your Description"
                rows={4}
                required
              />
              {touched.description && errors.description && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.description}
                </div>
              )}
            </div>

            <div>
              {isLoadingUsers ? (
                <div>Loading users...</div>
              ) : (
                <FormikMultiSelect
                  options={usersData.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  searchable
                  name="users" // Changed to match the field name
                  label="Users"
                  placeholder="Select Users"
                  onChange={(selectedOptions: string[]) => {
                    setFieldValue("users", selectedOptions);
                  }}
                  value={values.users}
                />
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={isSubmitting || isLoadingUsers}
              >
                {isSubmitting ? "Submitting..." : "Save Recipient Group"}
              </Button>
            </div>

            {postMutation.isError && (
              <div className="text-red-500 text-sm mt-2">
                Error: {postMutation.error.message || "Failed to submit form"}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateRecipientGroup;
