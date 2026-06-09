import styled from "styled-components";
import{Btnfiltro, Btnsave, Buscador, Header, RegistrarMarca, TablaMarca, Tabs, Title, useAuthStore, useMarcaStore} from "../../index";
import{v} from"../../index";
import { useState } from "react";



export function KardexTemplate({data}){
   const [state, setState] = useState(false);
   const [dataSelect, setdataSelect] = useState([]);
   const [accion, setAccion]= useState("");
   const [openRegistro, setopenRegistro] = useState(false);
   const nuevoRegistro =()=>{
    setopenRegistro(!openRegistro);
    setAccion("Nuevo");
    setdataSelect([]);
   }
   const {setBuscador} = useMarcaStore();
    return (
        <Container>
          {
          openRegistro && <RegistrarMarca dataSelect={dataSelect} accion={accion} 
          onClose={()=>setopenRegistro(!openRegistro)}/>
          }
                    
           <header className="header">
            <Header
                stateConfig={{
                    state: state,
                    setState: () => setState(!state)
                }}
                />

           </header>
        <section className="area1">
                <ContentFiltro>
                  <Title>
                    Kardex
                  </Title>
                  <Btnsave bgcolor="#52de65" titulo="+ Entrada"/>
                  <Btnsave bgcolor="#fb6661" titulo="- Salida"/>
                </ContentFiltro>
                
        </section>
          
        <section className="area2">
          <Buscador setBuscador={setBuscador}/>  
        </section>
    
        <section className="main">
          <Tabs/>
        </section>
        </Container>
    )
}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  padding: 15px;

  grid-template-columns: 1fr;

  grid-template-rows:
    100px
    100px
    100px
    1fr;

  grid-template-areas:
    "header"
    "area1"
    "area2"
    "main";

  .header {
    grid-area: header;
   /* background-color: rgba(103, 93, 241, 0.14);*/
    display: flex;
    align-items: center;
  }

  .area1 {
    grid-area: area1;
    /*background-color: rgba(229, 67, 26, 0.14);*/
    display: flex;
    align-items: center;
  }

  .area2 {
    grid-area: area2;
   /* background-color: rgba(77, 237, 106, 0.14);*/
    display: flex;
    align-items: center;
    justify-content:end;
  }

  .main {
    grid-area: main;
   /* background-color: rgba(179, 46, 241, 0.14);*/
    display: flex;
    align-items: flex-start;
  }
`;

const ContentFiltro = styled.div`
display: flex;
flex-wrap:wrap;
justify-content: end;
width:100%;
gap:15px;
`