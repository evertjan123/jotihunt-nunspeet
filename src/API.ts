import axios from "axios";

const instance = axios.create({
  baseURL: "https://jotihunt-backend-fg3broaofq-ew.a.run.app/api/",
});

export const getClubhouses = async () => {
  const response = await instance.get("/homes");
  if (response.status === 200) {
    return response.data.data;
  }
};
