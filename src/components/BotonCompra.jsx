import styled from "styled-components";

const BotonCompra = styled.button`
  background-color: rgba(36, 10, 153, 1)ff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c70039;
  }
`;

function Tour({text}) {
  return <BotonCompra>{text}</BotonCompra>;
}

export default Tour