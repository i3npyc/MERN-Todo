import { getTodo, createTodo } from '../api/axiosInstance';

const ADD_TODO = 'ADD_TODO';
const UPDATE_NEW_TODO = 'UPDATE_NEW_TODO';
const DELETE_TODO = 'DELETE_TODO';
const SET_TODO = 'SET_TODO';

let inicialState = {
  todoData: [],
  body: ''
};

export const todoReducer = (state = inicialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      let newTodo = { userId: 1, title: state.body, complited: false };
      return { ...state, todoData: [...state.todoData, newTodo], body: '' };
    case UPDATE_NEW_TODO:
      return { ...state, body: action.body };
    case DELETE_TODO:
      return {
        ...state,
        todoData: [
          ...state.todoData.filter(el => {
            if (el.id === action.idTodo) {
              return false;
            } else {
              return { ...el };
            }
          })
        ]
      };
    case SET_TODO:
      return { ...state, todoData: [...state.todoData, ...action.todo] };
    default:
      return state;
  }
};

export const addTodo = () => ({ type: ADD_TODO });
export const updateNewTodo = body => ({ type: UPDATE_NEW_TODO, body });
export const deleteTodo = idTodo => ({ type: DELETE_TODO, idTodo });
export const setTodo = todo => ({ type: SET_TODO, todo });

export const getTodoThunkCreator = () => {
  return dispatch => {
    getTodo().then(data => {
      dispatch(setTodo(data.data));
    });
  };
};
export const CreateTodoThunkCreator = (todo) => {
  debugger
  return async dispatch => {
    debugger
    const result = createTodo(todo);
    debugger
    dispatch(addTodo(result));
  };
};
