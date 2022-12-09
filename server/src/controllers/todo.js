const Todo = require("../models/todo");
const User = require("../models/users");

exports.createTodo = async (res, req) => {
  const todo = req.req.body;
  const getUser = await User.findById(req.req.userId);

  if (!todo.todo) {
    return res.res.status(404).json({
      status: 404,
      msg: "error",
      data: "enter todo",
    });
  }

  const newTodo = new Todo({
    ...todo,
    user_id: getUser._id,
  });

  try {
    const todo = await newTodo.save();
    res.res.status(201).json({
      status: 201,
      msg: "success",
      data: todo,
    });
  } catch (error) {
    console.log(error);
    res.res.status(409).json({
      msg: error._message,
    });
  }
};
