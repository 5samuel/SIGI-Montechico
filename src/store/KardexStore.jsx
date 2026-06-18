import {create} from "zustand";
import { BuscarKardex, EliminarKardex, InsertarKardex, MostrarKardex } from "../index";
export const useKardexStore = create ((set, get)=>({
    buscador:"",
    setBuscador:(p)=>{
        set({buscador: p});
    },
    datakardex:[],
    kardexItemSelect:[],
    parametros:{},

   mostrarkardex: async (p)=>{

    console.log("PARAMETROS RECIBIDOS:", p);

    const response = await MostrarKardex(p);

    console.log("RESPUESTA MOSTRARKARDEX:", response);

    set({
        parametros:p,
        datakardex: response || [],
        kardexItemSelect: response?.[0] || null
    });

    return response;
},

    selectkardex: async(p)=>{
        
        set({kardexItemSelect :p});
    },

    insertarkardex: async (p)=>{
        await InsertarKardex(p);
        const {mostrarkardex} = get();
        const {parametros} = get();
        set(mostrarkardex(parametros));
    },

    eliminarkardex: async(p)=>{
        await EliminarKardex(p);
        const {mostrarkardex} = get();
        const {parametros} = get();
        set(mostrarkardex(parametros));
    },

    editarkardex: async(p)=>{
        await Editarkardex(p);
        const {mostrarkardex} = get();
        const {parametros} = get();
        set(mostrarkardex(parametros));
    },

    buscarkardex: async(p)=>{
        const response = await BuscarKardex(p);
        set({datakardex:response || []});
        return response || [];
    }


}));