import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const fetchAuth = (API_URL: string, DATA: object) =>
  axios.post(`${BASE_URL}/${API_URL}`, DATA);
