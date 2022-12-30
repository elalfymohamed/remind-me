import React, { useState } from "react";

import emojis from "emojibase-data/en/data.json";

import { CgCloseO } from "react-icons/cg";
import { CustomButton } from "../../ui";
import { NextPage } from "next";

type projectObj = {
  name: string;
  color: string;
};

type emojiObj = {
  emoji: string;
  label: string;
};

export interface Props {
  setAddProject: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddProject: NextPage<Props> = ({ setAddProject }) => {
  const defaultColor = "#000" as string;
  const [project, setProject] = useState<projectObj>({
    name: "",
    color: defaultColor,
  });

  const [isPending, setIsPending] = useState<boolean>(false);

  const isEmojis = emojis.map((item) => ({
    emoji: item.emoji,
    label: item.label,
  })) as emojiObj[];

  const handelOnChange = (e: { target: { name: string; value: string } }) => {
    setProject((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handelOnSubmit = () => {
    console.log("handelOnSubmit");
  };

  return (
    <div className="model-add-project">
      <div className="model-add-project__card">
        <div className="model-add-project__header">
          <h4 className="model-add-project__title">project name:</h4>
          <button
            className="btn"
            type="button"
            aria-label="close model add project"
            onClick={() => setAddProject(false)}
          >
            <span>
              <CgCloseO size={20} color="#000" />
            </span>
          </button>
        </div>
        <div className="model-add-project__body">
          <div className="model-add-project__content">
            <div className="point" style={{ backgroundColor: project.color }} />
            <h5 className="model-add-project__name">{project.name}</h5>
          </div>
          <div className="model-add-project__option">
            <div className="model-add-project__inputs">
              <input
                type="text"
                className="project-input"
                value={project.name}
                name="name"
                onChange={handelOnChange}
              />
              <input
                type="color"
                className="color-input"
                value={project.color}
                name="color"
                onChange={handelOnChange}
              />
            </div>
            <div className="model-add-project__emojis">
              <div className="model-add-project__emojis-content scrollbar">
                {isEmojis.map((item, index) => (
                  <div className="emoji-item" key={index}>
                    <div
                      className="emoji"
                      title={item.label}
                      data-label={item.label}
                      aria-label={`emoji ${item.label}`}
                      role="button"
                      onClick={() =>
                        setProject((prev) => ({
                          ...prev,
                          name: `${prev.name}${item.emoji}`,
                        }))
                      }
                    >
                      {item.emoji}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="model-add-project__submit">
              <CustomButton
                typeBtn="button"
                text="Add"
                classes="btn-add-project"
                attr={{ onClick: handelOnSubmit }}
                isPending={isPending}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
