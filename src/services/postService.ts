import axios from "axios";
import { Post } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

type fetchPostsResponse = Post[];

export const fetchPosts = async (searchText, page): Promise<Post[]> => {
  const response = await axios.get<fetchPostsResponse>("/posts");
  // console.log("response:", response);

  return response.data;
  // return { posts: response.data };
};

// export const createPost = async (newPost) => {};

// export const editPost = async (newDataPost) => {};

// export const deletePost = async (postId) => {};
