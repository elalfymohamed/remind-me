import * as React from "react";

import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

//
import Cookies from "js-cookie";
// interface -> TS
import { Form_Data } from "../../model";
// component -> ui
import { CustomInput, CustomButton } from "@components/ui";
// fetch auth
import { fetchAuth } from "@api";

// type -> ts
type InputError = {
  email?: boolean;
  password?: boolean;
  first_name?: boolean;
  last_name?: boolean;
};

// react hooks
const { useState } = React;
const SignUp: NextPage = () => {
  const router = useRouter();

  const [userData, setUserData] = useState<Form_Data | any>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [inputError, setInputError] = useState<InputError>({});
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);

  const validation = {
    last_name: (val: string): number => val.length,
    first_name: (val: string): number => val.length,
    email: (val: string): boolean | string =>
      val && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    password: (val: string): boolean | string =>
      val &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#/|])[A-Za-z\d@$!%*?&#/|]{8,}$/.test(
        val
      ),
  } as Form_Data | any;

  const handelOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((state: Form_Data) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
    setInputError({});
    setErrorMsg("");
  };

  const validationForm = (): { errors: Object; valid: Object } => {
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

  const handelSubmit = async (e: React.PointerEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { errors, valid } = validationForm();

    if (!valid) {
      setInputError(errors);
    } else {
      setIsPending(true);
      try {
        const res = await fetchAuth("auth/signup", userData);
        const data = await res.data;

        if (data.status === 201) {
          Cookies.set("authorization", data.data.token, {
            expires: 7,
            path: "/",
          });
          window.location.href = "/";
          setIsPending(false);
          setUserData({
            first_name: "",
            last_name: "",
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
        <h2 className="auth-section__title">Create an account</h2>
        <div className="auth-section__account">
          <h3>Already have an account?</h3>
          <Link href="/auth/signin" className="auth-section__link">
            Sign In
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
              label="first name"
              type="text"
              onChange={handelOnChange}
              name="first_name"
              value={userData.first_name}
              errorMgs="first name is require"
              inputError={inputError.first_name}
            />
            <CustomInput
              label="last name"
              type="text"
              onChange={handelOnChange}
              name="last_name"
              value={userData.last_name}
              errorMgs="last name is require"
              inputError={inputError.last_name}
            />
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
              value={userData.password}
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

export default SignUp;
