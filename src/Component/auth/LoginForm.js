import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { LOGIN } from "./../../gql/login";
import { toast } from "react-toastify";
import { decodeToken, saveToken } from "../../helpers/constants";
import { StateContext } from "../../hooks/useAuth";

export const LoginForm = () => {
  const [login] = useMutation(LOGIN);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [idToken, setIdToken] = useState("");

  const auth = StateContext();
  const { setUser } = auth;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
      

      try {
        const { data } = await login({
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

        const { token } = data.login;
        const decoded = decodeToken(token);

        setIdToken(token);
        saveToken(token);
        setUser(decoded);
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
