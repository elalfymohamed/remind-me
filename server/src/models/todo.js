import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  todo: {
    type: String,
    require: true,
  },
  color: {
    type: String,
    require: true,
  },
  install: {
    type: Boolean,
  },
});

const Todo = mongoose.model("todo", todoSchema);

export default Todo;
