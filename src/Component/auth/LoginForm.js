import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { LOGIN } from "./../../gql/login";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const [login] = useMutation(LOGIN);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "pp@p.com",
      password: "123123",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required("The email is a required field")
        .email("Email not valid"),
      password: Yup.string()
        .required("The password must have at least 6 characters")
        .min(6),
    }),
    onSubmit: async (formData) => {
      console.log(formData);

      try {
        const resp = await login({
          variables: {
            input: formData,
          },
        });

        toast.success("Registered user successfully ", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        console.log("resp", resp);
      } catch (error) {
        console.log("error", error);
        setMsg(error.message);
        return setError(true);
      }
      setError(false);
      setMsg("");
      formik.handleReset();
    },
  });

  return (
    <div className="register">
      <h2 className="register__title">
        Log in to see photos and videos of your friends
      </h2>
      {error ? <p className="register__error--response">{msg}</p> : null}
      <Form onSubmit={formik.handleSubmit}>
        <Form.Field className="register__place">
          <label htmlFor="email">Email</label>
          <input
            autoComplete="off"
            placeholder="Email"
            type="text"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </Form.Field>
        {formik.errors.email && formik.touched.email ? (
          <div className="register__container">
            <div className="register__error">
              <p>{formik.errors.email}</p>
            </div>
          </div>
        ) : null}
        <Form.Field className="register__place">
          <label htmlFor="password">Password</label>
          <input
            autoComplete="off"
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </Form.Field>
        {formik.errors.password && formik.touched.password ? (
          <div className="register__container">
            <div className="register__error">
              <p>{formik.errors.password}</p>
            </div>
          </div>
        ) : null}

        <Button type="submit" className="register__button">
          Log In
        </Button>
      </Form>
    </div>
  );
};
