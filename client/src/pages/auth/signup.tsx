import * as React from "react";

import type { NextPage } from "next";
import Link from "next/link";
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

type StateReducer = {
  userData: Form_Data;
  inputError: InputError;
  errorMsg: string;
  isPending: boolean;
};

// react hooks
const { useReducer } = React;
const SignUp: NextPage = () => {
  const [state, updateState] = useReducer(
    (state: StateReducer, newState: Partial<StateReducer>) => ({
      ...state,
      ...newState,
    }),
    {
      userData: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
      inputError: {},
      errorMsg: "",
      isPending: false,
    }
  );

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
  } as unknown;

  const handelOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateState({
      userData: {
        ...state.userData,
        [e.target.name]: e.target.value,
      },
      inputError: {},
      errorMsg: "",
    });
  };

  const validationForm = (): { errors: object; valid: boolean } => {
    let errors = {} as object;
    let valid = false as boolean;

    for (let key of Object.keys(state.userData)) {
      errors[key] = !validation[key](state.userData[key]);
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
      updateState({ inputError: errors });
    } else {
      updateState({ isPending: true });

      try {
        const res = await fetchAuth("auth/signup", state.userData);
        const data = await res.data;

        if (data.status === 201) {
          Cookies.set("authorization", data.data.token, {
            expires: 7,
            path: "/",
          });
          window.location.href = "/";
          updateState({
            userData: {
              first_name: "",
              last_name: "",
              email: "",
              password: "",
            },
            inputError: {},
            errorMsg: "",
            isPending: false,
          });
        }
      } catch (error: any) {
        console.error(error.message);
        updateState({
          isPending: false,
        });
        const { response } = error;
        if (response?.status === 404) {
          return updateState({ errorMsg: response.data.data });
        }
        updateState({
          errorMsg: error.message,
        });
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
          {state.errorMsg && (
            <div className="error_msg">
              <p className="error_msg-text">{state.errorMsg}</p>
            </div>
          )}
          <form className="form-control" onSubmit={handelSubmit}>
            <CustomInput
              label="first name"
              type="text"
              onChange={handelOnChange}
              name="first_name"
              value={state.userData.first_name}
              errorMgs="first name is require"
              inputError={state.inputError.first_name}
            />
            <CustomInput
              label="last name"
              type="text"
              onChange={handelOnChange}
              name="last_name"
              value={state.userData.last_name}
              errorMgs="last name is require"
              inputError={state.inputError.last_name}
            />
            <CustomInput
              label="email"
              type="email"
              onChange={handelOnChange}
              name="email"
              value={state.userData.email}
              errorMgs="email is require"
              inputError={state.inputError.email}
            />
            <CustomInput
              label="password"
              type="password"
              onChange={handelOnChange}
              name="password"
              value={state.userData.password}
              errorMgs="password is require"
              inputError={state.inputError.password}
            />
            <div className="form__submit">
              <CustomButton
                text="submit"
                typeBtn="submit"
                isPending={state.isPending}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
