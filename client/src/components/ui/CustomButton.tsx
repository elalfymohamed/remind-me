import React from "react";
import { NextPage } from "next";

export interface Props {
  isPending?: boolean;
  typeBtn: "submit" | "button";
  classes?: string;
  text: string;
  attr?: object;
}

export const CustomButton: NextPage<Props> = ({
  isPending,
  text,
  classes = "btn-submit",
  typeBtn = "submit",
  attr,
}) => {
  return (
    <button
      className={`${classes} btn`}
      type={typeBtn}
      disabled={isPending}
      {...attr}
    >
      {isPending ? (
        <div className="loader">
          <div className="loader-inner" />
        </div>
      ) : (
        <span> {text}</span>
      )}
    </button>
  );
};
