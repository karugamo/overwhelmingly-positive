import styled from 'styled-components'

const Button = styled.button`
  font-size: 20px;
  padding: 12px 40px;
  margin: 20px;
  border: 2px solid #9dd5f6;
  background-color: transparent;
  color: #9dd5f6;
  margin: 0;
  cursor: pointer;
  border-radius: 7px;
  box-shadow: 0px 2px white;

  transition: background-color 0.2s, color 0.2s;

  :hover {
    background-color: #9dd5f6;
    color: black;
  }

  :active {
    transform: translate(0, 2px);
    box-shadow: 0px 0px white;
  }
`

export default Button
