import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

const token = Cookies.get("authorization") as string;

export const fetchAuth = (API_URL: string, DATA: object) =>
  axios.post(`${BASE_URL}/${API_URL}`, DATA);

export const fetchNewTodo = (API_URL: string, DATA: object) =>
  axios.post(`${BASE_URL}/${API_URL}`, DATA, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
