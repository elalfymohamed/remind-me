import React from "react";

import { NextPage } from "next";

export interface Props {
  label: string;
  type: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMgs?: string;
  inputError?: boolean;
  value: string;
}

export const CustomInput: NextPage<Props> = ({
  label,
  type,
  name,
  onChange,
  errorMgs,
  inputError,
  value,
}) => {
  return (
    <div className="form-control__input">
      <label>{label}</label>
      <input
        type={type}
        className="input-control"
        name={name}
        onChange={onChange}
        value={value}
      />
      {inputError && (
        <div className="error_msg">
          <p>{errorMgs}</p>
        </div>
      )}
    </div>
  );
};
