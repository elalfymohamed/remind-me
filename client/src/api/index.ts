import axios from "axios";

export const fetchAPI = (API: string, DATA: object) =>
  axios.post(`http://localhost:500/${API}`, { DATA });
