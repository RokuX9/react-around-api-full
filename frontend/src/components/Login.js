import React from "react";
import FormPage from "./FormPage";
import "../blocks/Form.css";
import "../blocks/Login.css";
import { NavLink } from "react-router-dom";

function Login(props) {
  return (
    <FormPage
      name="login"
      header="Log in"
      inputs={[
        {
          type: "email",
          placeHolder: "Email",
          name: "email",
          id: "login-email",
          value: props.formState.email,
        },
        {
          type: "password",
          placeHolder: "Password",
          name: "password",
          id: "login-password",
          value: props.formState.password,
        },
      ]}
      buttonText="Log in"
      linkText="Not a member yet? Sign up here!"
      linkPath="/signup"
      formState={props.formState}
      initialState={props.initialState}
      setFormState={props.setFormState}
      submit={props.submit}
    ></FormPage>
  );
}

export default Login;
