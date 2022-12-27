import * as React from "react";

import type { NextPage } from "next";
// router link
import Link from "next/link";
//
import { fetchNewTodo } from "../api/index";
// components
import InputFelid from "../components/InputFelid";
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
  const [iTodos, setITodos] = useState<any>([]);
  const [nTodos, setNTodos] = useState<any>([]);

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
          if (data.data.install) {
            setITodos((state: []) => [...state, { ...data.data }]);
          } else {
            setNTodos((state: []) => [...state, { ...data.data }]);
          }
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

  // useEffect(() => {
  //   document.body.classList.add("body-todo");

  //   return () => document.body.classList.remove("body-todo");
  // }, []);

  return (
    <>
      <Header />
      <section className="todo-list">
        <div className="container">
          <Sidebar />
          <div className="">
            {/* <InputFelid
            data={data}
            setData={setData}
            handleSubmit={handleSubmit}
          /> */}
            {/* <div className="todo-list-header">
              <h2>Todo List</h2>
            </div> */}
            <div className="todo-list-body">
              {/* {iTodos.length >= 1 && (
              <Hero
                title="install"
                todos={iTodos}
                setITodos={setITodos}
                setNTodos={setNTodos}
              />
            )}
            {nTodos.length >= 1 && (
              <Hero
                title="other"
                todos={nTodos}
                setITodos={setITodos}
                setNTodos={setNTodos}
              />
            )} */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
