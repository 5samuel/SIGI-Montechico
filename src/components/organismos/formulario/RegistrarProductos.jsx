import { useEffect, useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { InputText, Btnsave, ConvertirCapitalize, useProductosStore, ContainerSelector, Selector, useMarcaStore, Btnfiltro, RegistrarMarca, ListaGenerica, useCategoriaStore, RegistrarCategoria} from "../../../index";
import { useForm } from "react-hook-form";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import {Device} from "../../../styles/breackpoints";


export function RegistrarProductos({ onClose, dataSelect, accion }) {
  const { insertarproductos, editarproductos } = useProductosStore();
  const { dataempresa } = useEmpresaStore();
  const {marcaItemSelect, datamarca, selectMarca}= useMarcaStore();
  const {categoriaItemSelect,datacategoria,selectcategoria } = useCategoriaStore();
  const [stateMarca, setStateMarca] =useState(false);
  const [stateCategoria, setStateCategoria] = useState(false);
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

  console.log("ACCION:", accion);

  if (accion?.toLowerCase() === "editar") {

    const p = {
        id: dataSelect.id,
        descripcion: ConvertirCapitalize(data.descripcion),
        idmarca: marcaItemSelect.id,
        stock: parseFloat(data.stock),
        stock_minimo: parseFloat(data.codigointerno),
        codigobarra: parseFloat(data.codigobarra),
        codigointerno: data.codigointerno,
        precioventa: parseFloat(data.precioventa),
        preciocompra: parseFloat(data.preciocompra),
        id_categoria: categoriaItemSelect.id,
        id_empresa:dataempresa.id,

    };
   
    await editarproductos(p);
    onClose();

  } else {

    const p = {
      _descripcion: ConvertirCapitalize(data.descripcion),
      _idmarca: marcaItemSelect.id,
      _stock: parseFloat(data.stock),
      _stock_minimo: parseFloat(data.stockminimo),
      _codigobarra: parseFloat(data.codigobarra),
      _codigointerno: data.codigointerno,
      _precioventa: parseFloat(data.precioventa),
      _preciocompra: parseFloat(data.preciocompra),
      _id_categoria: categoriaItemSelect.id,
      _id_empresa: dataempresa.id,

    };

    console.log("INSERTANDO:", p);
    await insertarproductos(p);
    onClose();

  }

}
  useEffect(() => {
    if (accion === "Editar") {
      selectMarca({id:dataSelect.idmarca,descripcion:dataSelect.marca})
      selectcategoria({id:dataSelect.id_categoria, descripcion:dataSelect.categoria})
    }
  }, []);
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion == "Editar" ? "Editar productos" : "Registrar nuevos productos"}
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
                  defaultValue={dataSelect.descripcion}
                  type="text"
                  placeholder=""
                  {...register("descripcion", {
                    required: true,
                  })}
                />
                <label className="form__label">descripcion</label>
                {errors.nombre?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <ContainerSelector>
              <label>Marca: </label>
              <Selector funcion={()=>setStateMarca(!stateMarca)}
              state={stateMarca}
              color="#fc6027" 
              texto1="🍿" 
              texto2={marcaItemSelect?.descripcion}/>

              {stateMarca && (
                <ListaGenerica 
                  setState={()=>setStateMarca(!stateMarca)}
                  bottom="-260px" scroll="scroll" data={datamarca}
                  funcion={selectMarca}
              />
              )}

              <Btnfiltro bgcolor="#f6f3f3" textcolor="#353535" 
              funcion={nuevoRegistroMarca}
              icono={<v.agregar/>}/>
            </ContainerSelector>

             {/*input de stock */}
            <article>
              <InputText icono={<v.iconostock />}>
                <input
                  className="form__field"
                  type="number"
                  step="0.1"
                  placeholder=""
                  defaultValue={dataSelect.stock}
                  {...register("stock", {
                    required: true,
                  })}
                />
                <label className="form__label">Stock</label>
                {errors.stock?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

            {/*input para stock minimo  */}
            <article>
              <InputText icono={<v.iconostockminimo />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.stock_minimo}
                  type="number"
                  step="0.1"
                  placeholder=""
                  
                  {...register("stockminimo", {
                    required: true,
                  })}
                />
                <label className="form__label">Stock minimo</label>
                {errors.stock?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

             <ContainerSelector>
              <label>Categoria: </label>
              <Selector
                funcion={() => setStateCategoria(!stateCategoria)}
                state={stateCategoria}
                color="#fc6027"
                texto1="🍿"
                texto2={categoriaItemSelect?.descripcion}
              />
              <Btnfiltro
                bgcolor="#f6f3f3"
                funcion={nuevoRegistroCategoria}
                textcolor="#353535"
                icono={<v.agregar />}
              />
              {stateCategoria && (
                <ListaGenerica
                  setState={() => setStateCategoria(!stateCategoria)}
                  bottom="-260px"
                  scroll="scroll"
                  data={datacategoria}
                  funcion={selectcategoria}
                />
              )}
            </ContainerSelector>

            
          </section>

          <section className="seccion2">
            {/*article codigo de barra  */}
            <article>
              <InputText icono={<v.iconocodigobarras />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.codigobarra}
                  type="number"
                  placeholder=""
                  {...register("codigobarra", {
                    required: true,
                  })}
                />
                <label className="form__label">Codigo de barras</label>
                {errors.codigobarra?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            
             {/*article codigo interno */}
            <article>
              <InputText icono={<v.iconocodigointerno />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.codigointerno}
                  type="text"
                  placeholder=""
                  {...register("codigointerno", {
                    required: true,
                  })}
                />
                <label className="form__label">Codigo interno</label>

                {errors.codigointerno?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>

            {/*article precio de venta*/}
            <article>
              <InputText icono={<v.iconoprecioventa />}>
                <input
                  step="0.01"
                  className="form__field"
                  defaultValue={dataSelect.precioventa}
                  type="number"
                  placeholder=""
                  {...register("precioventa", {
                    required: true,
                  })}
                />
                <label className="form__label">Precio de venta</label>

                {errors.precioventa?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>

            {/* article de precio de compra */}
            <article>
              <InputText icono={<v.iconopreciocompra />}>
                <input
                  step="0.01"
                  className="form__field"
                  defaultValue={dataSelect.preciocompra}
                  type="number"
                  placeholder=""
                  {...register("preciocompra", {
                    required: true,
                  })}
                />
                <label className="form__label">Precio de compra</label>

                {errors.preciocompra?.type === "required" && (
                  <p>Campo requerido</p>
                )}
              </InputText>
            </article>
          </section>

          <div className="btnguardarContent">
              <Btnsave
                icono={<v.iconoguardar />}
                titulo="Guardar"
                bgcolor="#ef552b"
              />
            </div>
        </form>
        {
          openRegistroMarca && (<RegistrarMarca accion={subaccion}  onClose={()=>SetopenRegistroMarca(!openRegistroMarca)} dataSelect={dataSelect}/>)
        }

        {
          openRegistroCategoria && (
          <RegistrarCategoria 
            accion={subaccion}
            onClose={()=>SetopenRegistroCategoria(!openRegistroCategoria)}
            dataSelect={dataSelect}
          />)
        }
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