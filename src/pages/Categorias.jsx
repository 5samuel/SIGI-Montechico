import { useQuery } from "@tanstack/react-query";
import {
  CategoriaTemplate,
  SpinnerLoader,
  useCategoriaStore,
  useEmpresaStore,
 
} from "../index";

export function Categorias() {
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
  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <span>Error...</span>;
  }

  return <CategoriaTemplate data={datacategoria}/>;
}