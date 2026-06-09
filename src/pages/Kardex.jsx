import { useQuery } from "@tanstack/react-query";

import {
  BloqueoPagina,
  KardexTemplate,
  MarcaTemplate,
  SpinnerLoader,
  useEmpresaStore,
  useMarcaStore,
  useUsuariosStore,
} from "../index";

export function Kardex() {
  const {datapermisos} = useUsuariosStore();
    const statePermiso = datapermisos.some((objeto)=>objeto.modulos.nombre.includes("Marca de productos"))

  const {
    mostrarMarca,
    datamarca,
    buscarMarca,
    buscador,
  } = useMarcaStore();

  const { dataempresa } = useEmpresaStore();

  // MOSTRAR TODAS LAS MARCAS
  const { isLoading, error } = useQuery({

    queryKey: [
      "mostrar marca",
      dataempresa?.id,
    ],

    queryFn: () =>
      mostrarMarca({
        id_empresa: dataempresa?.id,
      }),

    enabled:
      !!dataempresa?.id &&
      buscador === "",

  });

  // BUSCADOR
  useQuery({

    queryKey: [
      "buscar marca",
      buscador,
    ],

    queryFn: () =>
      buscarMarca({
        id_empresa: dataempresa?.id,
        descripcion: buscador,
      }),

    enabled:
      !!dataempresa?.id &&
      buscador !== "",

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
    <KardexTemplate data={datamarca} />
  );
}