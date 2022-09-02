import React from "react";

export interface Props {
  label: string;
  type: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMgs?: string;
  errorInput?: boolean;
}

export const CustomInput: React.FC<Props> = ({
  label,
  type,
  name,
  onChange,
  errorMgs,
  errorInput,
}) => {
  return (
    <div className="form-control__input">
      <label>{label}</label>
      <input
        type={type}
        className="input-control"
        name={name}
        onChange={onChange}
      />
      {errorInput && (
        <div className="error_msg">
          <p>{errorMgs}</p>
        </div>
      )}
    </div>
  );
};
