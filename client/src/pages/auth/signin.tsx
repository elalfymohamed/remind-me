import * as React from "react";
import type { NextPage } from "next";
// import Link - Image -> next
import Link from "next/link";
import Image from "next/image";
// import package js-cookie
import Cookies from "js-cookie";
// import function fetch auth
import { fetchAuth } from "@api";
// interface -> TS
import { Form_Data } from "../../shared/model";
// import custom ui component
import { CustomInput, CustomButton } from "@components/ui";
// import image -> logo
import logo from "../../../public/tasks_icon.svg";

// type -> ts
type InputError = {
  email?: boolean;
  password?: boolean;
};

type StateReducer = {
  userData: Form_Data;
  inputError: InputError;
  errorMsg: string;
  isPending: boolean;
};

// react hooks
const { useReducer } = React;
const SignIn: NextPage = () => {
  const [state, updateState] = useReducer(
    (state: StateReducer, newState: Partial<StateReducer>) => ({
      ...state,
      ...newState,
    }),
    {
      userData: {
        email: "",
        password: "",
      },
      inputError: {},
      errorMsg: "",
      isPending: false,
    }
  );

  const validation = {
    email: (val: string): boolean | string =>
      val && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    password: (val: string): boolean | string =>
      val &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#/|])[A-Za-z\d@$!%*?&#/|]{8,}$/.test(
        val
      ),
  } as unknown;

  const validationForm = (): { valid: boolean; errors: object } => {
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

  const handelSubmit = async (e: React.PointerEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { errors, valid } = validationForm();

    if (!valid) {
      updateState({ inputError: errors });
    } else {
      updateState({ isPending: true });
      try {
        const res = await fetchAuth("auth/signin", state.userData);
        const data = await res.data;

        if (data.status === 200) {
          Cookies.set("authorization", data.data.token, {
            expires: 7,
            path: "/",
          });
          window.location.href = "/";

          updateState({
            userData: {
              email: "",
              password: "",
            },
            isPending: false,
          });
        }
      } catch (error: any) {
        console.error(error.message);
        updateState({ isPending: false });

        const { response } = error;
        if (response?.status === 404) {
          return updateState({ errorMsg: response.data.data });
        }
        updateState({ errorMsg: error.message });
      }
    }
  };

  return (
    <section className="auth-section">
      <div className="container">
        <div className="auth-section__header">
          <Image
            src={logo}
            alt="remind me logo"
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
          {state.errorMsg && (
            <div className="error_msg">
              <p className="error_msg-text">{state.errorMsg}</p>
            </div>
          )}
          <form className="form-control" onSubmit={handelSubmit}>
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
              errorMgs="password is require"
              inputError={state.inputError.password}
            />
            <div className="form__submit">
              <CustomButton
                text="submit"
                typeBtn="submit"
                isPending={state.isPending}
                attr={{ onClick: () => console.log("E") }}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
