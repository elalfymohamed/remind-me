import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Users from "../models/users.js";

const PRIVET_KEY = process.env.PRIVET_KEY;

export const signup = async (req, res) => {
  const { email, password, last_name, first_name } = req.body;

  try {
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      res.status(404);
      throw new Error("User already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await Users.create({
      email,
      last_name,
      first_name,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: result._id,
        email,
        last_name,
        first_name,
      },
      PRIVET_KEY,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      status: 201,
      data: {
        token: token,
      },
      msg: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error._message,
    });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(404);
    throw new Error("email and password is required");
  }
  try {
    const existingUser = await Users.findOne({ email });

    if (!existingUser) {
      res.status(404);
      throw new Error("User doesn't exist");
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      res.status(404);
      throw new Error("password doesn't exist");
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        last_name: existingUser.last_name,
        first_name: existingUser.first_name,
      },
      PRIVET_KEY,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      status: 200,
      data: {
        token: token,
      },
      msg: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error._message,
    });
  }
};
