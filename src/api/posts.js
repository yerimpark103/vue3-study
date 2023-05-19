import { posts } from '.';

export const getPosts = params => {
  return posts.get('', { params });
};

export const getPostById = id => {
  return posts.get(`/${id}`);
};

export const createPost = data => {
  return posts.post('', data);
};

export const updatePost = (id, data) => {
  return posts.patch(`/${id}`, data);
};

export const deletePost = id => {
  return posts.delete(`/${id}`);
};
