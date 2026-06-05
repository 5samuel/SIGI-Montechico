import styled from "styled-components";
import { Icono } from "../../index";

export function Btnsave({
  funcion,
  titulo,
  bgcolor,
  icono,
  disabled
}) {

  return (

    <Container
      type="submit"
      onClick={!disabled ? funcion : null}
      $bgcolor={bgcolor}
      disabled={disabled}
    >

      {/* <Icono>{icono}</Icono> */}

      <span className="btn">
        {titulo}
      </span>

    </Container>

  );

}

const Container = styled.button`

  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  gap: 10px;
  background-color: initial;
  z-index: 2;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn {

    background: ${(props) => props.$bgcolor};

    padding: 0.6em 1.3em;

    font-weight: 900;
    font-size: 18px;

    border: 3px solid black;

    border-radius: 0.4em;

    box-shadow: 0.1em 0.1em #000;

    transition: 0.2s;

    color: #000;

    &:hover {

      transform: translate(-0.05em, -0.05em);

      box-shadow: 0.15em 0.15em #000;

    }

    &:active {

      transform: translate(0.05em, 0.05em);

      box-shadow: 0.05em 0.05em #000;

    }

  }

`;