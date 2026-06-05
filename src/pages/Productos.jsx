import { useQuery } from "@tanstack/react-query";
import {
  ProductosTemplate,
  SpinnerLoader,
  useCategoriaStore,
  useEmpresaStore,
  useMarcaStore,
  useProductosStore,
} from "../index";

export function Productos() {
  const { mostrarMarca } = useMarcaStore();
  const { mostrarcategoria } = useCategoriaStore();
  const {
    mostrarproductos,
    dataproductos,
    buscarproductos,
    buscador,
  } = useProductosStore();

  const { dataempresa } = useEmpresaStore();

  // Mostrar productos
  const { isLoading, error } = useQuery({   
    queryKey: ["mostrar productos", {_id_empresa:dataempresa?.id}],
    queryFn: () => mostrarproductos({ _id_empresa: dataempresa?.id,
      }),
    enabled: !!dataempresa?.id,
  });

  // Buscar productos
  const { data: buscardata } = useQuery({
    queryKey: ["buscar productos", {id_empresa:dataempresa?.id,descripcion:buscador} ],
    queryFn: () => buscarproductos({_id_empresa: dataempresa?.id, buscador:buscador}),
    enabled: !!dataempresa?.id && buscador !== undefined,
  });

  // Mostrar marcas
  const { data: datamarcas } = useQuery({
    queryKey: ["mostrar marca", dataempresa?.id],
    queryFn: () =>
      mostrarMarca({
        id_empresa: dataempresa?.id,
      }),
    enabled: !!dataempresa?.id,
  });

  // Mostrar categorías
  const { data: datacategoria } = useQuery({
    queryKey: ["mostrar categorias", dataempresa?.id],
    queryFn: () =>
      mostrarcategoria({
        id_empresa: dataempresa?.id,
      }),
    enabled: !!dataempresa?.id,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (error) {
    console.error(error);
    return <span>Error al cargar los datos.</span>;
  }

  return <ProductosTemplate data={dataproductos} />;
}