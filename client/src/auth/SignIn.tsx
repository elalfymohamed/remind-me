import * as React from "react";
//  package
import { Link } from "react-router-dom";
// interface -> TS
import { Form_Data } from "../model";
// component -> ui
import { CustomInput } from "../components/ui/CustomInput";

// react hooks
const { useState } = React;
export const SignIn: React.FC = () => {
  const [userData, setUserData] = useState<any>({
    email: "",
    password: "",
  });

  const validation = {
    email: (val: string): boolean | string =>
      val && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    password: (val: string): boolean | string =>
      val &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#/|])[A-Za-z\d@$!%*?&#/|]{8,}$/.test(
        val
      ),
  } as any;

  const validationForm = (): { valid: boolean; errors: object } => {
    let errors = {} as any;
    let valid = false as any;

    for (let key of Object.keys(userData)) {
      errors[key] = !validation[key](userData[key]);
      valid |= errors[key];
    }

    return {
      errors: errors,
      valid: !valid,
    };
  };

  const handelOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((state: Form_Data) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));

    const { errors, valid } = validationForm();
  };

  const handelSubmit = (e: React.PointerEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData);
    const { errors, valid } = validationForm();
    console.log(errors);
  };

  return (
    <section className="auth-section">
      <div className="container">
        <div className="auth-section__header">
          <h2>Add Task</h2>
        </div>
        <h2 className="auth-section__title">Welcome back!</h2>
        <h3 className="auth-section__your-account">Sign in to your account</h3>
        <div className="auth-section__account">
          <h3>Don't have an account?</h3>
          <Link to="/auth/signup" className="auth-section__link">
            Sign Up
          </Link>
        </div>
        <div className="auth-section__form">
          <form className="form-control" onSubmit={handelSubmit}>
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
