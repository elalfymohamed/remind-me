import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    require: [true, "first name is require"],
  },
  last_name: {
    type: String,
    require: [true, "last name is require"],
  },
  email: {
    type: String,
    require: [true, "email is require"],
  },
  password: {
    type: String,
    require: [true, "password is require"],
  },
});

const Users = mongoose.model("user", userSchema);

export default Users;
