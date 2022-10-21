import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import Users from "../models/users.js";

dotenv.config();

const PRIVET_KEY = process.env.PRIVET_KEY;

export const signup = async (req, res) => {
  const { email, password, last_name, first_name } = req.body;

  try {
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res.status(404).json({
        status: 404,
        msg: "error",
        data: "User already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await Users.create({
      email,
      last_name,
      first_name,
      password: hashedPassword,
    });

    const token = jsonwebtoken.sign(
      {
        id: result._id,
        email,
        last_name,
        first_name,
      },
      PRIVET_KEY,
      { expiresIn: "7d" }
    );
    req.session.user = result;

    res.status(201).json({
      status: 201,
      msg: "success",
      data: {
        token: token,
      },
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
    return res.status(404).json({
      status: 404,
      msg: "error",
      data: "email and password is required",
    });
  }
  try {
    const existingUser = await Users.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        status: 404,
        msg: "error",
        data: "User doesn't exist",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(404).json({
        status: 404,
        msg: "error",
        data: "password doesn't exist",
      });
    }

    const token = jsonwebtoken.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        last_name: existingUser.last_name,
        first_name: existingUser.first_name,
      },
      PRIVET_KEY,
      { expiresIn: "7d" }
    );

    req.session.user = existingUser;

    res.status(200).json({
      status: 200,
      msg: "success",
      data: {
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error._message,
    });
  }
};
