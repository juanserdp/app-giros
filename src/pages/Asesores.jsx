import { useState } from "react";
import { useMutation, useQuery} from '@apollo/client';
import { ModalAsesor } from "../components/ModalAsesor";
import { NavBar } from "../components/NavBar";
import { TablaAsesores } from "../components/TablaAsesores";
import { OBTENER_ASESORES } from '../services/apollo/gql/asesor/obtenerAsesores';
import { ELIMINAR_ASESOR } from '../services/apollo/gql/asesor/eliminarAsesor';
import { EDITAR_ASESOR } from '../services/apollo/gql/asesor/editarAsesor';
import { CREAR_ASESOR } from "../services/apollo/gql/asesor/crearAsesor";
import Spinner from 'react-bootstrap/Spinner';

export default function Asesores() {
    const { loading, error, data, refetch } = useQuery(OBTENER_ASESORES);
    const [crearAsesor] = useMutation(CREAR_ASESOR);
    const [editarAsesor] = useMutation(EDITAR_ASESOR)
    const [eliminarAsesor] = useMutation(ELIMINAR_ASESOR);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (error) return (
        `Error! ${error}`
    );
    return (
        <>
            <NavBar />
            <TablaAsesores
                asesores={data || {
                    obtenerAsesores: []
                }}
                eliminarAsesor={eliminarAsesor}
                refetch={refetch}
                handleShow={handleShow}
            />
            <ModalAsesor
                show={show}
                handleClose={handleClose}
                crearAsesor={crearAsesor}
                editarAsesor={editarAsesor}
                refetch={refetch}
                asesores={data || {
                    obtenerAsesores: []
                }}
            />
            {(loading) ?
                <div style={{
                    width: "100%",
                    height: "100vh",
                    display: 'flex',
                    position: "absolute",
                    top: "0",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    justifyContent: 'center',
                    alignItems: "center",
                    zIndex:"1"
                }}>
                    <div >
                        <h1>
                            <span>CARGAND</span>
                            <Spinner size="lg" animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </h1>
                    </div>
                </div > : false}

        </>
    );
};