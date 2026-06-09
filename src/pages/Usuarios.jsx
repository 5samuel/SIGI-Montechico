import { useQuery } from "@tanstack/react-query";

import {

  UsuariosTemplate,
  SpinnerLoader,
  useEmpresaStore,
  useMarcaStore,
  useUsuariosStore,
  MostrarModulos,
  BloqueoPagina,
} from "../index";

export function Usuarios() {

  const {
    mostrarModulos,
    mostrarusuariosTodos,
    datausuarios,
    buscarusuarios,
    buscador,
    datapermisos

  } = useUsuariosStore();
const statePermiso = datapermisos.some((objeto)=>objeto.modulos.nombre.includes("Personal"))
const { dataempresa } = useEmpresaStore();

  // MOSTRAR TODAS LAS MARCAS
  const { isLoading, error } = useQuery({

    queryKey: [ "mostrar usuarios", {_id_empresa:dataempresa?.id}],
    queryFn: () =>mostrarusuariosTodos({  _id_empresa: dataempresa?.id,}),
    enabled: !!dataempresa?.id && buscador === "",
  });

  // BUSCADOR
  useQuery({queryKey: ["buscar usuarios",{_id_empresa:dataempresa.id,buscador:buscador},],

    queryFn: () =>
      buscarusuarios({ _id_empresa: dataempresa?.id, buscador: buscador }),
      enabled:!!dataempresa?.id && buscador !== "",
     });


  const { data: datamodulos } = useQuery({
    queryKey: ["mostrar modulos"],
    queryFn: mostrarModulos,
  });

if(statePermiso==false){
    return <BloqueoPagina />
  }
 
  
  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (error) {
    return <span>Error...</span>;
  }

  return (
    <UsuariosTemplate data={ datausuarios} />
  );
}