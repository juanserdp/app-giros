import { useNavigate } from 'react-router-dom';
import {
    DataGrid,
    GridActionsCellItem,
    useGridApiRef,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GroupIcon from '@mui/icons-material/Group';
import ReplyIcon from '@mui/icons-material/Reply';
import swal from "sweetalert";
import { CustomToolbar } from '../toolbar/CustomToolbar';
import { handleError } from '../../util/handleError';
import { LinearProgress } from '@mui/material';
import { CustomNoRowsOverlay } from '../toolbar/CustomNoRowsOverlay';
import { GridColumnMenu } from '../toolbar/GridColumnMenu';
import { dobleConfirmacionEliminacion } from '../../util/dobleConfirmacionEliminacion';
import { currencyFormatter, currencyFormatterWithDecimals } from '../../util/currencyFormatter';
import { ELIMINAR_ASESOR } from '../../services/apollo/gql/asesor/eliminarAsesor';
import { useMutation } from '@apollo/client';
import { GridCellExpand } from '../GridCellExpand';

import PropTypes from 'prop-types';
import { useEffect } from 'react';

function renderCellExpand(params) {
    return (
        <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
    );
}

renderCellExpand.propTypes = {
    colDef: PropTypes.object.isRequired,
    value: PropTypes.string,
};

export function TablaAsesores({
    asesores,
    refetch,
    loading,
    handleShow,
    setIds
}) {

    // INSTANCIAS
    const navigate = useNavigate();
    const apiRef = useGridApiRef();

    const [eliminarAsesor, eliminarAsesorMutation] = useMutation(ELIMINAR_ASESOR);

    const loadingMutation = eliminarAsesorMutation.loading;

    // MANEJADORES
    const handleEliminar = async (id) => {
        dobleConfirmacionEliminacion(async (error, data) => {
            if (data) {
                await eliminarAsesor({
                    variables: { id },
                    onCompleted: () => {
                        swal("Eliminado!", "El asesor ha sido eliminado.", "success"); // EXITO
                        refetch(); // RECARGAR
                    },
                    onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
                });
            }
        });
    };

    // FUNCIONES 
    const acciones = (params) => [
        <GridActionsCellItem
            icon={<DeleteIcon />}
            disabled={loadingMutation}
            onClick={() => handleEliminar(params.id)}
            label="Eliminar" />,
        <GridActionsCellItem
            icon={<EditIcon />}
            onClick={() => {
                setIds({
                    asesor: params.id
                })
                handleShow();// ABRIR MODAL QUE EDITAR UN USUARIO
            }}
            label="Editar" />,
        <GridActionsCellItem
            icon={<GroupIcon />}
            onClick={() => navigate(`/usuarios/${params.id}`)}
            label="Ver usuarios"
            showInMenu />,
        <GridActionsCellItem
            icon={<ReplyIcon />}
            onClick={() => navigate(`/giros/asesor/${params.id}`)}
            label="Ver giros"
            showInMenu />
    ];

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

    const columnas = [
        {
            field: 'nombres',
            headerName: 'NOMBRES',
            width: "200",
            headerAlign: 'center',
            renderCell: renderCellExpand

        },
        {
            field: 'apellidos',
            headerName: 'APELLIDOS',
            width: "200",
            headerAlign: 'center',
            renderCell: renderCellExpand
        },
        {
            field: 'tipoDocumento',
            headerName: 'TIPO DOCUMENTO',
            width: "200",
            headerAlign: 'center',
            align: "center",
            renderCell: renderCellExpand
        },
        {
            field: 'numeroDocumento',
            headerName: '# DOCUMENTO',
            width: "170",
            headerAlign: 'center',
            align: "center",
            renderCell: renderCellExpand

        },
        {
            field: 'saldo',
            headerName: 'SALDO',
            type: 'number',
            valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
            cellClassName: 'font-tabular-nums',
            width: "150",
            align: "center",
            headerAlign: 'center'
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

    const styleTablaAsesores = {
        height: 'calc(100vh - 60px)',
        borderRadius: "0px",
        backgroundColor: "white",
        fontSize: "20px"
    };

    return (
        <DataGrid
            headerHeight={50} // ALTURA TITULOS
            apiRef={apiRef}
            rowHeight={50} // ALTURA FILA
            rows={[...asesores].reverse()} // FILAS
            columns={columnas} // COLUMNAS
            components={{ // COMPONENTES
                Toolbar: () => <CustomToolbar
                    refetch={refetch} // RECARGAR
                    handleShow={handleShow} // MOSTRAR MODAL
                />,
                ColumnMenu: GridColumnMenu,
                LoadingOverlay: LinearProgress, // CARGANDO DATOS
                NoRowsOverlay: CustomNoRowsOverlay // NO HAY DATOS PARA MOSTRAR
            }}
            hideFooterSelectedRowCount={true}
            loading={loading || loadingMutation}
            autoPageSize={true}
            sx={styleTablaAsesores} />
    );
};