import axios from "axios";
import { Post } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

type fetchPostsResponse = Post[];

export const fetchPosts = async (searchText: string, page: number): Promise<Post[]> => {
  const response = await axios.get<fetchPostsResponse>("/posts", {
    params: {
      ...(searchText !== "" && { q: searchText }),
    },
  });
  // console.log("response:", response);

  return response.data;
  // return { posts: response.data };
};

// export const createPost = async (newPost) => {};

// export const editPost = async (newDataPost) => {};

// export const deletePost = async (postId) => {};
