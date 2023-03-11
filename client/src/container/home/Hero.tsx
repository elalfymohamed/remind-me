import * as React from "react";
import type { NextPage } from "next";

import { Todos } from "../../components/Todos";
import { Todo } from "../../shared/model";

interface Props {
  todos: [];
  title: string;
  setITodos: React.Dispatch<Todo>;
  setNTodos: React.Dispatch<Todo>;
}
// hooks react
const { useCallback } = React;
export const Hero: NextPage<Props> = ({
  todos,
  title,
  setITodos,
  setNTodos,
}) => {
  const handelDeleteTodo = useCallback(
    (id: string | undefined, install: boolean) => {},
    []
  );

  const handelChangeInstallTodo = useCallback((todo: Todo) => {}, []);

  return (
    <div className={`todo-${title} todos`}>
      <h6># {title}</h6>
      <div className="note-items">
        {todos.map((item: Todo) => (
          <div className="todo-items" key={item._id}>
            <Todos
              item={item}
              handelDeleteTodo={handelDeleteTodo}
              handelChangeInstallTodo={handelChangeInstallTodo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
