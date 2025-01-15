import useDynamicMutation from "@/lib/api/use-post-data";
import {
  passwordLoginSchema,
  PasswordLoginType,
} from "@/validations/auth.schema";
import FormikPasswordInput from "@coop-super-app/lib/forms/password";
import { Button } from "@coop-super-app/ui/button";
import { Form, Formik } from "formik";
import React from "react";

type Props = {
  shouldFetchPasswordRule?: boolean;
};
const PasswordLogin = ({}: Props) => {
  const postMutation = useDynamicMutation({});

  const passwordLoginSubmitHandler = async (values: PasswordLoginType) => {
    try {
      await postMutation.mutateAsync({
        url: `users/login`,
        method: "POST",
        body: {
          password: values.password,
        },
        onSuccess: () => {},
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          password: "",
        }}
        validationSchema={passwordLoginSchema}
        onSubmit={passwordLoginSubmitHandler}
      >
        {() => (
          <Form className="space-y-3 w-full pb-4">
            <FormikPasswordInput
              label="Password"
              name="password"
              placeholder="Enter Your Password"
            />
            <Button
              type="submit"
              className="w-full"
              isLoading={postMutation.isPending}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PasswordLogin;
