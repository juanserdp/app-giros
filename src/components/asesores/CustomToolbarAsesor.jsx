import SyncIcon from '@mui/icons-material/Sync';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UpdateIcon from '@mui/icons-material/Update';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import { GridToolbarContainer, GridToolbarColumnsButton } from '@mui/x-data-grid';
import { Button as ButtonBootstrap } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Slider } from '@mui/material';

export function CustomToolbarAsesor({showSlider, setShowSlider, refetch, handleShow, setRowHeight, rowHeight }) {
    const navigate = useNavigate();
    
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
    function Sli() {
        return (
            <>
                <Slider
                    sx={{textAlign: "center", width:"300px",}}
                    step={10}
                    min={30}
                    max={80}
                    onChange={(e, valor) => {
                        setRowHeight(Number(valor));
                    }}
                    value={rowHeight} />
            </>
        )
    }
    return (
        <div id="contenedor-toolbar" >
            <GridToolbarContainer sx={style} style={{ margin: "15px 0px 0px 0px", padding: "5px 0px 20px 0px" }}>
                <ButtonBootstrap
                    className='mx-2'
                    variant="primary" onClick={() => {
                        navigate("/asesores/");
                        handleShow();
                    }}
                >
                    <PersonAddIcon />
                    &nbsp;ASESOR
                </ButtonBootstrap>
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
                    <ViewWeekIcon />
                    &nbsp;COLUMNAS
                </ButtonBootstrap>
                <ButtonBootstrap
                    variant='secondary'
                    className='mx-2'
                    sx={fuente} size="small" onClick={() => {
                        setShowSlider(!showSlider);
                    }}>
                    <SyncIcon />
                    &nbsp;DENSIDAD
                </ButtonBootstrap>
                {(showSlider) ? <div style={{ height: "20px",margin: "0px 50px 0px 50px"  }} ><Sli /></div> : null}
                <GridToolbarColumnsButton id="buttonColumnas" style={{ display: "none" }} className='mx-2' sx={fuente} />
            </GridToolbarContainer>
        </div>
    );
}