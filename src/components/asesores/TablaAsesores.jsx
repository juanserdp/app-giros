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
import { LinearProgress } from '@mui/material';
import { CustomNoRowsOverlay } from '../CustomNoRowsOverlay';
import { GridColumnMenu } from '../GridColumnMenu';
import { dobleConfirmacionEliminacion } from '../../util/dobleConfirmacionEliminacion';
import { currencyFormatter } from '../../util/currencyFormatter';

export function TablaAsesores({
    loading,
    asesores,
    eliminarAsesor,
    refetch,
    handleShow }) {

    // INSTANCIAS
    const navigate = useNavigate();
    const apiRef = useGridApiRef();

    // CONSTANTES
    const navegarTo = "/asesores/crear";

    // MANEJADORES
    const handlerEliminar = async (id) => {
        dobleConfirmacionEliminacion(async (error, data) => {
            if (data) {
                await eliminarAsesor({
                    variables: { id },
                    onCompleted: () => {
                        // EXITO
                        swal("Eliminado!", "El asesor ha sido eliminado.", "success");
                        // RECARGAR
                        refetch();
                    },
                    onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
                });
            }
        });
    };

    // FUNCIONES 
    const acciones = (params) => [
        <GridActionsCellItem icon={<DeleteIcon />} onClick={() => handlerEliminar(params.id)} label="Eliminar" />,
        <GridActionsCellItem icon={<EditIcon />} onClick={() => {
            // NAVEGAR RUTA
            navigate(`/asesores/editar/${params.id}`);
            // ABRIR MODAL
            handleShow();
        }} label="Editar" />,
        <GridActionsCellItem icon={<GroupIcon />} onClick={() => navigate(`/usuarios/${params.id}`)} label="Ver usuarios" showInMenu />
    ];

    const estadoStyle = (params) => {
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
            field: 'saldo',
            headerName: 'SALDO',
            type: 'number',
            valueFormatter: ({ value }) => currencyFormatter.format(value),
            cellClassName: 'font-tabular-nums',
            width: "150",
            align: "center",
            headerAlign: 'center',
        },
        {
            field: 'estado',
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
            getActions: (params) => acciones(params)
        }
    ];

    return (
        <div className='container-fluid px-0' >
            <DataGrid
                headerHeight={50} // ALTURA TITULOS
                apiRef={apiRef}
                rowHeight={50} // ALTURA FILA
                rows={asesores.filter(a => a.numeroDocumento !== "admin")} // FILAS
                columns={columnas} // COLUMNAS
                components={{ // COMPONENTES
                    Toolbar: () => <CustomToolbar
                        navegarTo={navegarTo} // RUTA
                        refetch={refetch} // RECARGAR
                        handleShow={handleShow} // MOSTRAR MODAL
                    />,
                    ColumnMenu: GridColumnMenu,
                    LoadingOverlay: LinearProgress, // CARGANDO DATOS
                    NoRowsOverlay: CustomNoRowsOverlay // NO HAY DATOS
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