import * as React from "react";

import { Link } from "react-router-dom";

// react hooks
const { useState } = React;
export const Signin = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  return (
    <section className="auth-section">
      <div className="">
        <div className=""></div>
      </div>
    </section>
  );
};
