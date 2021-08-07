import styled from 'styled-components';

export const TextFieldContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 8px;

  input {
    padding: 8px 0 8px 0;
    width: 100%;
    height: 100%;
    border: none;
    border-bottom: 1px solid lightgray;
    background-color: transparent;
  }

  input:focus {
    outline: 0;
    border-bottom: 1px solid #065fd4;
  }
`;
