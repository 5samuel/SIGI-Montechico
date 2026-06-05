import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { FaArrowsAltV } from "react-icons/fa";

import {
  ContentAccionesTabla,
  Paginacion,
  useMarcaStore,
  v,
} from "../../../index";

export function TablaMarca({
  data,
  setopenRegistro,
  setdataSelect,
  setAccion,
}) {

  const [pagina, setPagina] = useState(1);

  const { eliminarMarca } = useMarcaStore();

  // =========================
  // FUNCION EDITAR
  // =========================
  const editar = (data) => {

    if (data.descripcion === "Generica") {

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Este registro no se permite modificar ya que es valor por defecto.",
      });

      return;
    }

    setopenRegistro(true);
    setdataSelect(data);
    setAccion("Editar");
  };

  // =========================
  // FUNCION ELIMINAR
  // =========================
  const eliminar = (p) => {

    if (!p) {
      console.error("Registro indefinido");
      return;
    }

    if (p.descripcion === "Generica") {

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Este registro no se permite eliminar ya que es valor por defecto.",
      });

      return;
    }

    Swal.fire({
      title: "¿Estás seguro(a)?",
      text: "Una vez eliminado, no podrá recuperar este registro!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async (result) => {

      if (result.isConfirmed) {

        await eliminarMarca({
          id: p.id,
        });

      }

    });

  };

  // =========================
  // COLUMNAS
  // =========================
  const columns = [

    {
      accessorKey: "descripcion",
      header: "Descripcion",
      cell: (info) => (
        <div className="descripcionCell">
          {info.getValue()}
        </div>
      ),
    },

    {
      id: "acciones",
      header: "",
      cell: (info) => (

        <div className="ContentCell">
          <ContentAccionesTabla
            funcionEditar={() =>
              editar(info.row.original)
            }
            funcionEliminar={() =>
              eliminar(info.row.original)
            }
          />
        </div>

      ),
    },

  ];

 
  // TABLA
  const table = useReactTable({

    data: data || [],
    columns,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

  });

  return (

    <Container>

      <table className="responsive-table">

        <thead>

          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div className="headerContent">
                    {header.column.columnDef.header}
                    {header.column.getCanSort() && (

                      <span className="sortIcon" 
                      onClick={header.column.getToggleSortingHandler()}>
                        <FaArrowsAltV />
                      </span>

                    )}

                    {{
                      asc: "⬆️",
                      desc: "⬇️",
                    }[header.column.getIsSorted()]}

                  </div>

                </th>

              ))}

            </tr>

          ))}

        </thead>

        <tbody>

          {table.getRowModel().rows.length === 0 ? (

            <tr>

              <td colSpan={2}>
                No hay datos
              </td>

            </tr>

          ) : (

            table.getRowModel().rows.map((item) => (

              <tr key={item.id}>

                {item.getVisibleCells().map((cell) => (

                  <td key={cell.id}>

                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}

                  </td>

                ))}

              </tr>

            ))

          )}

        </tbody>

      </table>

      <div className="paginacionContent">

        <Paginacion
          table={table}
          irinicio={() => table.setPageIndex(0)}
          pagina={table.getState().pagination.pageIndex + 1}
          setPagina={setPagina}
          maximo={table.getPageCount()}
        />

      </div>

    </Container>

  );
}

const Container = styled.div`

  width: 100%;
  padding: 10px;
  overflow-x: hidden;

  .responsive-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 10px;

    thead {
      background-color: rgba(115,115,115,0.08);
      th {

        font-size: 15px;
        font-weight: 700;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        color: #bcbcbc;
        padding: 18px;
        background: rgba(255,255,255,0.03);
      }

    }

  tbody {
      tr {
        background: rgba(255,255,255,0.02);
        transition: 0.3s ease;
        border-radius: 12px;
        &:hover {
          background: rgba(255,255,255,0.05);
          transform: scale(1.003);
        }
  }

      td {

        padding: 18px;
        font-size: 15px;
        font-weight: 500;
        letter-spacing: 0.3px;
        color: #f5f5f5;
        border-top: 1px solid rgba(255,255,255,0.03);
        border-bottom: 1px solid rgba(255,255,255,0.03);

      }

    }

  }

  .ContentCell {

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

  }

  @media (max-width: 768px) {

    .responsive-table {

      font-size: 12px;

      th,
      td {

        padding: 8px;

      }

    }

    .ContentCell {

      flex-direction: row;
      gap: 5px;

    }

  }

`;