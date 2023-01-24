import * as React from "react";

import Link from "next/link";
//  react icons
import {
  MdOutlineCalendarToday,
  MdDelete,
  MdOutlineTaskAlt,
} from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { RiAddLine } from "react-icons/ri";
// custom hook
import useDateCheck from "../../hooks/useDateCheck";
//
import { AddProject } from "./common/AddProject";

//  hooks react
const { useState } = React;

export const Sidebar = () => {
  const date = useDateCheck();

  const [showProject, setShowProject] = useState<boolean>(false);
  const [openModel, setOpenModel] = useState<boolean>(false);

  return (
    <>
      <AddProject
        showModel={openModel}
        onRequestClose={(state) => setOpenModel(state)}
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
              >
                <span>
                  <IoIosArrowDown size={19} color="#747474" />
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
                    <li className="project-item active">
                      <div>sfsdfds</div>
                    </li>

                    <li className="add-project">
                      <div
                        className="add-project__btn"
                        role={"button"}
                        onClick={() => setOpenModel(true)}
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
