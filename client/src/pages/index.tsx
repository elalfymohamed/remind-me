import * as React from "react";

import type { NextPage } from "next";
// router link
import Link from "next/link";
//
import { fetchNewTodo } from "../api/index";
// components
import { Hero } from "../container/home/Hero";
import { Sidebar } from "../components/sidebar";
// TS -> interface
import { Todo, IsData } from "../shared/model";

// react hooks
const { useState, useEffect } = React;

const Home: NextPage = () => {
  return (
    <>
      <section className="task-section">
        <div className="section-container">
          <Sidebar />
          <div className="section-card">
            <div className="task-section-body"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
