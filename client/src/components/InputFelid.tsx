import * as React from "react";
import type { NextPage } from "next";
import { Options } from "./Options";

import { IsData } from "./../model";

import { IoIosColorPalette } from "react-icons/io";
import { BsPin, BsFillPinFill } from "react-icons/bs";

interface Props {
  data: IsData;
  setData: (data: IsData) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const { useState } = React;

const InputFelid: NextPage<Props> = ({ data, setData, handleSubmit }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickOptions = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLDivElement;
    const color = target.getAttribute("aria-label") as string;
    setData({
      ...data,
      color: color,
    });
  };

  return (
    <div className="add-task">
      <form className="form-input" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="enter a task"
          value={data.todo}
          onChange={(e) => setData({ ...data, todo: e.target.value })}
          className={`input-task ${data.color}`}
        />
        <button className="input_submit" type="submit" aria-label="save task">
          Save
        </button>
      </form>
      <div className="todo-options">
        <div className="todo-install">
          <div
            className={`install-btn ${data.install ? "install-active" : ""}`}
            role={"button"}
            onClick={() =>
              setData({
                ...data,
                install: !data.install,
              })
            }
            aria-expanded={data.install}
            aria-label="color-options"
            aria-haspopup="true"
            tabIndex={0}
          >
            {data.install ? <BsFillPinFill size="25" /> : <BsPin size="25" />}
          </div>
        </div>
        <div className="options-color">
          <div
            className={`options-color-btn ${isOpen ? "option-active" : ""}`}
            role={"button"}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="color-options"
            aria-haspopup="true"
            tabIndex={0}
          >
            <IoIosColorPalette size="30" />
          </div>
          {isOpen && <Options handleClickOptions={handleClickOptions} />}
        </div>
      </div>
    </div>
  );
};

export default InputFelid;
