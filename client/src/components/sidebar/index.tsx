import * as React from "react";

import Link from "next/link";

import {
  MdOutlineCalendarToday,
  MdDelete,
  MdOutlineTaskAlt,
} from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp, IoMdAdd } from "react-icons/io";
import { BsFillCalendarCheckFill } from "react-icons/bs";

import useDateCheck from "../../hooks/useDateCheck";

//  hooks react
const { useEffect, useState, useRef } = React;

export const Sidebar = () => {
  const date = useDateCheck();

  return (
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
            <div className="projects-menu">
              <span>
                <IoIosArrowDown size={19} color="#747474" />
              </span>
              <span>Projects</span>
            </div>
            <div className="">
              <ul>
                <li>
                  <div>sfsdfds</div>
                </li>
                <li>
                  <div>sfsdfds</div>
                </li>
                <li>
                  <div>sfsdfds</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
