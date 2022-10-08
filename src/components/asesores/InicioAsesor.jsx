// REACT
import { useEffect} from "react";

// HOOKS
import { useCargarDataForm } from "../../hooks/useCargarDataForm";

// COMPONENTES 
import { Col, Container, Row } from "react-bootstrap";

import { Backdrop, CircularProgress } from "@mui/material";
import { useMutation, useQuery } from '@apollo/client';
import swal from "sweetalert";
// COMPONENTES
import { Saldo } from "../Saldo";
import { Deuda } from "../Deuda";
import { TasaVenta } from "./TasaVenta";
import { Buzon } from "../Buzon";

import { FormRecargar } from "../FormRecargar";

// MUTATIONS / QUERYS
import { RECARGAR_USUARIO } from "../../services/apollo/gql/usuario/recargarUsuario";
import { OBTENER_ASESOR_POR_ID } from "../../services/apollo/gql/asesor/obtenerAsesorPorId";
import { OBTENER_BUZON } from "../../services/apollo/gql/buzon/obtenerBuzon";
// UTIL
import { Sesion } from "../../util/Sesion";
import { handleError } from "../../util/handleError";
// ESTILOS
import "../../assets/styles/inicio.css";
import { EDITAR_ASESOR } from "../../services/apollo/gql/asesor/editarAsesor";

export function InicioAsesor() {

    // CONSTANTES
    const initialStateAsesor = {
        asesor: {
            saldo: "",
            deuda: "",
            tasaVenta: 0
        }
    };

    // EFECTOS
    useEffect(() => {
        const button = document.getElementsByClassName("accordion-button collapsed");
        for (let boton of button) {
            boton.style.backgroundColor = "#0d6efd";
            boton.style.borderTopLeftRadius = "0px";
            boton.style.borderTopRightRadius = "0px";
            boton.style.border = "0px";
            boton.style.height = "20px";
            boton.style.outlineStyle = "none";
            boton.style.color = "white";
            boton.style.fontFamily = "'Roboto Slab', serif";
            boton.style.fontWeight = "500";
            boton.style.fontSize = "1.5rem";
            boton.style.padding = "5px";
            boton.style.textAlign = "center"
        };
    });

    // OBTENGO LO DATOS DE SESION DEL USUARIO
    const sesion = new Sesion();
    const id = sesion.getUid();

    // CONSULTAS
    const buzon = useQuery(OBTENER_BUZON);
    const { loading, data, error, refetch } = useQuery(OBTENER_ASESOR_POR_ID, {
        variables: { id }
    });

    const asesor = data || initialStateAsesor;

    // MUTACIONES
    const [editarTasaVenta] = useMutation(EDITAR_ASESOR);
    const [recargarUsuario] = useMutation(RECARGAR_USUARIO);

    // ESTADOS
    const [configuracion] = useCargarDataForm({ buzon: [] }, buzon.data);
    

    // MANEJADORES
    const handleEditarTasa = async () => {
        swal("Nueva tasa de venta:", {
            content: "input",
        }).then(async (value) => {
            if (value) {
                await editarTasaVenta({
                    variables: {
                        id,
                        asesor: {
                            tasaVenta: Number(value)
                        }
                    },
                    onCompleted: () => {
                        swal("Editado!", "La tasa de Venta ha sido editada con exito", "success");
                        refetch();
                    },
                    onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
                });
            }
            else swal("Error!", "Todos los campos son obligatorios!", "error");
        });
    };

    // CARGANDO
    if (loading) return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );

    // ERROR
    if (error) return (
        `Error! ${error}`
    );
    return (
        <>
            <Container className="my-4" style={{ textAlign: "center" }}>
                <Row className="mb-3 justify-content-center">
                    <Col md="4">
                        <FormRecargar
                            recargar={recargarUsuario}
                            refetch={refetch}
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md="12">
                        <Buzon configuracion={configuracion} />
                    </Col>
                </Row>
                <Row className="mb-3 justify-content-center">
                    <Col md="4">
                        <TasaVenta
                            tasa={asesor.asesor.tasaVenta}
                            handleEditarTasa={handleEditarTasa}
                            loading={loading}
                            rol="ASESOR" />
                    </Col>
                    <Col md="4">
                        <Saldo
                            saldo={asesor.asesor.saldo}
                            loading={loading} />
                    </Col>
                </Row>
            </Container>

        </>
    );
}