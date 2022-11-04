import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UpdateIcon from '@mui/icons-material/Update';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { GridToolbarContainer, GridToolbarColumnsButton } from '@mui/x-data-grid';
import { Button as ButtonBootstrap } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Slider } from '@mui/material';
import { useState } from 'react';
import { useSesionContext } from '../../providers/SesionProvider';

export function CustomToolbar({
    navegarTo,
    refetch,
    handleShow,
}) {
    // CONSTANTES
    const fuente = {
        fontFamily: "'Roboto Condensed', sans-serif",
        color: "black",
        fontSize: "20px",
    };

    // INSTANCIAS
    const location = useLocation();
    const navigate = useNavigate();

    // CONSTANTES
    const style = {
        width: "100%",
        display: "inline-block",
        whiteSpace: "nowrap",
        overflowX: "auto",
        overflowY: "hidden",
        textAlign: "center",
    };

    // HOOKS
    const { sesionData: { rol } } = useSesionContext();

    return (
        <div id="contenedor-toolbar" >
            <GridToolbarContainer
                id="div-grid-toolbar"
                sx={style}
                style={{
                    margin: "15px 0px 0px 0px",
                    padding: "5px 0px 20px 0px"
                }}>
                {(location.pathname.includes("/asesores") ||
                    (location.pathname.includes("/usuarios") && rol === "ASESOR") ||
                    (/\/usuarios\/\w+/.test(location.pathname) && rol === "ADMINISTRADOR") ||
                    (location.pathname.includes("/giros/usuario") && rol === "USUARIO")) ? (<ButtonBootstrap
                        className='mx-2'
                        variant="primary" onClick={() => {
                            navigate(navegarTo);
                            handleShow();
                        }}>
                        <PersonAddIcon />
                        &nbsp;CREAR
                    </ButtonBootstrap>) : null}
                <ButtonBootstrap
                    variant='secondary'
                    className='mx-2'
                    sx={fuente} size="small" onClick={() => refetch()}>
                    <UpdateIcon />
                    &nbsp;ACTUALIZAR
                </ButtonBootstrap>
                <ButtonBootstrap
                    variant='secondary'
                    className='mx-2'
                    sx={fuente} size="small" onClick={() => {
                        const buttonColumnas = document.getElementById("buttonColumnas");
                        buttonColumnas.click();
                    }}>
                    <ViewColumnIcon />
                    &nbsp;COLUMNAS
                </ButtonBootstrap>
                <GridToolbarColumnsButton id="buttonColumnas" style={{ display: "none" }} className='mx-2' sx={fuente} />
            </GridToolbarContainer>
        </div>
    );
}