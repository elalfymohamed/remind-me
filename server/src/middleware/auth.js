import jwt from "jsonwebtoken";

const PRIVET_KEY = process.env.PRIVET_KEY;

export const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Login first");
    }

    const token = req.headers.authorization.split(" ")[1];

    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, PRIVET_KEY);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
