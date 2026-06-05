import {supabase} from"../index"
import Swal from "sweetalert2"
export async function InsertarCategoria(p) {
    
    const {error}= await supabase.rpc("insertarcategoria",p)
    if(error){
        Swal.fire({
            icon:"error",
            title:"Ooop...",
            text: error.message,
            footer: '<a href=""> agregue una nueva descripcion</a>',
        });
    }
}

// funcion mostrar Categorias
export async function MostrarCategoria(p){
    const {data}= await supabase
    .from("categoria")
    .select()
    .eq("id_empresa", p.id_empresa)
    .order("id", {ascending: true});
    return data;
}

//funcion eliminar Categorias

export async function EliminarCategoria(p) {

    const {error} = await supabase
    .from("categoria")
    .delete()
    .eq("id", p.id);
 if (error){
    alert("Error al eliminar ", error.message);
 }
    
}

export async function EditarCategoria(p) {

    const {error} = await supabase
    .from("categoria")
    .update(p)
    .eq("id", p.id);
 if(error){
    alert("Error al editar Categoria", error.message);
 }
    
}

export async function BuscarCategoria(p){
    const {data}= await supabase
    .from("categoria")
    .select()
    .eq("id_empresa", p.id_empresa)
    .ilike("descripcion", "%"+p.descripcion+"%")
    return data;
}
