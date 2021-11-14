import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { changeHeaderText } from '../../reducers/headerReducer';

const Header = props => {
  const header = useSelector(state => state?.header);
  const dispatch = useDispatch();

  const changeText = () => {
    dispatch(changeHeaderText('New header text'));
  };
  return (
    <>
    <Title>
      <h1>{header?.headerText}</h1>
    </Title>
      <button onClick={changeText}>Change Text</button>
    </>
  );
};

const Title = styled.h1 `
  margin: 0px 0px 10px 0px;
  color: red;
  font-size: 20px;
`;

export default Header;