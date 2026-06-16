import styled from "styled-components";
import{Btnfiltro, Btnsave, Buscador, Header, RegistrarKardex, RegistrarMarca, TablaMarca, Tabs, Title, useAuthStore, useMarcaStore} from "../../index";
import{v} from"../../index";
import { useState } from "react";



export function KardexTemplate({data}){
   const [state, setState] = useState(false);
   const [dataSelect, setdataSelect] = useState([]);
   const [accion, setAccion]= useState("");
   const [openRegistro, setopenRegistro] = useState(false);
   const [tipo, setTipo] = useState("")

   const nuevaentrada =()=>{
    setopenRegistro(true);
    setTipo("entrada")
   }

    const nuevasalida =()=>{
    setopenRegistro(true);
    setTipo("salida");
   }
   
   const {setBuscador} = useMarcaStore();
    return (
        <Container>
          {
          openRegistro && <RegistrarKardex tipo={tipo}  dataSelect={dataSelect} accion={accion} 
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
                  <div  className="Title">
                    <Title>
                      Kardex
                    </Title>
                  </div>
                  <Btnsave bgcolor="#52de65" titulo="+ Entrada" funcion={nuevaentrada}/>
                  <Btnsave bgcolor="#fb6661" titulo="- Salida" funcion={nuevasalida}/>
                </ContentFiltro>
                
        </section>
          
        <section className="area2">
          <Buscador setBuscador={setBuscador}/>  
        </section>
    
        <section className="main">
          <Tabs data={data}/>
        </section>
        </Container>
    )
}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;

  background-color:${(props)=>props.theme.bgtotal};
  color:${({theme})=>theme.text};

  display:grid;

  padding:15px;
  box-sizing:border-box;

  grid-template-columns: minmax(0,1fr);

  grid-template-rows:
    auto
    auto
    auto
    1fr;

  grid-template-areas:
    "header"
    "area1"
    "area2"
    "main";

.header{
 grid-area:header;
 display:flex;
 align-items:center;
 min-width:0;
}

.area1{
 grid-area:area1;
 display:flex;
 align-items:center;
 min-width:0;
}

.area2{
 grid-area:area2;
 display:flex;
 justify-content:end;
 min-width:0;
}

.main{
 grid-area:main;

 display:flex;

 width:100%;
 max-width:100%;

 min-width:0;

 overflow-x:auto;
}
`;

const ContentFiltro = styled.div`
display:flex;

align-items:center;

flex-wrap:wrap;

width:100%;

gap:12px;

.Title{
 margin-right:auto;
}

@media(max-width:768px){

justify-content:center;

.Title{
   width:100%;
   text-align:center;
   margin-right:0;
}

}

`;