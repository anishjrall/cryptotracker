import axios from "axios";

export const getPrice = async () => {
  return axios.get("/api/prices");
};
