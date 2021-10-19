import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";

export const FormChangeWebSite = ({ setShow, refetch, getUser }) => {
  const [updateUser] = useMutation(UPDATE_USER);

  

  ///verificar estado

  const [web, setWeb] = useState(getUser.siteWeb);

  const formik = useFormik({
    initialValues: {
      newWeb: "",
    },
    validationSchema: Yup.object({
      newWeb: Yup.string().required("Web is required").url("Invalid Url"),
    }),

    onSubmit: async (values) => {
      console.log("values", values);
      try {
        await updateUser({
          variables: {
            input: {
              siteWeb: values.newWeb,
            },
          },
        });
        //Update cache Apollo
        refetch();
        setWeb(values.newWeb);

        setShow(false);
        toast.success("the web site has changed correctly");
      } catch (error) {
        console.log("error", error);
        toast.error("Error");
      }
    },
  });

  return (
    <>
      {formik.errors.newWeb && formik.touched.newWeb ? (
        <h6 className="errorForm">{formik.errors.newWeb}</h6>
      ) : null}

      <form className="changePassword" onSubmit={formik.handleSubmit}>
        <input
          className="changePassword__input"
          type="text"
          placeholder={web}
          name="newWeb"
          onChange={formik.handleChange}
          value={formik.values.newWeb}
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
