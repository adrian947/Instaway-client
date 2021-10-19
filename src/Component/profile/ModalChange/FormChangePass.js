import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";


export const FormChangePass = ({ setShow, handleLogOut }) => {
  const [updateUser] = useMutation(UPDATE_USER);
  

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Password is required"),
      newPassword: Yup.string()
        .required("Password is required")
        .min(6, "required 6 charcters")
        .oneOf([Yup.ref("repeatNewPassword")], "passwords must match"),
      repeatNewPassword: Yup.string()
        .required("Password is required")
        .min(6, "required 6 charcters"),
    }),

    onSubmit: async (values) => {
      const resp = await updateUser({
        variables: {
          input: {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          },
        },
      });

      if (!resp.data.updateUser) {
        return toast.error("error");
      } else {
        handleLogOut();
        toast.success("the password has changed correctly");
      }

      try {
      } catch (error) {
        console.log("error", error);
      }

      formik.handleReset();
    },
  });

  return (
    <>
      {formik.errors.currentPassword && formik.touched.currentPassword ? (
        <h6 className="errorForm">{formik.errors.currentPassword}</h6>
      ) : null}
      {formik.errors.newPassword && formik.touched.newPassword && (
        <h6 className="errorForm">{formik.errors.newPassword}</h6>
      )}
      {formik.errors.repeatNewPassword && formik.touched.repeatNewPassword ? (
        <h6 className="errorForm">{formik.errors.repeatNewPassword}</h6>
      ) : null}

      <form className="changePassword" onSubmit={formik.handleSubmit}>
        <input
          className="changePassword__input"
          type="password"
          placeholder="Current password"
          name="currentPassword"
          onChange={formik.handleChange}
          value={formik.values.currentPassword}
        />
        <input
          className="changePassword__input"
          type="password"
          placeholder="New password"
          name="newPassword"
          onChange={formik.handleChange}
          value={formik.values.newPassword}
        />
        <input
          className="changePassword__input"
          type="password"
          placeholder="Repeat new password"
          name="repeatNewPassword"
          onChange={formik.handleChange}
          value={formik.values.repeatNewPassword}
        />
        <button type="submit" className='changePassword__botonUpdate'>Update</button>
      </form>
      <div className="back">
        <button onClick={() => setShow(false)} className="back__button">
          Back
        </button>
      </div>
    </>
  );
};
