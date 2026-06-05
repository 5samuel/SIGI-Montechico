import { ObtenerIdAuthSupabase } from "./globalSupabase";
import { supabase } from "./supabase.config"
import Swal from "sweetalert2";


// funcion para mostrar usuarios
export const MostrarEmpresa = async (p) => {
  const { error, data } = await supabase
    .from("asignarempresa")
    .select(`empresa(id,nombre,simbolomoneda)`)
    .eq("id_usuario", p.idusuario)
    .maybeSingle();

  if (error) {
    console.log("Error:", error);
    return null; 
  }

  return data || null; 
};

export const contarUsuariosRPC = async (p) => {
  const { data, error } = await supabase.rpc(
    "contar_usuario_por_empresa",
    { _id_empresa: p.id_empresa }
  );

  if (error) {
    console.error(error);
    return 0;
  }

  return data;
};