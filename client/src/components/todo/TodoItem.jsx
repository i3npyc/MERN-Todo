import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid black;
  padding: 10px 0px;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  &:last-child {
    border: 0;
  }
`;
const DeleteBtn = styled.div`
  font-weight: 700;
  font-size: 30px;
  color: red;
  cursor: pointer;
`;

const TodoItem = props => {
  return (
    <Container>
      <div>{props.index}</div>
      <div>{props.text}</div>
      <DeleteBtn onClick={() => props.removeTodo(props.id)}>&times;</DeleteBtn>
    </Container>
  );
};

export default TodoItem;
