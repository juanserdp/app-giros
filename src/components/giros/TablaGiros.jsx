// HOOKS
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
import { DataGrid, GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";
import { LinearProgress } from "@mui/material";
// UTILIDADES
import { dobleConfirmacionEliminacion } from "../../util/dobleConfirmacionEliminacion";
import { generarFactura } from "../../util/generarFactura";
import { handleError } from "../../util/handleError";
import { currencyFormatterWithDecimals } from "../../util/currencyFormatter";
import { descargar } from "../../util/descargar";
import { transformarImagenABinaryString } from "../../util/transformarImagenABinaryString";
import swal from "sweetalert";
import { useMutation} from "@apollo/client";
import { EDITAR_GIRO } from "../../services/apollo/gql/giro/editarGiro";
import { ELIMINAR_GIRO } from "../../services/apollo/gql/giro/eliminarGiro";


import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import React from "react";

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: 'center',
        lineHeight: '24px',
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: '100%',
          width,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {value}
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ marginLeft: -17 }}
        >
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current.offsetHeight - 3 }}
          >
            <Typography variant="body2" style={{ padding: 8 }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  );
});

GridCellExpand.propTypes = {
  value: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

function renderCellExpand(params) {
  return (
    <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
  );
}

renderCellExpand.propTypes = {
  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: PropTypes.object.isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.string,
};

export function TablaGiros({
  giros,
  refetch,
  loading,
  handleShow,
  ids,
  setIds
}) {
  
  // HOOKS
  const { sesionData: { rol } } = useSesionContext();
  const apiRef = useGridApiRef();

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

  const [editarGiro, editarGiroMutation] = useMutation(EDITAR_GIRO);
  const [eliminarGiro, eliminarGiroMutation] = useMutation(ELIMINAR_GIRO);

  const loadingMutation = editarGiroMutation.loading || eliminarGiroMutation.loading;

  const editarComprobante = async (id) => {
    transformarImagenABinaryString(async (binaryString) => {
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

  const generar = async (giro, id) => {
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
      <GridActionsCellItem
        disabled={loadingMutation}
        icon={<DeleteIcon />}
        onClick={() => handlerEliminar(params.id)}
        label="Eliminar" />
    ),
    <GridActionsCellItem
      disabled={loadingMutation}
      icon={<EditIcon />}
      onClick={() => {
        setIds({ ...ids, giro: params.id });
        handleShow();
      }} label="Editar" />,
    (rol === "USUARIO") ? <></> : (
      <GridActionsCellItem
        disabled={loadingMutation}
        icon={<UploadIcon />}
        onClick={() => editarComprobante(params.id)}
        label="Cargar comprobante"
        showInMenu />
    ),
    <GridActionsCellItem
      icon={<DownloadIcon />}
      disabled={loadingMutation ? true : params.row.comprobantePago ? false : true}
      onClick={() => handleDescargarComprobante(params.row.comprobantePago)}
      label="Descargar comprobante"
      showInMenu />,
    <GridActionsCellItem
      icon={<DescriptionIcon />}
      disabled={loadingMutation}
      onClick={() => generar(params.row, params.row.usuario)}
      label="Generar factura"
      showInMenu />,
  ];

  const columnas = [
    {
      field: "nombresRemitente",
      headerName: "NOMBRES REMITENTE",
      width: "220",
      headerAlign: "center",
      renderCell: renderCellExpand
    },
    {
      field: "apellidosRemitente",
      headerName: "APELLIDOS REMITENTE",
      width: "220",
      headerAlign: "center",
      renderCell: renderCellExpand
    },
    {
      field: "tipoDocumentoRemitente",
      headerName: "TIPO DOCUMENTO REMITENTE",
      width: "280",
      headerAlign: "center",
      align: "center",
      renderCell: renderCellExpand
    },
    {
      field: "numeroDocumentoRemitente",
      headerName: "# DOCUMENTO REMITENTE",
      width: "260",
      headerAlign: "center",
      align: "center",
      renderCell: renderCellExpand
    },
    {
      field: "nombres",
      headerName: "NOMBRES DESTINATARIO",
      width: "240",
      headerAlign: "center",
      renderCell: renderCellExpand
    },
    {
      field: "apellidos",
      headerName: "APELLIDOS DESTINATARIO",
      width: "250",
      headerAlign: "center",
      renderCell: renderCellExpand
    },
    {
      field: "tipoDocumento",
      headerName: "TIPO DOCUMENTO DESTINATARIO",
      width: "320",
      headerAlign: "center",
      align: "center",
      renderCell: renderCellExpand
    },
    {
      field: "numeroDocumento",
      headerName: "# DOCUMENTO DESTINATARIO",
      width: "280",
      headerAlign: "center",
      align: "center",
      renderCell: renderCellExpand
    },
    {
      field: "banco",
      headerName: "BANCO",
      width: "200",
      headerAlign: "center",
      align: "center",
      renderCell: renderCellExpand
    },
    {
      field: "tipoCuenta",
      headerName: "TIPO CUENTA",
      width: "150",
      headerAlign: "center",
      align: "center",
      renderCell: renderCellExpand
    },
    {
      field: "numeroCuenta",
      headerName: "NUMERO CUENTA",
      width: "200",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "valorGiro",
      headerName: "VALOR",
      type: "number",
      valueFormatter: ({ value }) => currencyFormatterWithDecimals.format(value),
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
      field: "id",
      headerName: "ID",
      width: "280",
      headerAlign: "center",
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
        await eliminarGiro({
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

  return (
    <div className="container-fluid px-0">
      <DataGrid
        headerHeight={50}
        apiRef={apiRef}
        rowHeight={50}
        rows={[...giros].reverse()}
        columns={columnas}
        components={{
          Toolbar: () =>
            CustomToolbar({
              refetch,
              handleShow
            }),
          ColumnMenu: GridColumnMenu,
          LoadingOverlay: LinearProgress,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        hideFooterSelectedRowCount={true}
        loading={loading || loadingMutation}
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
