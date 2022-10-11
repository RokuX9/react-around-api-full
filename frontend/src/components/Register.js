import React from "react";
import { NavLink } from "react-router-dom";
import FormPage from "./FormPage";
import "../blocks/Form.css";

function Register(props) {
  return (
    <FormPage
      name="register"
      header="Sign Up"
      inputs={[
        {
          type: "email",
          placeHolder: "Email",
          name: "email",
          id: "register-email",
          value: props.formState.email,
        },
        {
          type: "password",
          placeHolder: "Password",
          name: "password",
          id: "register-password",
          value: props.formState.password,
        },
      ]}
      buttonText="Sign up"
      linkText="Already a member? Log in here!"
      linkPath="/signin"
      formState={props.formState}
      initialState={props.initialState}
      setFormState={props.setFormState}
      submit={props.submit}
    ></FormPage>
  );
}

export default Register;
