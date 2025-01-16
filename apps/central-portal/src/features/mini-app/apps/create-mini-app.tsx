import useDynamicMutation from "@/lib/api/use-post-data";
import {
  CreateMiniAppType,
  createMiniSchema,
} from "@/validations/mini-app.schema";
import ModalHeader from "@coop-super-app/lib/view/modal-header";
import { Form, Formik } from "formik";
import React from "react";
import FormikInput from "@coop-super-app/lib/forms/input";
import ModalFooter from "@coop-super-app/lib/view/modal-footer";
type Props = {
  id?: string;
};
const CreateMiniApp = ({ id }: Props) => {
  const postMutation = useDynamicMutation({});
  const initialValues: CreateMiniAppType = {
    name: "",
  };
  const createEditMiniAppHandler = async (values: CreateMiniAppType) => {
    try {
      await postMutation.mutateAsync({
        url: `users/login`,
        method: "POST",
        body: { values },
        onSuccess: () => {},
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-5 p-5">
      <ModalHeader title={id ? "Edit Mini App" : "Create Mini App"} desc={""} />
      <Formik
        initialValues={initialValues}
        validationSchema={createMiniSchema}
        onSubmit={createEditMiniAppHandler}
      >
        {() => (
          <Form>
            <FormikInput name="name" label="Name" />
            <ModalFooter
              loading={postMutation.isPending}
              submitButtonType="submit"
              submitButtonText={"Create"}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateMiniApp;
