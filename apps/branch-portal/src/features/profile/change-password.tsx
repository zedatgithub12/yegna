"use client";

import { toast } from "sonner";
import { Formik, Form } from "formik";
import {
  ChangePasswordType,
  changePasswordSchema,
} from "@/validations/auth.schema";
import { useModal } from "@coop-super-app/lib/hooks/use-modal";
import useDynamicMutation from "@/lib/api/usePostData";
import ModalHeader from "@/components/modal-header";
import PasswordIcon from "@/components/icons/password";
import FormikPasswordInput from "@coop-super-app/lib/forms/password";
import { Button } from "@coop-super-app/ui/button";

export default function ChangePassword() {
  const { closeModal } = useModal();
  const postMutation = useDynamicMutation();
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
        url: `users/change-password`,
        method: "POST",
        body: {
          old_password: values.oldPassword,
          new_password: values.password,
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
              <Button
                className="!mt-2 w-full"
                type="submit"
                color="primary"
                size="md"
                variant="outline"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                className="!mt-2 w-full"
                type="submit"
                color="primary"
                size="md"
                isLoading={postMutation.isPending}
              >
                <span>Change Password</span>{" "}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
