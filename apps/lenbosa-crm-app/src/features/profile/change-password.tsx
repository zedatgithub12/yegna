"use client";

import { toast } from "sonner";
import { Formik, Form } from "formik";
import { useModal } from "@yegna-systems/lib/hooks/use-modal";
import useDynamicMutation from "@/lib/api/use-post-data";
import PasswordIcon from "@/components/icons/password";
import FormikPasswordInput from "@yegna-systems/lib/forms/password";
import * as Yup from "yup";
import ModalFooter from "@yegna-systems/lib/view/modal-footer";
import ModalHeader from "@yegna-systems/lib/view/modal-header";
import { queryKeys } from "@/lib/api/query-keys";

export default function ChangePassword() {
  const { closeModal } = useModal();

  const postMutation = useDynamicMutation({});
  const changePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required"),
    password: Yup.string().required("New password is required").trim(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match")
      .transform((value) => value.trim())
      .required("Confirm Password is required"),
  });
  type ChangePasswordType = Yup.InferType<typeof changePasswordSchema>;
  const initialValues: ChangePasswordType = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };
  const initialLoginMutationSubmitHandler = async (
    values: ChangePasswordType
  ) => {
    try {
      await postMutation.mutateAsync({
        url: queryKeys.change_password,
        method: "POST",
        body: {
          current_password: values.oldPassword,
          new_password: values.password,
          confirm_new_password: values.confirmPassword,
        },
        onSuccess: () => {
          closeModal();
          toast.success("Password Changed Successfully");
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex w-full flex-col items-start space-y-2 p-5">
      <ModalHeader icon={<PasswordIcon />} desc="" title={"Change Password"} />
      <Formik
        initialValues={initialValues}
        validationSchema={changePasswordSchema}
        onSubmit={initialLoginMutationSubmitHandler}
      >
        {() => (
          <Form className="w-full space-y-2">
            <FormikPasswordInput
              label="Old Password"
              name="oldPassword"
              placeholder="Enter Your Old Password"
              color="primary"
            />
            <FormikPasswordInput
              name="password"
              label="Password"
              placeholder="Enter Your Password"
              color="primary"
            />
            <FormikPasswordInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Your Password"
              color="primary"
            />

            <div className="flex w-full items-center gap-3 pt-3">
              <ModalFooter
                loading={postMutation.isPending}
                submitButtonText="Change Password"
                submitButtonType="submit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
