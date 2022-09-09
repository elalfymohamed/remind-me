import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
  {
    user_id: {
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
    is_delete: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("todo", todoSchema);

export default Todo;
