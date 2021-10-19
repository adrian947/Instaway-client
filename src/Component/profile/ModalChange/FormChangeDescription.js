import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { UPDATE_USER } from "./../../../gql/user";
import { useMutation } from "@apollo/client";

export const FormChangeDescription = ({ setShow, refetch, getUser }) => {
  const [updateUser] = useMutation(UPDATE_USER);
  const [description, setDescription] = useState(getUser.description);

  const formik = useFormik({
    initialValues: {
      newDescription: "",
    },
    validationSchema: Yup.object({
      newDescription: Yup.string()
        .required("Description is required")
        .max(100, "Max 100 chacters"),
    }),

    onSubmit: async (values) => {
      try {
        await updateUser({
          variables: {
            input: {
              description: values.newDescription,
            },
          },
        });
        setDescription(values.newDescription);
        toast.success("Change description success");
        refetch();
        setShow(false);
      } catch (error) {
        console.log(error);
        toast.error("Error change description");
      }
    },
  });

  return (
    <>
      {formik.errors.newDescription && formik.touched.newDescription ? (
        <h6 className="errorForm">{formik.errors.newDescription}</h6>
      ) : null}

      <form className="changePassword" onSubmit={formik.handleSubmit}>
        <textarea
          className="changePassword__input"
          type="email"
          placeholder={description}
          name="newDescription"
          value={formik.values.newDescription}
          onChange={formik.handleChange}
        ></textarea>

        <button type="submit" className="changePassword__botonEmail">
          Update
        </button>
      </form>
      <div className="back">
        <button onClick={() => setShow(false)} className="back__button">
          Back
        </button>
      </div>
    </>
  );
};
