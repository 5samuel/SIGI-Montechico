import {create} from "zustand";
import { InsertarKardex, MostrarKardex } from "../index";
export const useKardexStore = create ((set, get)=>({
    buscardor:"",
    setBuscador:(p)=>{
        set({buscador: p});
    },
    datakardex:[],
    kardexItemSelect:[],
    parametros:{},

    mostrarkardex: async (p)=>{
        const response = await MostrarKardex(p);
        set({parametros:p})
        set({datakardex:response})
        set({kardexItemSelect:response[0]})
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
        await Eliminarkardex(p);
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
        const response = await Buscarkardex(p);
        set({datakardex:response || []});
        return response || [];
    }


}));