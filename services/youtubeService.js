import axios from "axios";

const KEY = "AIzaSyCocKUct7Fl390TIwOiTR_8ZIhuWqULPVU";
// const KEY = 'AIzaSyBaUdWkOdqKoD_YleyZmjG2ndzWYys_GzQ-sL0ctzOzZVUUzyORk';

const youtubeApi = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    key: KEY,
  },
});

export const getVideos = async (params) => {
  const { data } = await youtubeApi.get("/videos", {
    params,
  });

  return data;
};

export const getSearchedVideos = async (params) => {
  const { data } = await youtubeApi.get("/search", {
    params,
  });

  return data;
};

export const getChannels = async (params) => {
  const { data } = await youtubeApi.get("/channels", {
    params,
  });

  return data;
};
