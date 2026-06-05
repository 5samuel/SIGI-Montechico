import { create } from "zustand";
import {  MostrarEmpresa, supabase, contarUsuariosRPC } from "../index";

export const useEmpresaStore = create((set, get) => ({
  contadorusuario:0,
 dataempresa:{},
 
  mostrarEmpresa: async (p) => {
    const response = await MostrarEmpresa(p);
    set({ dataempresa: response.empresa});
    return response.empresa;
    
  },

  contarUsuariosRPC:async(p)=>{
    const response = await contarUsuariosRPC(p);
    set ({contadorusuario:response});
    return response;
  }
 
}));