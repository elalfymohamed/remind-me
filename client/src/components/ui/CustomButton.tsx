import React from "react";

export interface Props {
  isPending?: boolean;
  typeBtn: "submit" | "button";
  classes?: string;
  text: string | React.ReactNode;
  attr?: object;
}

export const CustomButton: React.FC<Props> = ({
  isPending,
  text,
  classes,
  typeBtn,
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

CustomButton.defaultProps = {
  classes: "btn-submit",
  typeBtn: "submit",
};
