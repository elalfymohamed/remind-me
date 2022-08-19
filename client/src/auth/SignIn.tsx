import * as React from "react";

import { Link } from "react-router-dom";

// react hooks
const { useState } = React;
export const SignIn = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  return (
    <section className="auth-section">
      <div className="container">
        <div className="">
          <h2 className="auth-section__title">Welcome back!</h2>
          <h3>Sign in to your account</h3>
          <div className="auth-section__account">
            <h3>Don't have an account?</h3>
            <Link to="/auth/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
