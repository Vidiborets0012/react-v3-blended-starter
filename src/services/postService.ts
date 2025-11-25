import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (searchText, page) => {
  const response = await axios.get("/posts");
  // console.log("response:", response);

  return response.data;
};

// export const createPost = async (newPost) => {};

// export const editPost = async (newDataPost) => {};

// export const deletePost = async (postId) => {};
