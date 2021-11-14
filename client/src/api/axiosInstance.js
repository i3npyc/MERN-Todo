import axios from 'axios';

export const axiosInstance = () => {
  return axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    headers: {
      'Content-type': 'application/json'
    }
  });
};

export const getTodo = () =>
  axiosInstance()
    .get('users/1/todos')
    .then(response => response);

export const createTodo = (obj) => {
  debugger
  axiosInstance()
    .post('users/1/todos', obj)
    .then(response => {
      debugger
      return response.data
    });
};
