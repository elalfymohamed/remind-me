import { NextPage } from "next";

export interface Props {
  isPending?: boolean;
  typeBtn: "submit" | "button";
  classes?: string;
  text: string;
}

export const CustomButton: NextPage<Props> = ({
  isPending,
  text,
  classes = "btn-submit",
  typeBtn = "submit",
}) => {
  return (
    <button className={`${classes} btn`} type={typeBtn} disabled={isPending}>
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
