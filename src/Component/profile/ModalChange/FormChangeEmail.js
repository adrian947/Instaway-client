import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";

export const FormChangeEmail = ({ setShow, refetch, getUser }) => {
  const [updateUser] = useMutation(UPDATE_USER);

  console.log("getUser", getUser);

  ///verificar estado

  const [email, setEmail] = useState(getUser.email);

  const formik = useFormik({
    initialValues: {
      newEmail: "",
    },
    validationSchema: Yup.object({
      newEmail: Yup.string()
        .required("Email is required")
        .email("Invalid Email"),
    }),

    onSubmit: async (values) => {
      console.log("values", values);
      try {
        await updateUser({
          variables: {
            input: {
              email: values.newEmail,
            },
          },
        });
        //Update cache Apollo
        refetch();
        setEmail(values.newEmail);

        setShow(false);
        toast.success("the email has changed correctly");
      } catch (error) {
        console.log("error", error);
        toast.error("Error");
      }
    },
  });

  return (
    <>
      {formik.errors.newEmail && formik.touched.newEmail ? (
        <h6 className="errorForm">{formik.errors.newEmail}</h6>
      ) : null}

      <form className="changePassword" onSubmit={formik.handleSubmit}>
        <input
          className="changePassword__input"
          type="email"
          placeholder={email}
          name="newEmail"
          onChange={formik.handleChange}
          value={formik.values.newEmail}
        />

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
