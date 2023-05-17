import axios from 'axios';

const baseUrl = 'http://localhost:3000';

export const getPosts = params => {
  return axios.get(`${baseUrl}/posts`, { params });
};

export const getPostById = id => {
  return axios.get(`${baseUrl}/posts/${id}`);
};

export const createPost = data => {
  return axios.post(`${baseUrl}/posts`, data);
};

export const updatePost = (id, data) => {
  return axios.put(`${baseUrl}/posts/${id}`, data);
};

export const deletePost = id => {
  return axios.delete(`${baseUrl}/posts/${id}`);
};
