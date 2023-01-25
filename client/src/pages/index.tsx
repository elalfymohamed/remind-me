import * as React from "react";

import type { NextPage } from "next";
// router link
import Link from "next/link";
//
import { fetchNewTodo } from "../api/index";
// components
import { Hero } from "../container/home/Hero";
import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";
// TS -> interface
import { Todo, IsData } from "../model";

// react hooks
const { useState, useEffect } = React;

const Home: NextPage = () => {
  const [data, setData] = useState<IsData>({
    todo: "",
    color: "color-default",
    install: false,
  });

  const [errorMsg, setErrorMsg] = useState<string>("");

  //  handel submit data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (data.todo === "") {
      return setErrorMsg("please enter a task");
    }

    fetchNewTodo("todo", data)
      .then(({ data }) => {
        console.log(data);
        if (data.status === 201) {
          setData({
            todo: "",
            color: "color-default",
            install: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
