import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { createTodo } from '../../api/axiosInstance';
import {
  updateNewTodo,
  addTodo,
  deleteTodo,
  getTodoThunkCreator,
  CreateTodoThunkCreator
} from '../../reducers/todoReducer';
import TodoItem from './TodoItem';

const ContainerTodo = styled.div`
  border-radius: 16px;
  background: violet;
  max-width: 800px;
  margin: 0 auto;
  padding: 0px 15px;
`;

const Todo = () => {
  const { todoData, body } = useSelector(state => state?.todo);
  const dispatch = useDispatch();

  let obj = {
    'title': body
  }
  
  useEffect(() => {
    dispatch(getTodoThunkCreator());
  }, []);

  const onChangeNewTodo = e => {
    dispatch(updateNewTodo(e.target.value));
  };
  const addTodoClick = () => {
    dispatch(CreateTodoThunkCreator(obj))
  };
  const removeTodo = id => {
    dispatch(deleteTodo(id));
  };

  return (
    <ContainerTodo>
      {todoData.map((el, i) => (
        <TodoItem
          index={i + 1}
          key={i}
          id={el?.id}
          text={el?.title}
          complited={el?.complited}
          removeTodo={removeTodo}
        />
      ))}
      <input value={body} onChange={e => onChangeNewTodo(e)} type="text" />
      <button onClick={addTodoClick}>Add todo</button>
    </ContainerTodo>
  );
};

export default Todo;
