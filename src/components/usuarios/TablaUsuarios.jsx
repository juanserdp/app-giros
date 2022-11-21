import { useNavigate } from 'react-router-dom';
import {
    DataGrid,
    GridActionsCellItem,
    useGridApiRef,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReplyIcon from '@mui/icons-material/Reply';
import swal from "sweetalert";
import { LinearProgress } from '@mui/material';
import { CustomToolbar } from '../toolbar/CustomToolbar';
import { CustomNoRowsOverlay } from '../toolbar/CustomNoRowsOverlay';
import { GridColumnMenu } from '../toolbar/GridColumnMenu';
import { dobleConfirmacionEliminacion } from '../../util/dobleConfirmacionEliminacion';
import { handleError } from '../../util/handleError';
import { currencyFormatter } from '../../util/currencyFormatter';
import { useMutation } from '@apollo/client';
import { ELIMINAR_USUARIO } from '../../services/apollo/gql/usuario/eliminarUsuario';

export function TablaUsuarios({
    usuarios,
    refetch,
    loading,
    handleShow,
    ids,
    setIds
}) {
    // INSTANCIAS
    const apiRef = useGridApiRef();
    const navigate = useNavigate();

    const [eliminarUsuario, eliminarUsuarioMutation] = useMutation(ELIMINAR_USUARIO);

    const loadingMutation = eliminarUsuarioMutation.loading;

    // FUNCIONES
    const estadoStyle = (params) => {
        const color = params.value === "ACTIVO" ? "green" : "red";
        const styleSpan = {
            color: color,
            borderRadius: "5px",
            padding: "2px 10px",
            border: `2px solid ${color}`
        };
        return (
            <span style={styleSpan}>
                {params.value}
            </span>
        );
    };

    const acciones = (params) => [
        <GridActionsCellItem
            icon={<DeleteIcon />}
            disabled={loadingMutation}
            onClick={() => handlerEliminar(params.id)}
            label="Eliminar" />,
        <GridActionsCellItem
            icon={<EditIcon />}
            onClick={() => {
                setIds({ ...ids, usuario: params.id });
                handleShow();
            }}
            label="Editar" />,
        <GridActionsCellItem
            icon={<ReplyIcon />}
            onClick={() => navigate(`/giros/usuario/${params.id}`)}
            label="Ver giros"
            showInMenu />
    ];

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
            headerName: 'SALDO (VES)',
            type: 'number',
            valueFormatter: ({ value }) => currencyFormatter.format(value),
            cellClassName: 'font-tabular-nums',
            width: "150",
            align: "center",
            headerAlign: 'center',
        },
        {
            field: 'deuda',
            headerName: 'DEUDA (VES)',
            type: 'number',
            valueFormatter: ({ value }) => currencyFormatter.format(value),
            cellClassName: 'font-tabular-nums',
            width: "150",
            align: "center",
            headerAlign: 'center',
        },
        {
            field: 'capacidadPrestamo (VES)',
            headerName: 'CAPACIDAD PRESTAMO',
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
            field: 'tasaPreferencial',
            headerName: 'TASA PREFERENCIAL',
            width: "150",
            align: "center",
            headerAlign: 'center'
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

    // MANEJADORES
    const handlerEliminar = async (id) => {
        dobleConfirmacionEliminacion(async (error, data) => {
            if (data) {
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
                rowHeight={50}
                rows={usuarios}
                columns={columnas}
                components={{
                    Toolbar: () => CustomToolbar({
                        refetch,
                        handleShow,
                    }),
                    ColumnMenu: GridColumnMenu,
                    LoadingOverlay: LinearProgress,
                    NoRowsOverlay: CustomNoRowsOverlay
                }}
                hideFooterSelectedRowCount={true}
                loading={loading || loadingMutation}
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
    )
}