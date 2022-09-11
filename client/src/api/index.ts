import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL as string;

const fetchApi = (API_URL: string) => axios.post(`${API}/${API_URL}`);
