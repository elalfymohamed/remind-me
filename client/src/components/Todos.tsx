import type { NextPage } from "next";
//  import package react icons
import { BsFillPinFill, BsPin } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

import { Todo } from "../shared/model";

interface Props {
  item: Todo;
  handelDeleteTodo: (_id: string | undefined, install: boolean) => void;
  handelChangeInstallTodo: (todo: Todo) => void;
}

export const Todos: NextPage<Props> = ({
  item,
  handelDeleteTodo,
  handelChangeInstallTodo,
}) => {
  return (
    <div className={`todo-list-group__item ${item.color}`} data-id={item._id}>
      <div className="note">
        <div className="todo-list-potions__item">
          <div
            className="install-todo-list"
            role={"button"}
            aria-expanded={item.install}
            aria-label="install todo"
            aria-haspopup="true"
            tabIndex={0}
            onClick={() => handelChangeInstallTodo(item)}
          >
            {item.install ? <BsFillPinFill size="17" /> : <BsPin size="17" />}
          </div>
          <div
            className="delete-todo-list"
            role={"button"}
            aria-label="delete todo"
            tabIndex={0}
            onClick={() => handelDeleteTodo(item._id, item.install)}
          >
            <AiOutlineDelete size="17" />
          </div>
        </div>
        <div className="todo-list-group__item-notation">
          <span className="todo-list-group__item-title-text">{item.todo}</span>
        </div>
      </div>
    </div>
  );
};
