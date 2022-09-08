import { useNavigate } from 'react-router-dom';
import {
    DataGrid,
    GridActionsCellItem,
    useGridApiRef,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GroupIcon from '@mui/icons-material/Group';
import swal from "sweetalert";
import { CustomToolbar } from '../CustomToolbar';
import { handleError } from '../../util/handleError';
import React, { useState } from 'react';
import { LinearProgress } from '@mui/material';
import { CustomNoRowsOverlay } from '../CustomNoRowsOverlay';
import { GridColumnMenu } from '../GridColumnMenu';
import { dobleConfirmacionEliminacion } from '../../util/dobleConfirmacionEliminacion';

export function TablaAsesores({ loading, asesores, eliminarAsesor, refetch, handleShow }) {
    const navigate = useNavigate();
    // ALTURA DE CADA FILA
    const [rowHeight, setRowHeight] = useState(50);
    // DECIDE SI MOSTRAR O NO EL SLIDER
    const [showSlider, setShowSlider] = useState(false);
    const navegarTo = "/asesores/crear";

    const handlerEliminar = async(id) => {
        dobleConfirmacionEliminacion(async (error, data) => {
            if(data){
                await eliminarAsesor({
                    variables: { id },
                    onCompleted: () => {
                        swal("Eliminado!", "El asesor ha sido eliminado.", "success");
                        refetch();
                    },
                    onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
                });
            }
        });
    };
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    const apiRef = useGridApiRef();
    const columnas = [
        {
            field: 'nombres',
            headerName: 'NOMBRES',
            width: "250",
            headerAlign: 'center',

        },
        {
            field: 'apellidos',
            headerName: 'APELLIDOS',
            width: "250",
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
            width: "200",
            headerAlign: 'center',
            align: "center",

        },
        {
            field: 'saldo',
            headerName: 'SALDO',
            type: 'number',
            valueFormatter: ({ value }) => currencyFormatter.format(value),
            cellClassName: 'font-tabular-nums',
            width: "200",
            align: "center",
            headerAlign: 'center',
        },
        {
            field: 'estado',
            headerName: 'ESTADO',
            width: "150",
            align: "center",
            headerAlign: 'center',
            renderCell: (params) => {
                return (params.value === "ACTIVO")
                    ? (<span style={{
                        color: "green",
                        borderRadius: "5px",
                        padding: "2px 10px",
                        border: "2px solid green"
                    }}><b>{params.value}</b></span>)
                    : (<span style={{
                        color: "red",
                        borderRadius: "5px",
                        padding: "2px 10px",
                        border: "2px solid red"
                    }}><b>{params.value}</b></span>)
            }
        },
        {
            field: 'actions',
            headerName: 'ACCIONES',
            width: "150",
            type: 'actions',
            align: "center",
            getActions: (params) => [
                <GridActionsCellItem icon={<DeleteIcon />} onClick={() => handlerEliminar(params.id)} label="Eliminar" />,
                <GridActionsCellItem icon={<EditIcon />} onClick={() => {
                    // EL SUMISTRO EL ID DEL ASESOR PARA SE MODIFICADO
                    navigate(`/asesores/editar/${params.id}`);
                    // ABRO EL MODAL PARA MODIFICAR
                    handleShow();
                }} label="Editar" />,
                <GridActionsCellItem icon={<GroupIcon />} onClick={() => navigate(`/usuarios/${params.id}`)} label="Ver usuarios" showInMenu />
            ]
        }
    ];



    return (
        <div className='container-fluid px-0' >
            <DataGrid
                headerHeight={50}
                apiRef={apiRef}
                rowHeight={rowHeight}
                rows={asesores.obtenerAsesores.filter(a => a.numeroDocumento !== "admin")}
                columns={columnas}
                components={{
                    Toolbar: () => CustomToolbar({ navegarTo, showSlider, setShowSlider, refetch, handleShow, rowHeight, setRowHeight }),
                    ColumnMenu: GridColumnMenu,
                    LoadingOverlay: LinearProgress,
                    NoRowsOverlay: CustomNoRowsOverlay
                }}
                hideFooterSelectedRowCount={true}
                loading={loading}
                autoPageSize={true}
                sx={{
                    height: 'calc(100vh - 60px)',
                    borderRadius: "0px",
                    backgroundColor: "white",
                    fontSize: "20px"
                }}
            />
        </div>
    );
}