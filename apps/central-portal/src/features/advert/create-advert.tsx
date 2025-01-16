import useDynamicMutation from "@/lib/api/use-post-data";
import { CreateAdvertType } from "@/validations/advert.schema";
import FormikInput from "@coop-super-app/lib/forms/input";
import FormikSelect from "@coop-super-app/lib/forms/select";
import ModalFooter from "@coop-super-app/lib/view/modal-footer";
import ModalHeader from "@coop-super-app/lib/view/modal-header";
import { Form, Formik } from "formik";
import React from "react";

type Props = {
  id?: string;
  name?: string;
  image?: string;
  ad_for?: string;
};
const bannerOptions = [
  { label: "IFB", value: "IFB" },
  { label: "CB", value: "CB" },
  { label: "ALL", value: "ALL" },
];
const CreateAdvert = ({ id, name, image, ad_for }: Props) => {
  const postMutation = useDynamicMutation({ type: "FormData" });
  const initialValues: CreateAdvertType = {
    isEditMode: !!id,
    name: name || "",
    logo: image ?? "",
    adFor: ad_for || "",
  };
  const createEditAdvertHandler = async (values: CreateAdvertType) => {
    try {
      await postMutation.mutateAsync({
        url: id ? `advert/dashboard/update/${id}` : `advert/dashboard/create`,
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
      <ModalHeader
        align="left"
        title={id ? "Edit Mini App" : "Create Mini App"}
        desc={""}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={CreateAdvert}
        onSubmit={createEditAdvertHandler}
      >
        {({ values }) => (
          <Form>
            <FormikInput name="name" label="Advert Name" />
            <FormikSelect
              value={values.adFor}
              name="adFor"
              label="Ad For"
              options={bannerOptions}
            />
            <ModalFooter
              loading={postMutation.isPending}
              submitButtonType="submit"
              submitButtonText={id ? "Save" : "Create"}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateAdvert;
