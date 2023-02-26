import {
    DataGrid,
    useGridApiRef,
} from '@mui/x-data-grid';
import { CustomToolbar } from '../toolbar/CustomToolbar';
import { LinearProgress } from '@mui/material';
import { CustomNoRowsOverlay } from '../toolbar/CustomNoRowsOverlay';
import { GridColumnMenu } from '../toolbar/GridColumnMenu';
import { GridCellExpand } from '../GridCellExpand';

import PropTypes from 'prop-types';
import { currencyFormatterWithDecimals } from '../../util/currencyFormatter';

function renderCellExpand(params) {
    return (
        <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
    );
}

renderCellExpand.propTypes = {
    colDef: PropTypes.object.isRequired,
    value: PropTypes.string,
};

export function TablaMovimientos({
    movimientos,
    refetch,
    loading
}) {

    // INSTANCIAS
    const apiRef = useGridApiRef();

    const columnas = [
        {
            field: 'deuda',
            type: "number",
            headerName: 'DEUDA',
            width: "200",
            align: "center",
            headerAlign: 'center',
            valueFormatter: ({ value }) => currencyFormatterWithDecimals.format(value)
        },
        {
            field: 'valor',
            type: "number",
            headerName: 'VALOR',
            width: "200",
            align: "center",
            headerAlign: 'center',
            valueFormatter: ({ value }) => currencyFormatterWithDecimals.format(value)
        },
        
        {
            field: 'saldo',
            type: "number",
            headerName: 'SALDO',
            width: "200",
            align: "center",
            headerAlign: 'center',
            valueFormatter: ({ value }) => currencyFormatterWithDecimals.format(value)
        },
        {
            field: 'fechaEnvio',
            headerName: 'FECHA DE ENVIO',
            width: "200",
            align: "center",
            headerAlign: 'center',
            renderCell: renderCellExpand
        },
        {
            field: 'concepto',
            headerName: 'CONCEPTO',
            width: "500",
            headerAlign: 'center',
            renderCell: renderCellExpand
        },
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
            rows={[...movimientos].reverse()} // FILAS
            columns={columnas} // COLUMNAS
            components={{ // COMPONENTES
                Toolbar: () => <CustomToolbar
                    refetch={refetch} // RECARGAR
                    handleShow={()=>{}} // MOSTRAR MODAL
                />,
                ColumnMenu: GridColumnMenu,
                LoadingOverlay: LinearProgress, // CARGANDO DATOS
                NoRowsOverlay: CustomNoRowsOverlay // NO HAY DATOS PARA MOSTRAR
            }}
            hideFooterSelectedRowCount={true}
            autoPageSize={true}
            loading={loading}
            sx={styleTablaAsesores} />
    );
};