import styled from "styled-components";
import { Btnsave, v, useAuthStore, InputText, FooterLogin, RegistrarAdmin } from "../../index";
import { Device } from "../../styles/breackpoints";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import carrito from "../../assets/carrito.svg";
import logo from "../../assets/LogoMF.png";
import { MdOutlineInfo } from "react-icons/md";
import { ThemeContext } from "../../App";

export function LoginTemplate() {
  const { setTheme } = useContext(ThemeContext);

  useEffect(() => {
    setTheme("light");
  }, []);

  const { signInWithEmail } = useAuthStore();
  const [state, setState] = useState(false);
  const [stateInicio, setStateInicio] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function iniciar(data) {
    const response = await signInWithEmail({
      correo: data.correo,
      pass: data.pass,
    });
    if (response) {
      navigate("/");
    } else {
      setStateInicio(true);
    }
  }

  return (
    <Container>
      <div className="contentLogo">
        <img src={logo} alt="logo" />
        <span>MontechicoStock</span>
      </div>

      <div className="bannerlateral">
        <img src={carrito} alt="carrito" />
      </div>

      <div className="contentCard">
        {state && <RegistrarAdmin setState={() => setState(!state)} />}

        <div className="card">
          <Titulo>MontechicoStock</Titulo>

          {stateInicio && (
            <TextoStateInicio>datos incorrectos</TextoStateInicio>
          )}

          <span className="ayuda">
            Puedes crear una cuenta nueva ó <br />
            solicitar a tu empleador una. <MdOutlineInfo />
          </span>

          <p className="frase">Controla tu inventario.</p>

          <form onSubmit={handleSubmit(iniciar)}>
            <InputText icono={<v.iconoemail />}>
              <input
                className="form__field"
                type="text"
                placeholder="email"
                {...register("correo", { required: true })}
              />
              <label className="form__label">email</label>
              {errors.correo?.type === "required" && <p>Campo requerido</p>}
            </InputText>

            <InputText icono={<v.iconopass />}>
              <input
                className="form__field"
                type="password"
                placeholder="contraseña"
                {...register("pass", { required: true })}
              />
              <label className="form__label">pass</label>
              {errors.pass?.type === "required" && <p>Campo requerido</p>}
            </InputText>

            <ContainerBtn>
              <Btnsave
                titulo="Iniciar"
                bgcolor="#fc6b32"
                funcion={handleSubmit(iniciar)}
              />

              <Btnsave
                funcion={() => setState(!state)}
                titulo="Crear cuenta"
                bgcolor="#ffffff"
              />
            </ContainerBtn>
          </form>
        </div>

        <FooterLogin />
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  background-color: #262626;

  @media ${Device.tablet} {
    grid-template-columns: 1fr 2fr;
  }

  .contentLogo {
    position: absolute;
    top: 25px;
    left: 25px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #fff;
    z-index: 3;
    font-weight: 700;

    img {
      width: 40px;
    }

    span {
      font-size: 1.2rem;
    }
  }

  /* 🔥 FONDO PROFESIONAL */
  .bannerlateral {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    background: radial-gradient(circle at 70% 30%, #2e7d32 0%, #1b5e20 60%, #0f3d16 100%);

    img {
      width: 65%;
      z-index: 2;
      filter: drop-shadow(0px 20px 25px rgba(0,0,0,0.4));
    }

    /* sombra */
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.1) 0%,
        rgba(0, 0, 0, 0.3) 100%
      );
      z-index: 1;
    }

    /* luz difusa */
    &::before {
      content: "";
      position: absolute;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%);
      border-radius: 50%;
      top: 10%;
      right: 10%;
      z-index: 1;
    }
  }

  .contentCard {
    grid-column: 2;
    background: #f5f5f5;
    z-index: 100;
    position: relative;
    display: flex;
    padding: 20px;
    box-shadow: 8px 5px 18px 3px rgba(0, 0, 0, 0.35);
    justify-content: center;
    width: 100%;
    height: 100%;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    .card {
      padding-top: 80px;
      width: 100%;

      @media ${Device.laptop} {
        width: 50%;
      }
    }

    .frase {
      color: #fc6c32;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 30px;
    }

    .ayuda {
      position: absolute;
      top: 15px;
      right: 15px;
      color: #8d8d8d;
      font-size: 15px;
      font-weight: 500;
    }
  }
`;

const Titulo = styled.span`
  font-size: 2.8rem;
  font-weight: 800;
  color: #1b1b1b;
`;

const ContainerBtn = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const TextoStateInicio = styled.p`
  color: #fc7575;
`;