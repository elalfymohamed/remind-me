import React from "react";
import type { NextPage } from "next";
// components
import { Todos } from "../components/Todos";
import { Header } from "../components/header/Header";

// react hooks
const { useEffect } = React;

const Recently: NextPage = () => {
  useEffect(() => {
    document.body.classList.add("body-todo");

    return () => document.body.classList.remove("body-todo");
  }, []);

  return (
    <>
      <Header />
      <section className="todo-list">
        <div className="container">
          <div className="todo-list-header">
            <h2>Todo List</h2>
          </div>
          <div className="todo-list-body">
            <div className="todo-other todos">
              <h6># recently</h6>
              <div className="note-items">
                {/* {todos.map((item) => (
                  <div className="todo-items" key={item.id}>
                    <Todos item={item} />
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Recently;
