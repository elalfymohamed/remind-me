import * as React from "react";
//  package
import { Link } from "react-router-dom";
// interface -> TS
import { Form_Data } from "../model";
// component -> ui
import { CustomInput } from "../components/ui/CustomInput";

// react hooks
const { useState } = React;
export const SignUp: React.FC = () => {
  const [userData, setUserData] = useState<Form_Data>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const validation = {
    last_name: (val: string): boolean => !val,
    first_name: (val: string): boolean => !val,
    email: (val: string): boolean | string =>
      val && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    password: (val: string): boolean | string =>
      val &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#/|])[A-Za-z\d@$!%*?&#/|]{8,}$/.test(
        val
      ),
  } as any;

  const handelOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((state: Form_Data) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handelSubmit = (e: React.PointerEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <section className="auth-section">
      <div className="container">
        <div className="auth-section__header">
          <h2>Add Task</h2>
        </div>
        <h2 className="auth-section__title">Create an account</h2>
        <div className="auth-section__account">
          <h3>Already have an account?</h3>
          <Link to="/auth/signin" className="auth-section__link">
            Sign In
          </Link>
        </div>
        <div className="auth-section__form">
          <form className="form-control" onSubmit={handelSubmit}>
            <CustomInput
              label="first name"
              type="text"
              onChange={handelOnChange}
              name="first_name"
              errorMgs="first name is require"
            />
            <CustomInput
              label="last name"
              type="text"
              onChange={handelOnChange}
              name="last_name"
              errorMgs="last name is require"
            />
            <CustomInput
              label="email"
              type="email"
              onChange={handelOnChange}
              name="email"
              errorMgs="email is require"
            />
            <CustomInput
              label="password"
              type="password"
              onChange={handelOnChange}
              name="password"
              errorMgs="password is require"
            />
            <div className="form__submit">
              <button type="submit" className="btn-submit">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
