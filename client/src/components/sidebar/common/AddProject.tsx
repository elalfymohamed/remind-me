import React, { useState } from "react";

import emojis from "emojibase-data/en/data.json";

import { MdClose } from "react-icons/md";

import { CustomButton } from "../../ui";

type projectObj = {
  name: string;
  color: string;
};

type emojiObj = {
  emoji: string;
  label: string;
};

export interface Props {
  openModel: boolean;
  closeModel: (state: boolean) => void;
}

export const AddProject: React.FC<Props> = ({ openModel, closeModel }) => {
  const defaultColor = "#000" as string;

  const [project, setProject] = useState<projectObj>({
    name: "",
    color: defaultColor,
  });

  const [isPending, setIsPending] = useState<boolean>(false);
  const [openEmojis, setOpenEmojis] = useState<boolean>(false);

  //  array emojis
  const isEmojis: emojiObj[] = emojis.map((item) => ({
    emoji: item.emoji,
    label: item.label,
  }));

  const handelOnChange = (e: { target: { name: string; value: string } }) => {
    setProject((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handelCloseModel = () => {
    closeModel(false);
  };

  const handelOnSubmit = () => {
    console.log("handelOnSubmit");
  };

  return (
    <>
      {openModel && (
        <div className="model-add-project">
          <div
            className={`model-add-project__card ${
              openEmojis ? "active-emojis" : ""
            }`}
          >
            <div className="model-add-project__header">
              <h4 className="model-add-project__title">project name</h4>
              <button
                className="btn"
                type="button"
                aria-label="close model add project"
                onClick={handelCloseModel}
              >
                <span>
                  <MdClose size={20} color="#000" />
                </span>
              </button>
            </div>
            <div className="model-add-project__body">
              <div className="model-add-project__content">
                <div
                  className="point"
                  style={{ backgroundColor: project.color }}
                />
                <h5 className="model-add-project__name">{project.name}</h5>
              </div>
              <div className="model-add-project__option">
                <div className="model-add-project__inputs">
                  <div className="emoji-control">
                    <button
                      className="emoji-btn"
                      type="button"
                      title="add emoji"
                      aria-label="button add emoji"
                      onClick={() => setOpenEmojis((prev) => !prev)}
                    >
                      <span>🎯</span>
                    </button>
                  </div>
                  <div className="input-control">
                    <input
                      type="text"
                      className="project-input"
                      value={project.name}
                      placeholder="project"
                      name="name"
                      onChange={handelOnChange}
                    />
                  </div>
                  <div className="color-control">
                    <input
                      type="color"
                      className="color-input"
                      value={project.color}
                      name="color"
                      onChange={handelOnChange}
                    />
                  </div>
                </div>
                <div className="model-add-project__emojis">
                  <div
                    className={`model-add-project__emojis-content scrollbar ${
                      openEmojis ? "active-emojis" : ""
                    }`}
                  >
                    {openEmojis &&
                      isEmojis.map((item, index) => (
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
                    text="set project"
                    classes="btn-add-project"
                    attr={{ onClick: handelOnSubmit }}
                    isPending={isPending}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

AddProject.defaultProps = {
  openModel: false,
};
