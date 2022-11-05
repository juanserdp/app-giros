import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UpdateIcon from '@mui/icons-material/Update';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';
import "../../assets/styles/botonesToolbar.css";
export function CustomToolbar({
    refetch,
    handleShow,
}) {
    // INSTANCIAS
    const location = useLocation();

    // CONSTANTES
    const style = {
        width: "100%",
        display: "inline-block",
        whiteSpace: "nowrap",
        overflowX: "auto",
        overflowY: "hidden",
        textAlign: "center",
    };
    return (
        <div id="contenedor-toolbar" >
            <GridToolbarContainer
                id="div-grid-toolbar"
                sx={style}
                style={{
                    margin: "15px 0px 0px 0px",
                    padding: "5px 0px 20px 0px"
                }}>


                {(/\/asesores/.test(location.pathname) ||
                    /\/usuarios\/\w+/.test(location.pathname)) ?
                    <button
                        className='buton_toolbar'
                        onClick={handleShow}>
                        <span>
                            <PersonAddIcon fontSize="small" />&nbsp;
                            CREAR
                        </span>
                    </button> : null}

                <button className='buton_toolbar' onClick={() => refetch()}>
                    <span>
                        <UpdateIcon fontSize="small" />&nbsp;
                        ACTUALIZAR
                    </span>
                </button>

                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
            </GridToolbarContainer>
        </div>
    );
}