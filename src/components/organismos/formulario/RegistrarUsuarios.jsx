import { useEffect, useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { InputText, Btnsave, ConvertirCapitalize, useProductosStore, ContainerSelector, Selector, useMarcaStore, Btnfiltro, RegistrarMarca, ListaGenerica, useCategoriaStore, RegistrarCategoria, TipoDocData, TipouserData, ListaModulo, useUsuariosStore} from "../../../index";
import { useForm } from "react-hook-form";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import {Device} from "../../../styles/breackpoints";
import { useQuery } from "@tanstack/react-query";


export function RegistrarUsuarios({ onClose, dataSelect, accion }) {
  const {isLoading} =useQuery({queryKey:["mostrar permisos editar",{id_usuario:dataSelect.id}],
  queryFn:()=>mostrarpermisosEdit({id_usuario:dataSelect.id})})
  const [checkboxs, setCheckboxs]=useState([]);
  const [tipodoc, setTipodoc] = useState({icono:"", descripcion:"otros"});
  const [tipouser, setTipouser]= useState({icono:"", descripcion:"empleado"})
  const { insertarusuarios, editarusuarios,mostrarpermisosEdit } = useUsuariosStore();
  const { dataempresa } = useEmpresaStore();
  const {marcaItemSelect, datamarca, selectMarca}= useMarcaStore();
  const {categoriaItemSelect,datacategoria,selectcategoria } = useCategoriaStore();
  const [stateTipodoc, setStateTipodoc] =useState(false);
  const [stateTipouser, setStateTipouser] = useState(false);
  const [openRegistroMarca, SetopenRegistroMarca] = useState(false);
  const [openRegistroCategoria, SetopenRegistroCategoria] = useState(false);
  const [subaccion, setAccion] = useState("");

  const nuevoRegistroMarca = ()=>{
    SetopenRegistroMarca(!openRegistroMarca);
    setAccion("Nuevo")
  }

   const nuevoRegistroCategoria = () => {
    SetopenRegistroCategoria(!openRegistroCategoria);
    setAccion("Nuevo");
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // funcion insertar
async function insertar(data) {
  if (accion === "Editar") {

    const p = {
          nombres: data.nombres,
          nro_doc: data.nrodoc,
          telefono: data.telefono,
          direccion:data.direccion,
          tipouser: tipouser.descripcion,
          tipodoc: tipodoc.descripcion,
          id_empresa:dataempresa.id,

    };
   
    await editarusuarios(p);
    onClose();

  } else {

    const p = {
      nombres: data.nombres,
      correo:data.correo,
      nro_doc: data.nrodoc,
      telefono: data.telefono,
      direccion:data.direccion,
      tipouser: tipouser.descripcion,
      tipodoc: tipodoc.descripcion,
      id_empresa:dataempresa.id,


    };
    const parametrosAuth={
      correo:data.correo,
      pass:data.pass
    }

    await insertarusuarios(parametrosAuth,p,checkboxs);
    onClose();

  }

}
  useEffect(() => {
    if (accion === "Editar") {
      selectMarca({id:dataSelect.idmarca,descripcion:dataSelect.marca})
      selectcategoria({id:dataSelect.id_categoria, descripcion:dataSelect.categoria})
    }
  }, []);
  if(isLoading){
    return <span>Cargando...</span>
  }
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion == "Editar" ? "Editar Usuarios" : "Registrar nuevos Usuarios"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

          {/*formulario de nombre */}
        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section className="seccion1">
            <article>
              <InputText icono={<v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.correo}
                  type="text"
                  placeholder=""
                  {...register("correo", {
                    required: true,
                  })}
                />
                <label className="form__label">Correo</label>
                {errors.correo?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

            {/*article de contrase;a */}
          <article>
              <InputText icono={<v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.pass}
                  type="text"
                  placeholder=""
                  {...register("pass", {
                    required: true,
                  })}
                />
                <label className="form__label">pass</label>
                {errors.pass?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
                  {/*article nombre */}
             <article>
              <InputText icono={<v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.nombre}
                  type="text"
                  placeholder=""
                  {...register("nombres", {
                    required: true,
                  })}
                />
                <label className="form__label">Nombres</label>
                {errors.nombres?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            
            <ContainerSelector>
                 <label>Tipo doc: </label>
              <Selector
                color="#fc6027"
                texto1="🎴"
                texto2={tipodoc.descripcion}
                funcion={() => setStateTipodoc(!stateTipodoc)}
              /> 
               {stateTipodoc && (
                <ListaGenerica
                  data={TipoDocData}
                  bottom="-260px"
                  scroll="scroll"
                  setState={() => setStateTipodoc(!stateTipodoc)}
                  funcion={(p) => setTipodoc(p)}
                />
              )}

            </ContainerSelector>
          
          {/*article de numero de documento */}
           <article>
              <InputText icono={<v.iconostock />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.nro_doc}
                  type="number"
                  placeholder=""
                  {...register("nrodoc", {
                    required: true,
                  })}
                />
                <label className="form__label">Nro. doc</label>

                {errors.nrodoc?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

            {/*article de numero de telefono */}
             <article>
              <InputText icono={<v.iconostockminimo />}>
                <input
                  step="0.01"
                  className="form__field"
                  defaultValue={dataSelect.telefono}
                  type="text"
                  placeholder=""
                  {...register("telefono", {
                    required: true,
                  })}
                />
                <label className="form__label">Telefono</label>

                {errors.telefono?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

             {/* article de direccion */}
              <article>
              <InputText icono={<v.iconocodigobarras />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.direccion}
                  type="text"
                  placeholder=""
                  {...register("direccion", {
                    required: true,
                  })}
                />
                <label className="form__label">Direccion</label>

                {errors.direccion?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>

          </section>
          {/*segunda seccion */}
          <section className="seccion2">
              <ContainerSelector>
              <label>Tipo: </label>
              <Selector
                color="#fc6027"
                texto1="👷‍♂️"
                texto2={tipouser.descripcion}
                funcion={() => setStateTipouser(!stateTipouser)}
              />

              {stateTipouser && (
                <ListaGenerica
                  data={TipouserData}
                  funcion={(p) => setTipouser(p)}
                  bottom="-150px"
                  scroll="scroll"
                  setState={() => setStateTipouser(!stateTipouser)}
                />
              )}
              </ContainerSelector>
              PERMISOS:🔑
              <ListaModulo accion={accion} checkboxs={checkboxs} setCheckboxs={setCheckboxs}/>
          </section>

          <div className="btnguardarContent">
              <Btnsave
                icono={<v.iconoguardar />}
                titulo="Guardar"
                bgcolor="#ef552b"
              />
            </div>
        </form>
        

        
      </div>
    </Container>
  );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    width:100%;
    max-width: 90%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    height:90vh;
    overflow-y: auto;
    overflow-x:hidden;
    &:: -webkit-scrollbar{
      width:6px;
      border-radius: 10px;
    }

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
        display: grid;
        grid-template-columns: 1fr;
        gap:15px;
        @media ${Device.tablet}{
          grid-template-columns: repeat(2, 1fr);
        }
        section {
          gap: 20px;
          display: flex;
          flex-direction: column;
          
        }
        .btnguardarContent{
          display:flex;
          justify-content:end;
          grip-column:1;
          @media ${ Device.tablet}{
            grid-column:2;
          }
        }
    }
  }
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  svg {
    font-size: 25px;
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    padding: 2px;
    width: 40px;
    font-size: 28px;
  }
`;
const ContainerEmojiPicker = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;