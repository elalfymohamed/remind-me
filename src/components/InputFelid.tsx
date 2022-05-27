
interface Props {
  todo: string,
  setTodo: (todo: string) => void,
  handleSubmit: (e: React.FormEvent) => void,
}

const InputFelid: React.FC<Props> = ({ todo, setTodo, handleSubmit }) => {
  return (
    <div className="add-task">
      <form className="form-input" onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="enter a task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="input-task" />
        <button className="input_submit" type="submit" aria-label="save task">
          Save
        </button>
      </form>
    </div>
  )
}


export default InputFelid