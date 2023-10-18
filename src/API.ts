import axios from "axios";

/**
 * GET
 */
const instance = axios.create({
  baseURL: "http://jotihunt-nunspeet.nl/api",
});

instance.interceptors.request.use(
  (config) => {
    const userToken = JSON.parse(localStorage.getItem("userToken") || "{}");
    if (userToken) {
      config.headers!.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

export const getAllHunters = async () => {
  const response = await instance.get("/hunters");
  if (response.status === 200) {
    return response.data.data;
  }
};

export const deleteSighting = async (id: number) => {
  const response = await instance.delete("/sightings/" + id);
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

export const postHunter = async (body: any) => {
  try {
    const response = await instance.post("/hunter", body);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (e) {
    return false;
  }
};

export const loginHunter = async (body: any) => {
  try {
    const response = await instance.post("/hunter/login", body);
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

/**
 * PATCH
 */

export const updateHunterLocation = async (
  lat: number,
  long: number,
  id: number
) => {
  const response = await instance.patch(`/hunter/${id}/update/location`, {
    lat: lat,
    long: long,
  });
  if (response.status === 200) {
    return response.data;
  }
};

export const updateHunterStatus = async (
  id: number,
  isHunting?: boolean,
  areaId?: number
) => {
  const response = await instance.patch(`/hunter/${id}/update/status`, {
    is_hunting: isHunting,
    area_id: areaId,
  });
  if (response.status === 200) {
    return response.data;
  }
};
