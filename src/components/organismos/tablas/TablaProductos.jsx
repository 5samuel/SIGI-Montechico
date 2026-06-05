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
  Colorcontent,
  ColorcontentTable,
  ContentAccionesTabla,
  Paginacion,
  useProductosStore,
  v,
} from "../../../index";

export function TablaProductos({
  data,
  setopenRegistro,
  setdataSelect,
  setAccion,
}) {

  const [pagina, setPagina] = useState(1);

  const { eliminarproductos } = useProductosStore();

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

        await eliminarproductos({
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
    cell: (info) => <span>{info.getValue()}</span>,
  },
  {
    accessorKey: "stock",
    header: "Stock",
    enableSorting: false,
    cell: (info) => <span>{info.getValue()}</span>,
  },
  {
    accessorKey: "precioventa",
    header: "P.venta",
    enableSorting: false,
    cell: (info) => <span>{info.getValue()}</span>,
  },
  {
    accessorKey: "preciocompra",
    header: "P.compra",
    enableSorting: false,
    cell: (info) => <span>{info.getValue()}</span>,
  },
  {
    accessorKey: "categoria",
    header: "Categoria",
    enableSorting: false,
    cell: (info) => (
      <ColorcontentTable
        $color={info.row.original.color}
        className="contentCategoria"
      >
        {info.getValue()}
      </ColorcontentTable>
    ),
  },
  {
    accessorKey: "marca",
    header: "Marca",
    enableSorting: false,
    cell: (info) => <span>{info.getValue()}</span>,
  },
  {
    id: "acciones",
    header: "Acciones",
    cell: (info) => (
      <div className="ContentCell">
        <ContentAccionesTabla
          funcionEditar={() => editar(info.row.original)}
          funcionEliminar={() => eliminar(info.row.original)}
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
              <span
                className="sortIcon"
                onClick={header.column.getToggleSortingHandler()}
              >
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
      <td colSpan={columns.length}>No hay datos</td>
    </tr>
  ) : (
    table.getRowModel().rows.map((item) => (
      <tr key={item.id}>
        {item.getVisibleCells().map((cell) => (
          <td
            key={cell.id}
            data-title={cell.column.columnDef.header}
          >
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
  position: relative;
  margin: 5% 3%;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: ${v.bpbart}) {
    margin: 2%;
  }

  @media (min-width: ${v.bphomer}) {
    margin: 2em auto;
  }

  .responsive-table {
    width: 100%;
    margin-bottom: 1.5em;
    border-spacing: 0;
    table-layout: fixed;

    @media (min-width: ${v.bpbart}) {
      font-size: 0.9em;
    }

    @media (min-width: ${v.bpmarge}) {
      font-size: 1em;
    }

    thead {
      position: absolute;
      padding: 0;
      border: 0;
      height: 1px;
      width: 1px;
      overflow: hidden;

      @media (min-width: ${v.bpbart}) {
        position: relative;
        height: auto;
        width: auto;
        overflow: auto;
      }

      th {
        border-bottom: 2px solid rgba(115, 115, 115, 0.32);
        font-weight: normal;
        text-align: center;
        color: ${({ theme }) => theme.text};

        &:first-of-type {
          text-align: center;
        }
      }
    }

    tbody,
    tr,
    th,
    td {
      display: block;
      padding: 0;
      text-align: left;
      white-space: normal;
      width: 100%;
      box-sizing: border-box;
    }

    tr {
      width: 100%;
      margin-bottom: 1em;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 10px;
      overflow: hidden;

      @media (min-width: ${v.bpbart}) {
        display: table-row;
        width: auto;
        background: transparent;
      }
    }

    th,
    td {
      padding: 0.5em;
      vertical-align: middle;

      @media (min-width: ${v.bplisa}) {
        padding: 0.75em 0.5em;
      }

      @media (min-width: ${v.bpbart}) {
        display: table-cell;
        padding: 0.5em;
        width: auto;
      }

      @media (min-width: ${v.bpmarge}) {
        padding: 0.75em 0.5em;
      }

      @media (min-width: ${v.bphomer}) {
        padding: 0.75em;
      }
    }

    tbody {
      @media (min-width: ${v.bpbart}) {
        display: table-row-group;
      }

      tr {
        &:last-of-type {
          margin-bottom: 0;
        }

        &:nth-of-type(even) {
          @media (min-width: ${v.bpbart}) {
            background-color: rgba(78, 78, 78, 0.12);
          }
        }
      }

      th[scope="row"] {
        @media (min-width: ${v.bplisa}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
        }

        @media (min-width: ${v.bpbart}) {
          background-color: transparent;
          text-align: center;
          color: ${({ theme }) => theme.text};
        }
      }

      td {
        width: 100%;
        text-align: right;
        word-break: break-word;
        overflow-wrap: break-word;

        @media (min-width: ${v.bpbart}) {
          width: auto;
          text-align: center;
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
        }
      }

      td[data-title]:before {
        content: attr(data-title);
        float: left;
        font-size: 0.8em;
        font-weight: 600;
        max-width: 45%;
        text-align: left;

        @media (min-width: ${v.bplisa}) {
          font-size: 0.9em;
        }

        @media (min-width: ${v.bpbart}) {
          content: none;
        }
      }

      .ContentCell {
        width: 100%;
        text-align: right;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 50px;
        gap: 10px;

        border-bottom: 1px solid rgba(161, 161, 161, 0.32);

        @media (min-width: ${v.bpbart}) {
          width: auto;
          justify-content: center;
          border-bottom: none;
        }
      }
    }
  }
`;