import jwt_decode from "jwt-decode";

import Cookies from "js-cookie";

type DecodeData = {
  first_name: string;
  last_name: string;
  email: string;
};

export const userData = () => {
  const token = Cookies.get("authorization") as string;

  try {
    const decode = jwt_decode(token) as DecodeData;

    return {
      first_name: decode.first_name ?? "",
      last_name: decode.last_name ?? "",
      email: decode.email ?? "",
    };
  } catch (error) {
    console.log(error);
  }
};
