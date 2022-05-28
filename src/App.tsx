import React from "react";

import InputFelid from "./components/InputFelid"
import { Todo, IsData } from "./model";

const { useState } = React;

const App: React.FC = () => {

  const [data, setData] = useState<IsData>({
    todo: "",
    color: "",
    install: false
  })
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

        </div>

      </section>
    </div>
  );
}

export default App;
