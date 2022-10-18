import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UpdateIcon from '@mui/icons-material/Update';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { GridToolbarContainer, GridToolbarColumnsButton } from '@mui/x-data-grid';
import { Button as ButtonBootstrap } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Slider } from '@mui/material';
import { useState } from 'react';

export function CustomToolbar({
    navegarTo,
    refetch,
    handleShow,
}) {

    // INSTANCIAS
    const location = useLocation();
    const navigate = useNavigate();

    // CONSTANTES
    const { asesor, usuario } = useParams();

    // ESTADOS
    const [showSlider, setShowSlider] = useState(false);
    const [count, setCount] = useState(0);

    // ESTILOS
    const style = {
        width: "100%",
        display: "inline-block",
        whiteSpace: "nowrap",
        overflowX: "auto",
        overflowY: "hidden",
        textAlign: "center",
    }
    const fuente = {
        fontFamily: "'Roboto Condensed', sans-serif",
        color: "black",
        fontSize: "20px",
    }
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
                location.pathname.includes("/usuarios")  || 
                location.pathname.includes("/giros/usuario")) ? (<ButtonBootstrap
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
                {/* <ButtonBootstrap
                    variant='secondary'
                    className='mx-2'
                    sx={fuente}
                    size="small"
                    onClick={() => {
                        setShowSlider(!showSlider);
                    }}>
                    <TableRowsIcon />
                    &nbsp;DENSIDAD
                </ButtonBootstrap>
                {(showSlider) ? <div style={{ height: "20px", margin: "0px 50px 0px 50px" }} ><Slider
                    sx={{ textAlign: "center", width: "300px", }}
                    step={10}
                    min={30}
                    max={80}
                    onChange={(e, valor) => {
                        setRowHeight(Number(valor));
                    }}
                    value={rowHeight}
                /></div> : null} */}
                <GridToolbarColumnsButton id="buttonColumnas" style={{ display: "none" }} className='mx-2' sx={fuente} />
            </GridToolbarContainer>
        </div>
    );
}