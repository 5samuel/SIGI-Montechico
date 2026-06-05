import { useQuery } from "@tanstack/react-query";
import { HomeTemplate, useEmpresaStore } from "../index";

export function Home() {

  const { contarUsuariosRPC, dataempresa } = useEmpresaStore();

  const { data } = useQuery({
    queryKey: [
      "contar usuarios por empresa",
      { idempresa: dataempresa?.id }
    ],

    queryFn: () =>
      contarUsuariosRPC({
        id_empresa: dataempresa?.id
      }),
    enabled: !!dataempresa?.id
  });

  return <HomeTemplate />;
}