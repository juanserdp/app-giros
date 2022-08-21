import { DataGrid, GridActionsCellItem, useGridApiRef } from '@mui/x-data-grid';
import { CustomToolbarAsesor } from './CustomToolbarAsesor';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GroupIcon from '@mui/icons-material/Group';
import ReplyIcon from '@mui/icons-material/Reply';
import swal from "sweetalert";
import { handleError } from '../util/handleError';
import { useNavigate } from 'react-router-dom';
export function TablaAsesores({ asesores, eliminarAsesor, refetch, handleShow }) {
    const navigate = useNavigate();
    const handlerEliminarAsesor = async (id) => {
        const willDelete = await swal({
            title: "Esta seguro?",
            text: "Una vez eliminado, no podra recuperar la informacion",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });
        if (willDelete) {
            if (window.confirm("Confirme su desicion!")) {
                await eliminarAsesor({
                    variables: { id },
                    onCompleted: () => {
                        swal("Eliminado!", "El asesor ha sido eliminado.", "success");
                        refetch();
                    },
                    onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
                });
                swal("El usuarios ha sido eliminado!", {
                    icon: "success",
                });
            }
            else swal("Su informacion esta a salvo!");
        } else {
            swal("Su informacion esta a salvo!");
        }
    }
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    const apiRef = useGridApiRef();
    const columnas = [
        {
            field: 'nombres',
            headerName: 'NOMBRES',
            flex: 1,
            headerAlign: 'center',

        },
        {
            field: 'apellidos',
            headerName: 'APELLIDOS',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'tipoDocumento',
            headerName: 'TIPO DOCUMENTO',
            flex: 1,
            headerAlign: 'center',
            align: "center",
        },
        {
            field: 'numeroDocumento',
            headerName: 'NUM. DOCUMENTO',
            flex: 1,
            headerAlign: 'center',
            align: "center",
        },
        // {
        //     field: 'clave',
        //     headerName: 'CONTRASEÑA',
        //     flex: 1,
        //     align: "center",
        //     headerAlign: 'center',
        // },
        {
            field: 'saldo',
            headerName: 'SALDO',
            type: 'number',
            valueFormatter: ({ value }) => currencyFormatter.format(value),
            cellClassName: 'font-tabular-nums',
            flex: 1,
            align: "center",
            headerAlign: 'center',
        },
        {
            field: 'estado',
            headerName: 'ESTADO',
            flex: 0.6,
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
            flex: 0.7,
            type: 'actions',
            align: "center",
            getActions: (params) => [
                <GridActionsCellItem icon={<DeleteIcon />} onClick={() => handlerEliminarAsesor(params.id)} label="Eliminar" />,
                <GridActionsCellItem icon={<EditIcon />} onClick={()=>{
                    navigate(`/asesores/${params.id}`);
                    handleShow();
                }} label="Editar" />,
                <GridActionsCellItem icon={<GroupIcon />} onClick={()=>navigate(`/usuarios/${params.id}`)} label="Ver usuarios" showInMenu />,
                <GridActionsCellItem icon={<ReplyIcon />} label="Ver giros" showInMenu />,
            ]
        }
    ];
    return (
        <div className='container-fluid px-0' style={{ display: "flex" }}>
            <DataGrid
                headerHeight={50}
                apiRef={apiRef}
                rows={asesores.obtenerAsesores}
                columns={columnas}
                pageSize={10}
                rowsPerPageOptions={[10, 30, 50, 100]}
                components={{
                    Toolbar: () => CustomToolbarAsesor({ refetch, handleShow }),
                }}
                disableColumnMenu
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