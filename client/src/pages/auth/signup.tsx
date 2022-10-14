import * as React from "react";

import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

//
import Cookies from "js-cookie";
// interface -> TS
import { Form_Data } from "../../model";
// component -> ui
import { CustomInput, CustomButton } from "../../components/ui";
// fetch auth
import { fetchAuth } from "../../api";
// set Cooke
import { setCooke } from "../../utility/Cookies";

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

  const handelSubmit = (e: React.PointerEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { errors, valid } = validationForm();

    if (!valid) {
      setInputError(errors);
    } else {
      setIsPending(true);
      fetchAuth("auth/signup", userData)
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            Cookies.set("authorization", res.data.data.token, {
              expires: 7,
              path: "/",
            });
            router.push("/");
            setIsPending(false);
            setUserData({
              first_name: "",
              last_name: "",
              email: "",
              password: "",
            });
          }
          if (res.status === 404) {
            setErrorMsg(res.data);
            setIsPending(false);
          }
        })
        .catch((error) => {
          console.log(error.message);
          setIsPending(false);
        });
    }
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
          <Link href="/auth/signin">
            <a className="auth-section__link">Sign In</a>
          </Link>
        </div>
        <div className="auth-section__form">
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
