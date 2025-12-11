import axios from 'axios';
import { Post } from '@/types/post';
import { User } from '@/types/user';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

export type FetchPostsResponse = Post[];

export const fetchPosts = async ({
  searchText,
  page,
  userId,
}: {
  searchText: string;
  page: number;
  userId?: string;
}): Promise<{ posts: Post[]; totalCount: number }> => {
  const response = await axios.get<FetchPostsResponse>('/posts', {
    params: {
      userId,
      ...(searchText !== '' && { q: searchText }),
      _page: page,
      _limit: 8,
    },
  });
  const totalCount = Number(response.headers['x-total-count']);
  return { posts: response.data, totalCount };
};

interface NewPostContent {
  title: string;
  body: string;
}

interface EditedPost {
  id: number;
  title: string;
  body: string;
}

export const createPost = async (newPost: NewPostContent) => {
  const response = await axios.post<Post>('/posts', newPost);
  return response.data;
};

export const editPost = async (newDataPost: EditedPost) => {
  const response = await axios.patch<Post>(`/posts/${newDataPost.id}`, newDataPost);
  return response.data;
};

export const deletePost = async (postId: number) => {
  const response = await axios.delete<Post>(`/posts/${postId}`);
  return response.data;
};

export const fetchPostById = async (postId: number) => {
  // const response = await axios.get(`/posts/${postId}`);
  // return response.data;
  const { data } = await axios.get<Post>(`/posts/${postId}`);
  return data;
};
// fetch('https://jsonplaceholder.typicode.com/posts/1')
//   .then((response) => response.json())
//   .then((json) => console.log(json));

export const fetchUsers = async () => {
  // const response = await axios.get<User>('/users');
  // return response.data;
  const { data } = await axios.get<User>('/users');
  return data;
};
// https://jsonplaceholder.typicode.com/users

export const fetchUserById = async (userId: User['id']) => {
  // const response = await axios.get<User>(`/users${userId}`);
  // return response.data;
  const { data } = await axios.get<User>(`/users${userId}`);
  return data;
};
