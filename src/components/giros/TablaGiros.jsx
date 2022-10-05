import { useNavigate } from 'react-router-dom';
import {
    DataGrid,
    GridActionsCellItem,
    useGridApiRef,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import swal from "sweetalert";
import { useState } from 'react';
import { LinearProgress } from '@mui/material';
import { CustomToolbar } from '../CustomToolbar';
import { CustomNoRowsOverlay } from '../CustomNoRowsOverlay';
import { GridColumnMenu } from '../GridColumnMenu';
import { dobleConfirmacionEliminacion } from '../../util/dobleConfirmacionEliminacion';
import { handleError } from '../../util/handleError';
import { currencyFormatter } from '../../util/currencyFormatter';
import { Sesion } from '../../util/Sesion';
import { Button } from 'react-bootstrap';

export function TablaGiros({ giros, refetch, loading, handleShow, eliminar }) {

    const sesion = new Sesion();
    const rol = sesion.getRol();

    const navegarTo = `/enviar-giro`;
    const apiRef = useGridApiRef();
    const navigate = useNavigate();

    const [rowHeight, setRowHeight] = useState(50);
    const [showSlider, setShowSlider] = useState(false);

    const estadoStyle = (params) => {
        if (params.value === "PENDIENTE") {
            return (<span style={{
                color: "red",
                borderRadius: "5px",
                padding: "2px 10px",
                border: "2px solid red"
            }}> <b>{params.value}</b></span >)
        }
        else if (params.value === "EN PROCESO") {
            return (<span style={{
                color: "blue",
                borderRadius: "5px",
                padding: "2px 10px",
                border: "2px solid blue"
            }}> <b>{params.value}</b></span >)
        }
        else if (params.value === "COMPLETADO") {
            return (<span style={{
                color: "green",
                borderRadius: "5px",
                padding: "2px 10px",
                border: "2px solid green"
            }}><b>{params.value}</b></span>)
        }
    };

    const comprobantePago = (params) => {
        if (rol === "USUARIO") {
            if (params.value == null)
                return (<Button disabled>Descargar</Button>);
            else return (<Button>Descargar</Button>);
        }
        else {
            if (params.value == null)
                return (<Button>Cargar</Button>);
            else return (<div><Button>Cargado</Button><Button>Cargar</Button></div>);
        }
    };

    const columnas = [
        {
            field: 'nombres',
            headerName: 'NOMBRES',
            width: "200",
            headerAlign: 'center',

        },
        {
            field: 'apellidos',
            headerName: 'APELLIDOS',
            width: "200",
            headerAlign: 'center'
        },
        {
            field: 'tipoDocumento',
            headerName: 'TIPO DOCUMENTO',
            width: "200",
            headerAlign: 'center',
            align: "center",
        },
        {
            field: 'numeroDocumento',
            headerName: 'NUM. DOCUMENTO',
            width: "150",
            headerAlign: 'center',
            align: "center",

        },
        {
            field: 'banco',
            headerName: 'BANCO',
            width: "200",
            headerAlign: 'center',
            align: "center",

        },
        {
            field: 'tipoCuenta',
            headerName: 'TIPO CUENTA',
            width: "150",
            headerAlign: 'center',
            align: "center",

        },
        {
            field: 'numeroCuenta',
            headerName: 'NUMERO CUENTA',
            width: "150",
            headerAlign: 'center',
            align: "center",

        },
        {
            field: 'valorGiro',
            headerName: 'VALOR',
            type: 'number',
            valueFormatter: ({ value }) => currencyFormatter.format(value),
            cellClassName: 'font-tabular-nums',
            width: "150",
            align: "center",
            headerAlign: 'center',
        },
        {
            field: 'comprobantePago',
            headerName: 'COMPROBANTE PAGO',
            width: "150",
            headerAlign: 'center',
            align: "center",
            renderCell: (params) => comprobantePago(params)
        },
        {
            field: 'fechaEnvio',
            headerName: 'FECHA ENVIO',
            width: "150",
            headerAlign: 'center',
            align: "center",

        },
        {
            field: 'tasaCompra',
            headerName: 'TASA COMPRA',
            width: "150",
            headerAlign: 'center',
            align: "center",
        },
        {
            field: 'estadoGiro',
            headerName: 'ESTADO',
            width: "150",
            align: "center",
            headerAlign: 'center',
            renderCell: (params) => estadoStyle(params)
        },
        {
            field: 'actions',
            headerName: 'ACCIONES',
            width: "150",
            type: 'actions',
            align: "center",
            getActions: ({ id, row }) => [
                <GridActionsCellItem icon={<DeleteIcon />} onClick={() => handlerEliminar(id)} label="Eliminar" />,
                <GridActionsCellItem icon={<EditIcon />} onClick={() => {
                    navigate(`/giros/usuario/${row.usuario}/editar/${id}`);
                    handleShow();
                }} label="Editar" />
            ]
        }
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
                    onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
                });
            }
        });
    };

    return (
        <div className='container-fluid px-0' >
            <DataGrid
                headerHeight={50}
                apiRef={apiRef}
                rowHeight={50}
                rows={giros}
                columns={(rol === "USUARIO") ? (columnas.filter(col => col.field !== "actions")) : columnas}
                components={{
                    Toolbar: () => CustomToolbar({ navegarTo, showSlider, setShowSlider, refetch, handleShow, rowHeight, setRowHeight }),
                    ColumnMenu: GridColumnMenu,
                    LoadingOverlay: LinearProgress,
                    NoRowsOverlay: CustomNoRowsOverlay
                }}
                hideFooterSelectedRowCount={true}
                loading={loading}
                disableColumnMenu
                autoPageSize={true}
                sx={{
                    height: 'calc(100vh - 60px)',
                    borderRadius: "0px",
                    backgroundColor: "white",
                    fontSize: "20px",
                }}
            />
        </div>
    );
}