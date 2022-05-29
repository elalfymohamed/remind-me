import React from "react";

import InputFelid from "./components/InputFelid"
import { Todos } from "./components/Todos"

import { Todo, IsData } from "./model";

const { useState } = React;

const App: React.FC = () => {

  const [data, setData] = useState<IsData>({
    todo: "",
    color: "",
    install: false
  });

  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.todo.trim() !== "") {
      setTodos([...todos, {
        id: Date.now(),
        todo: data.todo,
        color: data.color,
        idDone: false,
        isInstall: data.install
      }]);
      setData({
        todo: "",
        color: "",
        install: false
      });
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Add Task
        </h1>
        <InputFelid data={data} setData={setData} handleSubmit={handleSubmit} />
      </header>
      <section className="todo-list">
        <div className="todo-list-header">
          <h2>Todo List</h2>
        </div>
        <div className="todo-list-body">
          {
            todos.map((item) => (
              <div className="todo-items" key={item.id}>
                {
                  item.isInstall ?
                    <div className="todo-install">
                      <h6>install</h6>
                      <div className="">
                        <Todos item={item} />
                      </div>

                    </div>
                    :
                    <div></div>
                }
              </div>
            ))
          }
        </div>
      </section>
    </div>
  );
}

export default App;
