import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid lightgray;

  input {
    flex: 1;
    border: none;
    padding: 5px;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    border: none;
    border-left: 1px solid lightgray;
    padding: 5px;
    cursor: pointer;
  }
`;
