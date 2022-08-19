import * as React from "react";

import { Link } from "react-router-dom";

// react hooks
const { useState } = React;
export const SignUp = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  return (
    <section className="auth-section">
      <div className="container">
        <div className="">
          <h2 className="auth-section__title">Create an account</h2>
          <div className="auth-section__account">
            <h3>Already have an account?</h3>
            <Link to="/auth/signin">Sign In</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
