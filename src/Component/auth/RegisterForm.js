import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../gql/user";
import {toast} from 'react-toastify'


export const RegisterForm = ({setShowLogin}) => {
  const [register] = useMutation(REGISTER);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "adrian",
      userName: "pp",
      email: "pp@p.com",
      password: "123123",
      rpassword: "123123",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("The name is a required field"),
      userName: Yup.string()
        .required("The nickname is a required field")
        .matches(/^[a-zA-Z0-9-]*$/, "userName cannot have space"),
      email: Yup.string()
        .required("The email is a required field")
        .email("Email not valid"),
      password: Yup.string()
        .required("The password must have at least 6 characters")
        .min(6)
        .oneOf([Yup.ref("rpassword")], "passwords must match"),
      rpassword: Yup.string()
        .required("The password must have at least 6 characters")
        .min(6),
    }),
    onSubmit: async (formData) => {
      try {
        const newUserChange = formData;
        const { rpassword, ...newUser } = newUserChange;
        // eslint-disable-next-line no-unused-vars
        const result = await register({
          variables: {
            input: newUser,
          },
        });
        
        toast.success('Registered user successfully ', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          setShowLogin(true)


      } catch (error) {
        console.log("error", error.message);
        toast.error(error.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
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
        Sign up to see photos and videos of your friends
      </h2>
      {error ? <p className="register__error--response">{msg}</p> : null}
      <Form onSubmit={formik.handleSubmit}>
        <Form.Field className="register__place">
          <label htmlFor="name">Name</label>
          <input
            autoComplete="off"
            placeholder="Name"
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </Form.Field>
        {formik.errors.name && formik.touched.name ? (
          <div className="register__container">
            <div className="register__error">
              <p>{formik.errors.name}</p>
            </div>
          </div>
        ) : null}
        <Form.Field className="register__place">
          <label htmlFor="userName">User name</label>
          <input
            autoComplete="off"
            placeholder="User name"
            type="text"
            id="userName"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
          />
        </Form.Field>
        {formik.errors.userName && formik.touched.userName ? (
          <div className="register__container">
            <div className="register__error">
              <p>{formik.errors.userName}</p>
            </div>
          </div>
        ) : null}
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
        <Form.Field className="register__place">
          <label htmlFor="rpassword">Repeat password</label>
          <input
            autoComplete="off"
            placeholder="Repeat Password"
            type="password"
            id="rpassword"
            name="rpassword"
            value={formik.values.rpassword}
            onChange={formik.handleChange}
          />
        </Form.Field>
        {formik.errors.rpassword && formik.touched.rpassword ? (
          <div className="register__container">
            <div className="register__error">
              <p>{formik.errors.rpassword}</p>
            </div>
          </div>
        ) : null}
        <Button type="submit" className="register__button">
          Register
        </Button>
      </Form>
    </div>
  );
};
