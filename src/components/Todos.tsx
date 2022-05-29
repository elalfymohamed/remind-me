import { Todo } from "../model"

interface Props {
  item: Todo
}


export const Todos: React.FC<Props> = ({ item }) => {
  return (
    <div className={`todo-list-group__item ${item.color}`} data-id={item.id}>
      <div className="note">
        <div className="todo-list-group__item-title">
          <div className="delete-todo-list">delete</div>
        </div>
        <div className="todo-list-group__item-notation">
          <span className="todo-list-group__item-title-text">{item.todo}</span>
        </div>
      </div>
    </div>
  )
}