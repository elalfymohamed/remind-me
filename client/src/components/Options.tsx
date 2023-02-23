import React from "react";
// import package react icons
import { MdOutlineInvertColorsOff } from "react-icons/md";

interface Props {
  handleClickOptions: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Options: React.FC<Props> = ({ handleClickOptions }) => {
  const colors = [
    "default",
    "automatic",
    "red",
    "orange",
    "yellow",
    "green",
    "greenish-blue",
    "blue",
    "purple",
    "grey",
  ] as string[];

  const defaultColor = "default";

  return (
    <div className="color-options-group">
      {colors.map((item: string, index: number) => (
        <div
          key={index}
          className={
            defaultColor === item
              ? `color-${item}-option color-option`
              : `color-${item} color-option`
          }
          role="button"
          aria-labelledby={`color-${item}`}
          tabIndex={0}
          aria-label={`color-${item}`}
          onClick={handleClickOptions}
        >
          {defaultColor === item && <MdOutlineInvertColorsOff size="25" />}
        </div>
      ))}
    </div>
  );
};
