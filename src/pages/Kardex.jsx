import { useQuery } from "@tanstack/react-query";

import {
  BloqueoPagina,
  KardexTemplate,
  MarcaTemplate,
  SpinnerLoader,
  useEmpresaStore,
  useKardexStore,
  useMarcaStore,
  useProductosStore,
  useUsuariosStore,
} from "../index";

export function Kardex() {
  const {buscarproductos} = useProductosStore();
  const {datapermisos} = useUsuariosStore();
  const statePermiso = datapermisos.some((objeto)=>objeto.modulos.nombre.includes("Marca de productos"))

  const {
    mostrarkardex,
    datakardex,
    buscarkardex,
    buscador,
     
  } = useKardexStore();

  const { dataempresa } = useEmpresaStore();

  // MOSTRAR TODAS LAS MARCAS
  const { isLoading, error } = useQuery({

    queryKey: [ "mostrar kardex",{_id_empresa:dataempresa?.id}],
    queryFn: () =>mostrarkardex({_id_empresa: dataempresa?.id, }),
    enabled:!!dataempresa?.id && buscador === "",

  });

  // BUSCADOR
 const { data: buscardata } = useQuery({
    queryKey: ["buscar productos", {id_empresa:dataempresa?.id,descripcion:buscador} ],
    queryFn: () => buscarproductos({_id_empresa: dataempresa?.id, buscador:buscador}),
    enabled: !!dataempresa?.id && buscador !== undefined,
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
    <KardexTemplate data={datakardex} />
  );
}