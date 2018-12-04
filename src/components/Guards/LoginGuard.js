import React from "react";
import styled from "styled-components";
import Redirect from "react-router-dom/es/Redirect";

export const LoginGuard = props => {
  if (!props.isAuth) {
    return props.children;
  }
  // if user is already logged in, redirects to the main /app
  return <Redirect to={"/app"} />;
};
