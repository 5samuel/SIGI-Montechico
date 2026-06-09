import { useQuery } from "@tanstack/react-query";
import {
  BloqueoPagina,
  CategoriaTemplate,
  SpinnerLoader,
  useCategoriaStore,
  useEmpresaStore,
  useUsuariosStore,
 
} from "../index";

export function Categorias() {
  const {datapermisos} = useUsuariosStore();
  const statePermiso = datapermisos.some((objeto)=>objeto.modulos.nombre.includes("Categoria de productos"))
  
  const { mostrarcategoria, datacategoria, buscarcategoria, buscador } = useCategoriaStore();
  const { dataempresa } = useEmpresaStore();
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar categoria", { id_empresa: dataempresa?.id }],
    queryFn: () => mostrarcategoria({ id_empresa: dataempresa?.id }),
    enabled: dataempresa?.id != null,
  });
  const { data: buscardata } = useQuery({
    queryKey: [
      "buscar categoria",
      { id_empresa: dataempresa.id, descripcion: buscador },
    ],
    queryFn: () =>
      buscarcategoria({ id_empresa: dataempresa.id, descripcion: buscador }),
    enabled: dataempresa.id != null,
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

  return <CategoriaTemplate data={datacategoria}/>;
}