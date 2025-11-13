import axios from "axios";

// const API_KEY = "563492ad6f9170000100000108dc2880626e4436b3634ce1cf6b4d74";
axios.defaults.baseURL = "https://api.pexels.com/v1/";
// axios.defaults.headers.common["Authorization"] = API_KEY;
axios.defaults.headers.common["Authorization"] = import.meta.env.VITE_API_KEY;

axios.defaults.params = {
  orientation: "landscape",
};

export const getPhotos = async (query) => {
  const response = await axios.get(`search?query=${query}`);

  return response.data.photos;
};
