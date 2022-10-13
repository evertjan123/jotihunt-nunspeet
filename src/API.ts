import axios from "axios";

/**
 * GET
 */
const instance = axios.create({
  baseURL: "https://jotihunt-backend-fg3broaofq-ew.a.run.app/api/",
});

export const getClubhouses = async () => {
  const response = await instance.get("/homes");
  if (response.status === 200) {
    return response.data.data;
  }
};

export const getArticles = async () => {
  const response = await instance.get("/articles");
  if (response.status === 200) {
    return response.data.data;
  }
};

export const getAreas = async () => {
  const response = await instance.get("/areas");
  if (response.status === 200) {
    return response.data.data;
  }
};

export const getAllSightings = async () => {
  const response = await instance.get("/sightings");
  if (response.status === 200) {
    return response.data.data;
  }
};

export const deleteSighting = async (id: number) => {
  const response = await instance.get("/sightings/delete/" + id);
  if (response.status === 200) {
    return response.data.data;
  }
};

/**
 * POST
 */
export const postSighting = async (body: any) => {
  const response = await instance.post("/sighting", body);
  if (response.status === 200) {
    return response.data.data;
  }
};
