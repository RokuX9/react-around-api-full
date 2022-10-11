import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, loggedIn, checkTokenValidity, ...props }) {
  return (
    <Route {...props}>{loggedIn ? children : <Redirect to="/signin" />}</Route>
  );
}

export default ProtectedRoute;
