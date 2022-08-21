import Button from '@mui/material/Button';
import SyncIcon from '@mui/icons-material/Sync';
import AddIcon from '@mui/icons-material/Add';

import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton,  GridToolbarDensitySelector } from '@mui/x-data-grid';
import { Button as ButtonBootstrap } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function CustomToolbarAsesor({refetch, handleShow}) {
    const navigate = useNavigate();
    const style = {
        display: "flex",
        flexWrap: "wrap",
        flexBasis: "auto",
        justifyContent: "space-between",
    }
    const fuente = {
        fontFamily: "'Roboto Condensed', sans-serif",
        color: "black",
        fontSize: "20px",
    }
    return (
        <div className="container">
            <GridToolbarContainer sx={style} >
                <ButtonBootstrap variant="primary" onClick={()=>{
                    navigate("/asesores/");
                    handleShow();
                }}>
                    <AddIcon />
                    &nbsp;ASESOR
                </ButtonBootstrap>
                <Button sx={fuente} size="small" onClick={()=>refetch()}>
                    <SyncIcon />
                    &nbsp;ACTUALIZAR
                </Button>
                <GridToolbarColumnsButton  sx={fuente}/>
                <GridToolbarFilterButton sx={fuente} />
                <GridToolbarDensitySelector sx={fuente} />
                
            </GridToolbarContainer>
        </div>
    );
}