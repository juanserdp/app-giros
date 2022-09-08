import { useNavigate, useParams } from 'react-router-dom';
import {
    DataGrid,
    GridActionsCellItem,
    useGridApiRef,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReplyIcon from '@mui/icons-material/Reply';
import swal from "sweetalert";
import { useState } from 'react';
import { LinearProgress } from '@mui/material';
import { CustomToolbar } from '../CustomToolbar';
import { CustomNoRowsOverlay } from '../CustomNoRowsOverlay';
import { GridColumnMenu } from '../GridColumnMenu';
import { dobleConfirmacionEliminacion } from '../../util/dobleConfirmacionEliminacion';
import { handleError } from '../../util/handleError';
import {currencyFormatter} from '../../util/currencyFormatter';  

export function TablaUsuarios({ usuarios, refetch, loading, handleShow, eliminarUsuario }) {

    const {obtenerUsuarios, obtenerUsuariosPorIdAsesor} = usuarios;

    const {asesor} = useParams();
    const navegarTo = `/usuarios/${asesor}/crear`;
    const apiRef = useGridApiRef();
    const navigate = useNavigate();

    

    const [rowHeight, setRowHeight] = useState(50);
    const [showSlider, setShowSlider] = useState(false);

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
            field: 'deuda',
            headerName: 'DEUDA',
            type: 'number',
            valueFormatter: ({ value }) => currencyFormatter.format(value),
            cellClassName: 'font-tabular-nums',
            width: "200",
            align: "center",
            headerAlign: 'center',
        },
        {
            field: 'capacidadPrestamo',
            headerName: 'CAPACIDAD PRESTAMO',
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
            getActions: ({id, row}) => [
                <GridActionsCellItem icon={<DeleteIcon />} onClick={() => handlerEliminar(id)} label="Eliminar" />,
                <GridActionsCellItem icon={<EditIcon />} onClick={() => {
                    navigate(`/usuarios/${row.asesor.id}/editar/${id}`);
                    handleShow();
                }} label="Editar" />,
                <GridActionsCellItem icon={<ReplyIcon/>} onClick={() => navigate(`/giros/${id}`)} label="Ver giros" showInMenu />
            ]
        }
    ];
    const handlerEliminar = async(id) => {
        dobleConfirmacionEliminacion(async (error, data)=>{
            if(data){
                await eliminarUsuario({
                    variables: { id },
                    onCompleted: () => {
                        swal("Eliminado!", "El usuario ha sido eliminado.", "success");
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
                rowHeight={rowHeight}
                rows={obtenerUsuariosPorIdAsesor || obtenerUsuarios }
                columns={columnas}
                components={{
                    Toolbar: () => CustomToolbar({navegarTo, showSlider, setShowSlider, refetch, handleShow, rowHeight, setRowHeight }),
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
                    fontSize: "20px"
                }}
            />
        </div>
    );
}