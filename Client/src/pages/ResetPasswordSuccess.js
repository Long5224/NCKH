import React from "react";
import { Link } from "react-router-dom";

export default function ResetPasswordSuccess() {
  return (
    <div class="alert alert-success" role="alert">
      Your Password has been reset. Click here to return{" "}
      <Link to="login">Login Page</Link>
    </div>
  );
}
