import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { bancos } from "../assets/constants/bancos";
import { NavBar } from "../components/NavBar";
import { useCargarDataForm } from "../hooks/useCargarDataForm";
import { CREAR_GIRO } from "../services/apollo/gql/giro/crearGiro";
import { OBTENER_USUARIO_POR_ID } from "../services/apollo/gql/usuario/obtenerUsuarioPorId";
import { currencyFormatter } from "../util/currencyFormatter";
import { handleError } from "../util/handleError";
import { modificarInputValue } from "../util/modificarInputValue";
import { Sesion } from "../util/Sesion";
import { validarCamposNotNull } from "../util/validarCamposNotNull";

export default function EnviarGiro() {

    const sesion = new Sesion();
    const idUsuario = sesion.getUid();
    const initialStateTasa = {
        asesor: {
            tasaVenta: ""
        }
    }
    const { loading, data, error } = useQuery(OBTENER_USUARIO_POR_ID, {
        variables: { id: idUsuario },
    });
    const { id, valorGiro } = useParams();

    const [usuario, setUsuario] = useCargarDataForm(initialStateTasa, data);
    const initialState = {
        nombres: "",
        apellidos: "",
        tipoDocumento: "",
        numeroDocumento: "",
        banco: "",
        tipoCuenta: "",
        numeroCuenta: "",
        valorGiro: valorGiro || "",
    };
    const [form, setForm] = useState(initialState);

    const handleInputChange = (event, name) => {
        setForm({ ...form, [name]: event.target.value });
    }

    const [crearGiro] = useMutation(CREAR_GIRO);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (id) {
            alert();
        }
    }
    const handleEnviar = async () => {
        if (validarCamposNotNull(form)) {
            await crearGiro({
                variables: {
                    ...form,
                    usuario: idUsuario,
                    valorGiro: Number(form.valorGiro),
                    tasaCompra: Number(usuario.asesor.tasaVenta)
                },
                onCompleted: () => {
                    swal("Enviado!", "Su giro ha sido enviado con exito", "success");
                },
                onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
            })
        }
        else swal("Error!", "Todos los campos son obligatorios!", "error");
    }

    const [validated, setValidated] = useState(false);

    return (
        <>
            <NavBar />
            <Container className="my-3 p-0" style={{ border: "2px solid gray" }}>
                <h2 className="mb-3 p-2" style={{ width: "100%", borderBottom: "2px solid gray", background: "#bdc3c7", outlineWidth: "10px" }}>Datos de la persona que recibe el dinero</h2>
                <Form className="mx-5" noValidate validated={validated} onSubmit={handleSubmit} >
                    <Row className="mb-3">
                        <h3 className="mb-3">Datos personales</h3>
                        <Form.Group
                            as={Col}
                            md="5"
                            controlId="validationNombres"
                        >
                            <Form.Label>Nombres</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Ingrese sus nombres..."
                                autoFocus
                                onChange={(e) => handleInputChange(e, "nombres")}
                                value={form.nombres}
                            />
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group as={Col} md="5" controlId="validationApellidos">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Ingrese sus apellidos..."
                                onChange={(e) => handleInputChange(e, "apellidos")}
                                value={form.apellidos}
                            />
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>


                    <Row className="mb-3">

                        <Form.Group as={Col} md="5" controlId="validationTipoDocumento">
                            <Form.Label>Tipo de Documento</Form.Label>
                            <Form.Select
                                required
                                aria-label="Elige tu tipo de documento..."
                                onChange={(e) => handleInputChange(e, "tipoDocumento")}
                                value={form.tipoDocumento}>
                                <option value="">Elige el tipo de documento...</option>
                                <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                                <option value="Cedula de Ciudadania">Cédula de Ciudadanía</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="5" controlId="validationNumeroDocumento">
                            <Form.Label>Numero de Documento</Form.Label>
                            <InputGroup >
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Ingrese su numero de documento..."
                                    onChange={(e) => handleInputChange(e, "numeroDocumento")}
                                    value={form.numeroDocumento}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Este campo es obligatorio
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <hr />
                    <Row className="mb-3">
                        <h3 className="mb-3">Datos Bancarios</h3>

                        <Form.Group as={Col} md="4" controlId="validationEstado">
                            <Form.Label>Tipo de Cuenta</Form.Label>
                            <Form.Select
                                required
                                disabled={false}
                                onChange={(e) => handleInputChange(e, "tipoCuenta")}
                                value={form.tipoCuenta}>
                                <option value="">Elige el tipo de cuenta...</option>
                                <option value="AHORROS" >AHORROS</option>
                                <option value="CORRIENTE">CORRIENTE</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationSaldo">
                            <Form.Label>Numero de Cuenta</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Ingrese su numero de cuenta..."
                                onChange={(e) => handleInputChange(e, "numeroCuenta")}
                                value={form.numeroCuenta}
                            />
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md="4" controlId="validationEstado">
                            <Form.Label>Banco</Form.Label>
                            <Form.Select
                                required
                                disabled={false}
                                onChange={(e) => handleInputChange(e, "banco")}
                                value={form.banco}>
                                <option value="">Elige el banco...</option>
                                {bancos.map((banco, indice) => {
                                    return <option key={indice} value={banco} >{banco}</option>
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <hr />
                    <Row className="mb-3">
                        <h3 className="mb-3">Datos de Envio</h3>
                        <Form.Group as={Col} md="4" controlId="validationSaldo">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Ingrese el saldo"
                                onChange={(e) => {
                                    handleInputChange({
                                        target: {
                                            value: modificarInputValue(e.target.value)
                                        }
                                    }, "valorGiro");
                                }}
                                value={(form.valorGiro) ? currencyFormatter.format(form.valorGiro) : ""}
                                disabled={false}
                            />
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationSaldo">
                            <Form.Label>Dinero en Bolivares</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Ingrese el saldo"
                                value={178}
                                disabled={true}
                            />
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </Form>
                <Button className="my-3 mx-5" onClick={handleEnviar}>Enviar</Button>
            </Container>
        </>
    );
}