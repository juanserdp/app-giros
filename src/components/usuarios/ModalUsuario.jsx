import swal from "sweetalert";
import { useState } from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import { handleError } from "../../util/handleError";
import { validarCamposNotNull } from "../../util/validarCamposNotNull";
import { dateJSONupdate } from "../../util/dateJSONupdate";
import { Cargando } from "../Cargando";
import { Nombres } from "../forms/Nombres";
import { Apellidos } from "../forms/Apellidos";
import { TipoDocumento } from "../forms/TipoDocumento";
import { NumeroDocumento } from "../forms/NumeroDocumento";
import { Clave } from "../forms/Clave";
import { Estado } from "../forms/Estado";
import { Saldo } from "../forms/Saldo";
import { Deuda } from "../forms/Deuda";
import { TasaVenta } from "../forms/TasaVenta";
import { CapacidadPrestamo } from "../forms/CapacidadPrestamo";
import { useMutation } from "@apollo/client";
import { CREAR_USUARIO } from "../../services/apollo/gql/usuario/crearUsuario";
import { EDITAR_USUARIO } from "../../services/apollo/gql/usuario/editarUsuario";
import { UsarTasaDelAsesor } from "../forms/UsarTasaDelAsesor";

export function ModalUsuario({
    usuarios,
    refetch,
    loading,
    handleClose,
    show,
    ids,
    borrarIds
}) {
    // CONSTANTES
    const estadoInicialFormularioNuevoUsuario = {
        nombres: "",
        apellidos: "",
        tipoDocumento: "",
        numeroDocumento: "",
        clave: "",
        saldo: "",
        capacidadPrestamo: "",
        tasaVenta: ""
    };

    // CONSTANTES

    const voyAEditarUnUsuario = (ids.usuario) ? true : false; //(id && asesor) ? true : false;

    const usuarioSeleccionado = usuarios.find(usuario => usuario.id === ids.usuario);
    const estadoInicialUsuario = usuarioSeleccionado || estadoInicialFormularioNuevoUsuario;

    // HOOKS
    const [usuario, setUsuario] = useState(estadoInicialUsuario);
    const [validated, setValidated] = useState(false);
    const [crearUsuario, crearUsuarioMutation] = useMutation(CREAR_USUARIO);
    const [editarUsuario, editarUsuarioMutation] = useMutation(EDITAR_USUARIO);

    const loadingMutation = crearUsuarioMutation.loading || editarUsuarioMutation.loading;

    // FUNCIONES
    const crear = async () => {
        if (validarCamposNotNull(usuario)) {
            await crearUsuario({
                variables: {
                    ...usuario,
                    asesor: ids.asesor
                },
                onCompleted: () => {
                    swal("Creado!", "El usuario ha sido creado.", "success");
                    handleCerrar();
                    refetch();
                },
                onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
            });
        }
        else {
            setValidated(true); // MUESTRA LAS ADVERTENCIAS EN LOS CAMPOS SIN LLENAR
            swal("Error!", "Todos los campos son obligatorios!", "error");
        }
    };

    const editar = async () => {

        const camposDelUsuarioAEditar = dateJSONupdate(usuarioSeleccionado, usuario);
        const cantidadDeCamposAEditar = Object.keys(camposDelUsuarioAEditar).length;

        if (cantidadDeCamposAEditar > 0) {
            await editarUsuario({
                variables: {
                    id: ids.usuario,
                    usuario: camposDelUsuarioAEditar
                },
                onCompleted: () => {
                    swal("Editado!", "El usuario ha sido editado.", "success");
                    handleCerrar();
                    refetch();
                },
                onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
            });
        }
        else swal("Error!", "No ha editado ningun campo!", "error");

    };

    // MANEJADORES
    const handleCerrar = () => {
        setValidated(false); // BORRA LA REVISION DE LOS CAMPOS DEL FORMULARIO
        borrarIds();
        handleClose(); // CIERRA EL MODAL - IMPORTANTE QUE CIERRE EL MODAL Y DEJE LA VAR SHOW EN FALSE PARA QUE CUANDO VUELVA A RENDERIZAR ASESORES.JSX NO RENDERICE ESTE COMPONENTE.
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // PREVIENE UN REINICIO DE PAGINA
        if (voyAEditarUnUsuario) editar();
        else crear();
    };

    const handleInputChange = ({ target: { name, value } }) => {
        setUsuario({ ...usuario, [name]: value });
    };

    return (
        <Modal
            show={loading ? false : show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg">

            <Modal.Header>
                <Modal.Title>{(voyAEditarUnUsuario) ? "Editar Usuario" : "Crear Usuario"}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form validated={validated}>
                    <Row className="mb-3 mx-5" >
                        <Nombres
                            md={6}
                            onChange={(e) => handleInputChange(e)}
                            value={usuario.nombres} />
                        <Apellidos
                            md={6}
                            onChange={(e) => handleInputChange(e)}
                            value={usuario.apellidos} />
                    </Row>

                    <Row className="mb-3 mx-5">
                        <TipoDocumento
                            value={usuario.tipoDocumento}
                            onChange={(e) => handleInputChange(e)}
                            md={6} />
                        <NumeroDocumento
                            value={usuario.numeroDocumento}
                            onChange={(e) => handleInputChange(e)}
                            md={6} />
                    </Row>

                    <Row className="mb-3 mx-5">
                        <Clave
                            value={usuario.clave}
                            onChange={(e) => handleInputChange(e)}
                            md={6} />
                        {(voyAEditarUnUsuario) ? (
                            <Estado
                                value={usuario.estado}
                                onChange={(e) => handleInputChange(e)}
                                md={6} />
                        ) : null}

                    </Row>

                    <Row className="mb-3 mx-5">
                        <Saldo
                            value={usuario.saldo}
                            onChange={(e) => handleInputChange(e)}
                            md={3} />

                        {(voyAEditarUnUsuario) ? (
                            <Deuda
                                value={usuario.deuda}
                                onChange={(e) => handleInputChange(e)}
                                md={3} />
                        ) : null}

                        <TasaVenta
                            value={usuario.tasaVenta}
                            onChange={(e) => handleInputChange(e)}
                            md={3} />

                        <CapacidadPrestamo
                            value={usuario.capacidadPrestamo}
                            onChange={(e) => handleInputChange(e)}
                            md={3} />

                    </Row>

                    <Row className="mb-3 mx-5">
                        {(voyAEditarUnUsuario) ? (
                            <UsarTasaDelAsesor
                                value={usuario.usarTasaDelAsesor}
                                onChange={(e) => handleInputChange(e)}
                                md={6}>
                                Usar tasa general
                            </UsarTasaDelAsesor>
                        ) : null}
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
                    disabled={loadingMutation}
                    onClick={handleSubmit}>
                    {(loadingMutation) ? <Cargando /> : "Aceptar"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}