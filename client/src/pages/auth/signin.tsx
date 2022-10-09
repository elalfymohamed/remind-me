import * as React from "react";

import type { NextPage } from "next";
import Link from "next/link";
// fetch auth
import { fetchAuth } from "../../api";
// interface -> TS
import { Form_Data } from "../../model";
// component -> ui
import { CustomInput, CustomButton } from "../../components/ui";

// react hooks
const { useState } = React;
const SignIn: NextPage = () => {
  const [userData, setUserData] = useState<Form_Data | any>({
    email: "",
    password: "",
  });

  const [inputError, setInputError] = useState<Form_Data | object>();
  const [isPending, setIsPending] = useState<boolean>(false);

  const validation = {
    email: (val: string): boolean | string =>
      val && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    password: (val: string): boolean | string =>
      val &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#/|])[A-Za-z\d@$!%*?&#/|]{8,}$/.test(
        val
      ),
  } as Form_Data | any;

  const validationForm = (): { valid: boolean; errors: object } => {
    let errors = {} as any | Form_Data;
    let valid = false as any | boolean;

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
  };

  const handelSubmit = (e: React.PointerEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { errors, valid } = validationForm();

    if (!valid) {
      setInputError(errors);
    } else {
      setIsPending(true);
      fetchAuth("auth/signin", userData)
        .then((res) => console.log(res))
        .catch((error) => {
          console.log(error);
        });
    }
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
          <h3>Don&apos;t have an account?</h3>
          <Link href="/auth/signup">
            <a className="auth-section__link">Sign Up</a>
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
              <CustomButton
                text="submit"
                typeBtn="submit"
                isPending={isPending}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
