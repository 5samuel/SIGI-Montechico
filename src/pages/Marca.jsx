import { useQuery } from "@tanstack/react-query";

import {
  MarcaTemplate,
  SpinnerLoader,
  useEmpresaStore,
  useMarcaStore,
} from "../index";

export function Marca() {

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

  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (error) {
    return <span>Error...</span>;
  }

  return (
    <MarcaTemplate data={datamarca} />
  );
}