import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Btnsave,
  useUsuariosStore
} from "../../../index";
import { useForm } from "react-hook-form";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function RegistrarAdmin({ setState }) {
  const { insertarUsuarioAdmin } = useUsuariosStore();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // ✅ función correcta
  const mutation = useMutation({
    mutationFn: async (data) => {
      const p = {
        correo: data.correo,
        pass: data.pass,
        tipouser: "Admin",
      };

      const dt = await insertarUsuarioAdmin(p);

      console.log("respuesta insert:", dt); 

      if (dt) {
        navigate("/");
      } else {
        console.error("No se insertó el usuario");
      }
    },
  });

  return (
    <Container>
      <ContentClose>
        <span onClick={() => setState(false)}>x</span>
      </ContentClose>

      <section className="subcontainer">
        <div className="headers">
          <section>
            <h1>Registrar usuario</h1>
          </section>
        </div>

        <form
          className="formulario"
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
        >
          <section>
            <article>
              <InputText icono={<MdAlternateEmail />}>
                <input
                  className="form__field"
                  type="text"
                  placeholder="correo"
                  {...register("correo", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                  })}
                />
                <label className="form__label">email</label>

                {errors.correo?.type === "pattern" && (
                  <p>Email inválido</p>
                )}
                {errors.correo && <p>Campo requerido</p>}
              </InputText>
            </article>

            <article>
              <InputText icono={<RiLockPasswordLine />}>
                <input
                  className="form__field"
                  type="password"
                  placeholder="password"
                  {...register("pass", {
                    required: true,
                  })}
                />
                <label className="form__label">password</label>

                {errors.pass && <p>Campo requerido</p>}
              </InputText>
            </article>

            <div className="btnguardarContent">
              <Btnsave
                icono={<v.iconoguardar />}
                titulo="Guardar"
                bgcolor="#ff7556"
                funcion={handleSubmit((data) => mutation.mutate(data))} // ✅ CLAVE
              />
            </div>
          </section>
        </form>
      </section>
    </Container>
  );
}
const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  border-radius: 20px;
  background: #fff;
  box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
  padding: 13px 36px 20px 36px;
  z-index: 100;
  display:flex;
  align-items:center;

  .subcontainer{
    width: 100%;
  }
`;

const ContentClose =styled.div`
  position:absolute;
  top:0;
  right:0;
  font-size:33px;
  margin:30px;
  cursor: pointer;
  
  
`