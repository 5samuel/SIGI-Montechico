import {create} from "zustand";
import { 
    BuscarCategoria, 
    EditarCategoria,
    EliminarCategoria, 
    InsertarCategoria, 
    MostrarCategoria,  
} from "../index";
export const useCategoriaStore = create ((set, get)=>({
   
    buscardor:"",
    setBuscador:(p)=>{
        set({buscador: p});
    },
    datacategoria:[],
    categoriaItemSelect:[],
    parametros:{},

    mostrarcategoria: async (p)=>{
        const response = await MostrarCategoria(p);
        set({parametros:p})
        set({datacategoria:response})
        set({categoriaItemSelect:response[0]})
        return response;
    },

    selectcategoria: async(p)=>{
        set({categoriaItemSelect:p});
    },

    insertarcategoria: async (p)=>{
        await InsertarCategoria(p);
        const {mostrarcategoria} = get();
        const {parametros} = get();
        set(mostrarcategoria(parametros));
    },

    eliminarcategoria: async(p)=>{
        await EliminarCategoria(p);
        const {mostrarcategoria} = get();
        const {parametros} = get();
        set(mostrarcategoria(parametros));
    },

    editarcategoria: async(p)=>{
        await EditarCategoria(p);
        const {mostrarcategoria} = get();
        const {parametros} = get();
        set(mostrarcategoria(parametros));
    },

    buscarcategoria: async(p)=>{
        const response = await BuscarCategoria(p);
        set({datacategoria:response || []});
        return response || [];
    }


}));