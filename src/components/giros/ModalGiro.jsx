import swal from "sweetalert";
import { useState } from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import { handleError } from "../../util/handleError";
import { dateJSONupdate } from "../../util/dateJSONupdate";
import { Cargando } from "../Cargando";
import { Nombres } from "../forms/Nombres";
import { Apellidos } from "../forms/Apellidos";
import { TipoDocumento } from "../forms/TipoDocumento";
import { NumeroDocumento } from "../forms/NumeroDocumento";
import { Banco } from "../forms/Banco";
import { TipoCuenta } from "../forms/TipoCuenta";
import { NumeroCuenta } from "../forms/NumeroCuenta";
import { ValorGiro } from "../forms/ValorGiro";
import { EstadoGiro } from "../forms/EstadoGiro";
import { useSesionContext } from "../../providers/SesionProvider";
import { useMutation } from "@apollo/client";
import { EDITAR_GIRO } from "../../services/apollo/gql/giro/editarGiro";

export function ModalGiro({
    giros,
    refetch,
    loading,
    handleClose,
    show,
    ids,
    borrarIds
}) {
    // CONSTANTES
    const estadoInicialFomularioNuevoGiro = {
        nombres: "",
        apellidos: "",
        tipoDocumento: "",
        numeroDocumento: "",
        banco: "",
        tipoCuenta: "",
        numeroCuenta: "",
        valorGiro: "",
        estadoGiro: "",
    };

    const voyAEditarUnGiro = ids.giro ? true : false;

    const giroSeleccionado = giros.find(giro => giro.id === ids.giro);

    const estadoInicialGiro = giroSeleccionado || estadoInicialFomularioNuevoGiro;

    const { sesionData: { rol } } = useSesionContext();

    // HOOKS
    const [editarGiro, editarGiroMutation] = useMutation(EDITAR_GIRO);
    const [giro, setGiro] = useState(estadoInicialGiro);
    const [validated, setValidated] = useState(false);

    const loadingMutation = editarGiroMutation.loading;

    const desactivado = giro.estadoGiro !== "PENDIENTE";

    // MANEJADORES
    const handleSubmit = async (event) => {
        event.preventDefault();
        const camposDelGiroAEditar = dateJSONupdate(giroSeleccionado, giro);
        const cantidadDeCamposAEditar = Object.keys(camposDelGiroAEditar).length;

        if (cantidadDeCamposAEditar > 0) {
            if (voyAEditarUnGiro) {
                await editarGiro({
                    variables: {
                        id: ids.giro,
                        giro: camposDelGiroAEditar
                    },
                    onCompleted: () => {
                        swal("Editado!", "El giro ha sido editado.", "success");
                        handleCerrar();
                        refetch();
                    },
                    onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
                });
            }
            else swal("Error!", "Seleccione un giro!", "error");
        }
        else swal("Error!", "No ha editado ningun campo!", "error");
    };

    // MANEJADORES
    const handleCerrar = () => {
        setValidated(false); // BORRA LA REVISION DE LOS CAMPOS DEL FORMULARIO
        borrarIds();
        handleClose(); // CIERRA EL MODAL - IMPORTANTE QUE CIERRE EL MODAL Y DEJE LA VAR SHOW EN FALSE PARA QUE CUANDO VUELVA A RENDERIZAR ASESORES.JSX NO RENDERICE ESTE COMPONENTE.
    };

    const handleInputChange = ({ target: { name, value } }) => {
        setGiro({ ...giro, [name]: value });
    };

    return (
        <Modal
            show={loading ? false : show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg">

            <Modal.Header>
                <Modal.Title>Editar Giro</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form validated={validated}>
                    <Row className="mb-3">
                        <Nombres
                            md={6}
                            onChange={(e) => handleInputChange(e)}
                            value={giro.nombres}
                            disabled={desactivado} />

                        <Apellidos
                            md={6}
                            onChange={(e) => handleInputChange(e)}
                            value={giro.apellidos}
                            disabled={desactivado} />
                    </Row>

                    <Row className="mb-3">
                        <TipoDocumento
                            value={giro.tipoDocumento}
                            onChange={(e) => handleInputChange(e)}
                            md={6}
                            disabled={desactivado} />

                        <NumeroDocumento
                            value={giro.numeroDocumento}
                            onChange={(e) => handleInputChange(e)}
                            md={6}
                            disabled={desactivado} />
                    </Row>

                    <Row className="mb-3">
                        <Banco
                            value={giro.banco}
                            onChange={(e) => handleInputChange(e)}
                            md={4}
                            disabled={desactivado} />

                        <TipoCuenta
                            value={giro.tipoCuenta}
                            onChange={(e) => handleInputChange(e)}
                            md={4}
                            disabled={desactivado} />

                        <NumeroCuenta
                            value={giro.numeroCuenta}
                            onChange={(e) => handleInputChange(e)}
                            md={4}
                            disabled={desactivado} />
                    </Row>

                    <Row className="mb-3">
                        <ValorGiro
                            value={giro.valorGiro}
                            onChange={(e) => handleInputChange(e)}
                            md={3}
                            disabled={true} />

                        {rol !== "USUARIO"
                            ? <EstadoGiro
                                value={giro.estadoGiro}
                                onChange={(e) => handleInputChange(e)}
                                md={3} />
                            : null}
                    </Row>
                </Form>

            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={handleCerrar}>
                    Cerrar
                </Button>

                <Button
                    variant="success"
                    onClick={handleSubmit}
                    disabled={loadingMutation}>
                    {loadingMutation ? <Cargando /> : "Aceptar"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}