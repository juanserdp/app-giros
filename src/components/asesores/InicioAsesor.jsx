// REACT
import { useEffect } from "react";

// HOOKS
import { useCargarDataForm } from "../../hooks/useCargarDataForm";

// COMPONENTES 
import { Col, Container, Row } from "react-bootstrap";

import { Backdrop, CircularProgress } from "@mui/material";
import { useMutation, useQuery } from '@apollo/client';
import swal from "sweetalert";
// COMPONENTES
import { Saldo } from "../inicio/Saldo";
import { TasaVenta } from "../inicio/TasaVenta";
import { Buzon } from "../inicio/Buzon";

import { FormRecargar } from "../forms/FormRecargar";

// MUTATIONS / QUERYS
import { RECARGAR_USUARIO } from "../../services/apollo/gql/usuario/recargarUsuario";
import { OBTENER_ASESOR_POR_ID } from "../../services/apollo/gql/asesor/obtenerAsesorPorId";
// UTIL
import { Sesion } from "../../util/Sesion";
import { handleError } from "../../util/handleError";
// ESTILOS
import "../../assets/styles/inicio.css";
import { EDITAR_ASESOR } from "../../services/apollo/gql/asesor/editarAsesor";
import { CircularProgressAnimation } from "../CircularProgressAnimation";
import { ErrorFetch } from "../errors/ErrorFetch";
import { OBTENER_MENSAJES } from "../../services/apollo/gql/mensaje/obtenerMensajes";
import { useSesionContext } from "../../providers/SesionProvider";

export function InicioAsesor() {

    // CONSTANTES
    const initialStateAsesor = {
        asesor: {
            saldo: "",
            deuda: "",
            tasaVenta: 0
        }
    };
    const initialStateMensajes = {
        mensajes: []
    };

    // OBTENGO LO DATOS DE SESION DEL USUARIO
    const { sesionData: { id } } = useSesionContext();

    // CONSULTAS
    const buzon = useQuery(OBTENER_MENSAJES);
    const mensajes = buzon?.data?.mensajes || initialStateMensajes.mensajes;

    const { loading, data, error, refetch } = useQuery(OBTENER_ASESOR_POR_ID, {
        variables: { id }
    });

    const asesor = data || initialStateAsesor;

    // MUTACIONES
    const [editarTasaVenta] = useMutation(EDITAR_ASESOR);
    const [recargarUsuario] = useMutation(RECARGAR_USUARIO);

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

    if (loading) return <CircularProgressAnimation />

    if (error) return <ErrorFetch error={error} />

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
                        <Buzon mensajes={mensajes} />
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