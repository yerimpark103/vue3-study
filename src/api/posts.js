import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const posts = [
  { id: 1, title: '제목1', contents: '내용1', createdAt: '2020-01-02' },
  { id: 2, title: '제목2', contents: '내용2', createdAt: '2020-02-02' },
  { id: 3, title: '제목3', contents: '내용3', createdAt: '2020-03-02' },
  { id: 4, title: '제목4', contents: '내용4', createdAt: '2020-04-02' },
  { id: 5, title: '제목5', contents: '내용5', createdAt: '2020-05-02' },
  { id: 6, title: '제목6', contents: '내용6', createdAt: '2020-06-02' },
  { id: 7, title: '제목7', contents: '내용7', createdAt: '2020-07-02' },
  { id: 8, title: '제목8', contents: '내용8', createdAt: '2020-08-02' },
  { id: 9, title: '제목9', contents: '내용9', createdAt: '2020-09-02' },
  { id: 10, title: '제목10', contents: '내용10', createdAt: '2020-10-02' },
];

export const getPosts = () => {
  return axios.get(`${baseUrl}/posts`);
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
