import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL as string;

export const fetchAuth = (API_URL: string, DATA: object) =>
  axios.post(`${API}/${API_URL}`, DATA);
