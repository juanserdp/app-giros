import { useNavigate } from "react-router-dom";
import { DataGrid, GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import DescriptionIcon from "@mui/icons-material/Description";
import swal from "sweetalert";
import { useState } from "react";
import { Backdrop, CircularProgress, LinearProgress } from "@mui/material";
import { CustomToolbar } from "../toolbar/CustomToolbar";
import { CustomNoRowsOverlay } from "../toolbar/CustomNoRowsOverlay";
import { GridColumnMenu } from "../toolbar/GridColumnMenu";
import { dobleConfirmacionEliminacion } from "../../util/dobleConfirmacionEliminacion";
import { generarFactura } from "../../util/generarFactura";
import { handleError } from "../../util/handleError";
import { currencyFormatter } from "../../util/currencyFormatter";
import { Sesion } from "../../util/Sesion";

export function TablaGiros({
  giros,
  refetch,
  loading,
  handleShow,
  eliminar,
  editarGiro,
  editarGiroInfo,
}) {
  const sesion = new Sesion();
  const rol = sesion.getRol();

  const navegarTo = `/enviar-giro`;
  const apiRef = useGridApiRef();
  const navigate = useNavigate();

  const [rowHeight, setRowHeight] = useState(50);
  const [showSlider, setShowSlider] = useState(false);

  const estadoStyle = (params) => {
    if (params.value === "PENDIENTE") {
      return (
        <span
          style={{
            color: "red",
            borderRadius: "5px",
            padding: "2px 10px",
            border: "2px solid red",
          }}
        >
          {" "}
          <b>{params.value}</b>
        </span>
      );
    } else if (params.value === "EN PROCESO") {
      return (
        <span
          style={{
            color: "blue",
            borderRadius: "5px",
            padding: "2px 10px",
            border: "2px solid blue",
          }}
        >
          {" "}
          <b>{params.value}</b>
        </span>
      );
    } else if (params.value === "COMPLETADO") {
      return (
        <span
          style={{
            color: "green",
            borderRadius: "5px",
            padding: "2px 10px",
            border: "2px solid green",
          }}
        >
          <b>{params.value}</b>
        </span>
      );
    }
  };

  const editarComprobante = (id) => {
    //const inputFile = document.getElementById("inputFile");
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/*";
    inputFile.style.display = "none";
    if (inputFile) inputFile.click();
    inputFile.addEventListener("change", async function () {
      const fileList = this.files;
      const comprobante = fileList[0];
      alert(comprobante.size);
      if (comprobante.size < 2000000) {
        const reader = new FileReader();
        reader.onload = async function (e) {
          const binaryString = e.target.result;
          console.log(binaryString);
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
        };
        reader.readAsBinaryString(comprobante);
      } else swal("Error!", "No se puede cargar una imagen que pese mas de 2mb", "error");
    });
  };

  const descargarComprobante = (value) => {
    const binaryString = value;
    const len = binaryString.length;
    const array = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      array[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([array], { type: "image/jpeg" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "comprobante_de_pago.png";
    a.style.textDecoration = "none";
    a.style.color = "white";
    a.onload = function () {
      URL.revokeObjectURL(this.href);
      a.click();
    };
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
    rol === "USUARIO" || rol === "OPERARIO" ? (
      <></>
    ) : (
      <GridActionsCellItem
        icon={<DeleteIcon />}
        onClick={() => handlerEliminar(params.id)}
        label="Eliminar"
      />
    ),
    <GridActionsCellItem
      icon={<EditIcon />}
      onClick={() => {
        navigate(`/giros/usuario/${params.row.usuario}/editar/${params.id}`);
        handleShow();
      }}
      label="Editar"
    />,
    rol === "USUARIO" ? (
      <></>
    ) : (
      <GridActionsCellItem
        icon={<UploadIcon />}
        onClick={() => editarComprobante(params.id)}
        label="Cargar comprobante"
        showInMenu
      />
    ),
    <GridActionsCellItem
      icon={<DownloadIcon />}
      disabled={params.row.comprobantePago ? false : true}
      onClick={() => descargarComprobante(params.row.comprobantePago)}
      label="Descargar comprobante"
      showInMenu
    />,
    <GridActionsCellItem
      icon={<DescriptionIcon />}
      disabled={params.row.estadoGiro === "COMPLETADO" ? false : true}
      onClick={() => generar(params.row)}
      label="Generar factura"
      showInMenu
    />,
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
    // {
    //   field: "comprobantePago",
    //   headerName: "COMPROBANTE PAGO",
    //   width: "200",
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (params) => comprobantePago(params),
    // },
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
  if (editarGiroInfo.loading)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        Cargando &nbsp;
        <CircularProgress color="inherit" />
      </Backdrop>
    );

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
              showSlider,
              setShowSlider,
              refetch,
              handleShow,
              rowHeight,
              setRowHeight,
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
}
