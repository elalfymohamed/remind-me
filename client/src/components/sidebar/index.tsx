import * as React from "react";
//  import Link -> next
import Link from "next/link";
//  import package react icons
import {
  MdOutlineCalendarToday,
  MdDelete,
  MdOutlineTaskAlt,
} from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { RiAddLine } from "react-icons/ri";
// import custom hook
import useDateCheck from "../../hooks/useDateCheck";
// import component
import { AddProject } from "./common/AddProject";
// import type
import { projectObj } from "../../shared/model";

//  hooks react
const { useState } = React;

export const Sidebar = () => {
  const date = useDateCheck();

  const [showProject, setShowProject] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [dataProjects, setDataProjects] = useState<projectObj[]>([]);

  return (
    <>
      <AddProject
        showModel={openModel}
        onRequestClose={(state) => setOpenModel(state)}
        onRequestData={(data) => setDataProjects((prev) => [...prev, data])}
      />
      <aside className="sidebar">
        <div className="sidebar-container">
          <div className="sidebar-date">
            <div className="calendar">
              <div className="day">{date.dayDisplay}</div>
              <div className="my">
                <div className="month">{date.monthDisplay}</div>
                <div className="yea">{date.year}</div>
              </div>
            </div>
            <div className="today">{date.weekday}</div>
          </div>
          <div className="sidebar-menu">
            <div className="menu-nav active">
              <Link href="/" className="nav-item">
                <span className="nav-item__icon">
                  <MdOutlineTaskAlt size={20} color="#747474" />
                </span>
                <span className="nav-item__text">Task</span>
              </Link>
            </div>
            <div className="menu-nav">
              <Link href="/" className="nav-item">
                <span className="nav-item__icon">
                  <MdOutlineCalendarToday size={20} color="#747474" />
                </span>
                <span className="nav-item__text">Today</span>
              </Link>
            </div>
            <div className="menu-nav">
              <Link href="/" className="nav-item">
                <span className="nav-item__icon">
                  <BsFillCalendarCheckFill size={18} color="#747474" />
                </span>
                <span className="nav-item__text">Next 7 days</span>
              </Link>
            </div>
            <div className="menu-nav">
              <Link href="/" className="nav-item">
                <span className="nav-item__icon">
                  <MdDelete size={20} color="#747474" />
                </span>
                <span className="nav-item__text">Recently Deleted</span>
              </Link>
            </div>
          </div>
          <div className="projects">
            <div className="projects-content">
              <div
                className={`projects-btn ${
                  showProject ? "projects--show" : ""
                }`}
                role={"button"}
                onClick={() => setShowProject((prev) => !prev)}
                tabIndex={0}
                aria-label="show projects"
              >
                <span>
                  <IoIosArrowDown size={20} color="#747474" />
                </span>
                <span>Projects</span>
              </div>
              <div
                className={`projects-menu ${
                  showProject ? "projects--show" : ""
                }`}
              >
                <div
                  className={`projects-menu__content ${
                    showProject ? "projects-menu--show" : ""
                  }`}
                >
                  <ul className="projects-items">
                    {dataProjects.map((item, index) => (
                      <li className="project-item active" key={index}>
                        <div>
                          <div
                            className="point"
                            style={{ background: item.hairColor }}
                          />
                          <p>{item.name}</p>
                        </div>
                      </li>
                    ))}

                    <li className="add-project">
                      <div
                        className="add-project__btn"
                        role={"button"}
                        onClick={() => setOpenModel(true)}
                        tabIndex={0}
                        aria-label="add new project"
                      >
                        <span>
                          <RiAddLine size={16} color="#E05E4E" />
                        </span>
                        <span>Add project</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
