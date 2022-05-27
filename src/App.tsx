import React from "react";

import InputFelid from "./components/InputFelid"
import { Todo } from "./model";

const { useState } = React;

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.trim() !== "") {
      setTodos([...todos, {
        id: Date.now(),
        todo: todo,
        idDone: false,
      }]);
      setTodo("");
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Add Task
        </h1>
        <InputFelid todo={todo} setTodo={setTodo} handleSubmit={handleSubmit} />
      </header>
    </div>
  );
}

export default App;
