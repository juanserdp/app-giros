// HOOKS
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSesionContext } from "../../providers/SesionProvider";
// ICONOS
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import DescriptionIcon from "@mui/icons-material/Description";
// COMPONENTES
import { CustomToolbar } from "../toolbar/CustomToolbar";
import { CustomNoRowsOverlay } from "../toolbar/CustomNoRowsOverlay";
import { GridColumnMenu } from "../toolbar/GridColumnMenu";
import { CircularProgressAnimation } from "../CircularProgressAnimation";
import { DataGrid, GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";
import { LinearProgress } from "@mui/material";
// UTILIDADES
import { dobleConfirmacionEliminacion } from "../../util/dobleConfirmacionEliminacion";
import { generarFactura } from "../../util/generarFactura";
import { handleError } from "../../util/handleError";
import { currencyFormatter } from "../../util/currencyFormatter";
import { descargar } from "../../util/descargar";
import { transformarImagenABinaryString } from "../../util/transformarImagenABinaryString";
import swal from "sweetalert";

export function TablaGiros({
  giros,
  refetch,
  loading,
  handleShow,
  eliminar,
  editarGiro,
  editarGiroInfo,
}) {
  // CONSTANTES
  const navegarTo = "/enviar-giro";

  // HOOKS
  const { sesionData: { rol } } = useSesionContext();
  const apiRef = useGridApiRef();
  const navigate = useNavigate();

  // FUNCIONES
  const estadoStyle = (params) => {
    const color = (params.value === "PENDIENTE") ? "red" :
      ((params.value === "EN PROCESO") ? "blue" : "green");
    const styleSpan = {
      color: color,
      borderRadius: "5px",
      padding: "2px 10px",
      border: `2px solid ${color}`,
    };
    return <span
      style={styleSpan}>
      {params.value}
    </span>
  };

  const editarComprobante = async (id) => {
    transformarImagenABinaryString(id, async (binaryString) => {
      await editarGiro({
        variables: {
          id,
          giro: {
            comprobantePago: binaryString,
          },
        },
        onCompleted: () => {
          refetch();
          swal("Editado!", "El comprobante ha sido subido.", "success");
        },
        onError: ({ graphQLErrors, networkError }) =>
          handleError({ graphQLErrors, networkError }),
      });
    });
  };

  const generar = (giro) => {
    const factura = generarFactura(giro);
    const blob = new Blob([factura], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.target = "_blank";
    a.onload = function () {
      URL.revokeObjectURL(this.href);
    };
    a.click();
  };

  const acciones = (params) => [
    (rol === "USUARIO" || rol === "OPERARIO") ? <></> : (
      <GridActionsCellItem icon={<DeleteIcon />} onClick={() => handlerEliminar(params.id)} label="Eliminar" />
    ),
    <GridActionsCellItem icon={<EditIcon />} onClick={() => {
      navigate(`/giros/usuario/${params.row.usuario}/editar/${params.id}`);
      handleShow();
    }} label="Editar" />,
    (rol === "USUARIO") ? <></> : (
      <GridActionsCellItem icon={<UploadIcon />} onClick={() => editarComprobante(params.id)} label="Cargar comprobante" showInMenu />
    ),
    <GridActionsCellItem icon={<DownloadIcon />} disabled={params.row.comprobantePago ? false : true} onClick={() => handleDescargarComprobante(params.row.comprobantePago)} label="Descargar comprobante" showInMenu />,
    <GridActionsCellItem icon={<DescriptionIcon />} disabled={params.row.estadoGiro === "COMPLETADO" ? false : true} onClick={() => generar(params.row)} label="Generar factura" showInMenu />,
  ];

  const columnas = [
    {
      field: "nombres",
      headerName: "NOMBRES",
      width: "200",
      headerAlign: "center",
    },
    {
      field: "apellidos",
      headerName: "APELLIDOS",
      width: "200",
      headerAlign: "center",
    },
    {
      field: "tipoDocumento",
      headerName: "TIPO DOCUMENTO",
      width: "200",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "numeroDocumento",
      headerName: "NUM. DOCUMENTO",
      width: "150",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "banco",
      headerName: "BANCO",
      width: "200",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "tipoCuenta",
      headerName: "TIPO CUENTA",
      width: "150",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "numeroCuenta",
      headerName: "NUMERO CUENTA",
      width: "150",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "valorGiro",
      headerName: "VALOR",
      type: "number",
      valueFormatter: ({ value }) => currencyFormatter.format(value),
      cellClassName: "font-tabular-nums",
      width: "150",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fechaEnvio",
      headerName: "FECHA ENVIO",
      width: "150",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "tasaCompra",
      headerName: "TASA COMPRA",
      width: "150",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "estadoGiro",
      headerName: "ESTADO",
      width: "150",
      align: "center",
      headerAlign: "center",
      renderCell: (params) => estadoStyle(params),
    },
    {
      field: "actions",
      headerName: "ACCIONES",
      width: "150",
      type: "actions",
      align: "center",
      getActions: (params) => acciones(params),
    },
  ];

  // MANEJADORES
  const handlerEliminar = async (id) => {
    dobleConfirmacionEliminacion(async (error, data) => {
      if (data) {
        await eliminar({
          variables: { id },
          onCompleted: () => {
            swal("Eliminado!", "El giro ha sido eliminado.", "success");
            refetch();
          },
          onError: ({ graphQLErrors, networkError }) =>
            handleError({ graphQLErrors, networkError }),
        });
      }
    });
  };

  const handleDescargarComprobante = (value) => descargar(value);

  if (editarGiroInfo.loading) return <CircularProgressAnimation />;

  return (
    <div className="container-fluid px-0">
      <DataGrid
        headerHeight={50}
        apiRef={apiRef}
        rowHeight={50}
        rows={giros}
        columns={columnas}
        components={{
          Toolbar: () =>
            CustomToolbar({
              navegarTo,
              refetch,
              handleShow
            }),
          ColumnMenu: GridColumnMenu,
          LoadingOverlay: LinearProgress,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        hideFooterSelectedRowCount={true}
        loading={loading}
        disableColumnMenu
        autoPageSize={true}
        sx={{
          height: "calc(100vh - 60px)",
          borderRadius: "0px",
          backgroundColor: "white",
          fontSize: "20px",
        }}
      />
    </div>
  );
};
