// COMPONENTES 
import { Col, Container, Row } from "react-bootstrap";

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
import { handleError } from "../../util/handleError";
// ESTILOS
import "../../assets/styles/inicio.css";
import { EDITAR_ASESOR } from "../../services/apollo/gql/asesor/editarAsesor";
import { CircularProgressAnimation } from "../CircularProgressAnimation";
import { ErrorFetch } from "../errors/ErrorFetch";
import { OBTENER_MENSAJES } from "../../services/apollo/gql/mensaje/obtenerMensajes";
import { useSesionContext } from "../../providers/SesionProvider";
import { TasaCompra } from "../inicio/TasaCompra";
import { GananciaPorcentaje } from "../inicio/GananciaPorcentaje";
import { GananciaMonto } from "../inicio/GananciaMonto";
import { useState } from "react";

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

    // HOOKS
    const { sesionData: { id } } = useSesionContext();
    const [editarTasaVenta] = useMutation(EDITAR_ASESOR);
    const [recargarUsuario, recargarMutation] = useMutation(RECARGAR_USUARIO);
    const buzon = useQuery(OBTENER_MENSAJES);
    const { loading, data, error, refetch } = useQuery(OBTENER_ASESOR_POR_ID, {
        variables: { id }
    });
    const [valor, setValor] = useState(0);

    const admin = useQuery(OBTENER_ASESOR_POR_ID, { variables: { id: "632d09bde690d71065208f78" } });

    const asesor = data || initialStateAsesor;
    const mensajes = buzon?.data?.mensajes || initialStateMensajes.mensajes;

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
        <Container className="my-4" style={{ textAlign: "center" }}>
            <Row className="mb-3 justify-content-center">
                <Col md="4">
                    <GananciaPorcentaje
                        tasaCompra={(asesor.asesor?.usarTasaPreferencial) ? asesor.asesor?.tasaPreferencial : admin.data?.asesor.tasaVenta}
                        tasaVenta={asesor.asesor.tasaVenta} />
                </Col>
                <Col md="4">
                    <FormRecargar
                        recargar={recargarUsuario}
                        setValor={setValor}
                        refetch={refetch}
                        recargarMutation={recargarMutation}
                        tasa={asesor.asesor?.tasaVenta} />
                </Col>
                <Col md="4">
                    <GananciaMonto
                        valor={valor}
                        tasaCompra={(asesor.asesor?.usarTasaPreferencial) ? asesor.asesor?.tasaPreferencial : admin.data?.asesor.tasaVenta}
                        tasaVenta={asesor.asesor.tasaVenta} />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md="12">
                    <Buzon mensajes={mensajes} />
                </Col>
            </Row>

            <Row className="mb-3 justify-content-center">
                <Col md="4">
                    <TasaCompra
                        tasa={(asesor.asesor?.usarTasaPreferencial) ? asesor.asesor?.tasaPreferencial : admin.data?.asesor.tasaVenta} />
                </Col>
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
                        loading={loading}
                        tasa={asesor.asesor.tasaVenta} />
                </Col>

            </Row>
        </Container>
    );
}