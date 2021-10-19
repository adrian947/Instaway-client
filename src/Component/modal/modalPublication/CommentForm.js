import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../../gql/comment";

export const CommentForm = ({ publi }) => {
  const [addComment] = useMutation(ADD_COMMENT);

  const formik = useFormik({
    initialValues: {
      comment: "",
    },

    validationSchema: Yup.object({
      comment: Yup.string().required("The comment is a required field").max(50),
    }),
    onSubmit: async (formData) => {
      
      try {
        await addComment({
          variables: {
            input: {
              idPublication: publi.id,
              comment: formData.comment,
            },
          },
        });
        
      } catch (error) {
        toast.warning(error);
        console.log("error", error);
      }

      formik.handleReset();
    },
  });

  return (
    <>
      {formik.errors.comment && formik.touched.comment ? (
        <div className="register__container">
          <div className="register__error" style={{ width: "100%" }}>
            <p>{formik.errors.comment}</p>
          </div>
        </div>
      ) : null}
      <form className="commentForm" onSubmit={formik.handleSubmit}>
        <input
          placeholder="Add comments..."
          value={formik.values.comment}
          onChange={formik.handleChange}
          type="text"
          id="comment"
          name="comment"
        />
        <button type="submit">Publish</button>
      </form>
    </>
  );
};
