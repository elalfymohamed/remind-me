import * as React from "react";

import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
//
import Cookies from "js-cookie";
// fetch auth
import { fetchAuth } from "@api";
// interface -> TS
import { Form_Data } from "../../model";
// component -> ui
import { CustomInput, CustomButton } from "@components/ui";

// type -> ts
type InputError = {
  email?: boolean;
  password?: boolean;
};

// react hooks
const { useState } = React;
const SignIn: NextPage = () => {
  const [userData, setUserData] = useState<Form_Data | any>({
    email: "",
    password: "",
  });

  const [inputError, setInputError] = useState<InputError>({});
  const [errorMsg, setErrorMsg] = useState<string>("");
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
    let errors = {} as InputError | any;
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
    setInputError({});
    setErrorMsg("");
  };

  const handelSubmit = async (e: React.PointerEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { errors, valid } = validationForm();

    if (!valid) {
      setInputError(errors);
    } else {
      setIsPending(true);
      try {
        const res = await fetchAuth("auth/signin", userData);
        const data = await res.data;

        if (data.status === 200) {
          Cookies.set("authorization", data.data.token, {
            expires: 7,
            path: "/",
          });
          setIsPending(false);
          window.location.href = "/";
          setUserData({
            email: "",
            password: "",
          });
        }
      } catch (error: any) {
        console.error(error.message);
        setIsPending(false);
        const { response } = error;
        if (response?.status === 404) {
          return setErrorMsg(response.data.data);
        }
        setErrorMsg(error.message);
      }
    }
  };

  return (
    <section className="auth-section">
      <div className="container">
        <div className="auth-section__header">
          <Image
            src="/tasks_icon.svg"
            alt="task logo"
            quality={90}
            width={80}
            height={80}
          />
        </div>
        <h2 className="auth-section__title">Welcome back!</h2>
        <h3 className="auth-section__your-account">Sign in to your account</h3>
        <div className="auth-section__account">
          <h3>Don&apos;t have an account?</h3>
          <Link href="/auth/signup" className="auth-section__link">
            Sign Up
          </Link>
        </div>
        <div className="auth-section__form">
          {errorMsg && (
            <div className="error_msg">
              <p className="error_msg-text">{errorMsg}</p>
            </div>
          )}
          <form className="form-control" onSubmit={handelSubmit}>
            <CustomInput
              label="email"
              type="email"
              onChange={handelOnChange}
              name="email"
              value={userData.email}
              errorMgs="email is require"
              inputError={inputError.email}
            />
            <CustomInput
              label="password"
              type="password"
              onChange={handelOnChange}
              name="password"
              errorMgs="password is require"
              inputError={inputError.password}
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
