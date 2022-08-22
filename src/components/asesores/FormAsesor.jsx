import { useState } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export function FormAsesor({ initialState, handleSubmit, validated, asesorPorId, isNotAllowedChangeInputBalance, setAsesor }) {

    // CREO EL ESTADO FORM QUE GUARDA EL UN OBJETO CON LOS DATOS 
    // DEL FORMULARIO, SI SE LE PASA UN asesor LOS COMPLETA CON ESO
    // SI NO, SE LE INTEGRA UN ESTADO INICIAL
    const [formAsesor, setFormAsesor] = useState(asesorPorId[0] || initialState);

    // ESTE ES UN MANEJADOR QUE REACCIONA AL CAMBIO EN EL FORMULARIO
    const handleInputChange = (event, name) => {
        // SETEA LA INFORMACION DE LOS CAMPOS DEL FOMULARIO AL ESTADO formAsesor
        setFormAsesor({ ...formAsesor, [name]: event.target.value });

        // SETEA LA INFORMACION DE LOS CAMPOS DEL FOMULARIO AL ESTADO asesor QUE
        // SERA EL QUE SE ENVIE PARA CREAR O EDITAR
        setAsesor({ ...formAsesor, [name]: event.target.value });
    }
    // // ESTO ES EL FORM ACTIVA LA VALIDACION DE ARRIBA
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} >
            <Row className="mb-3">
                <Form.Group
                    as={Col}
                    md="5"
                    controlId="validationNombres"
                >
                    {/* CUANDO SE RENDERIZA EL FORMULARIO HACE FOCUS A ESTE INPUT */}
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Ingrese sus nombres..."
                        autoFocus
                        onChange={(e) => handleInputChange(e, "nombres")}
                        value={formAsesor.nombres}
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
                        value={formAsesor.apellidos}
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
                        value={formAsesor.tipoDocumento}>
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
                            value={formAsesor.numeroDocumento}
                        />
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="5" controlId="validationClave">
                    <Form.Label>Contraseña</Form.Label>
                    <InputGroup >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Ingrese su contraseña..."
                            onChange={(e) => handleInputChange(e, "clave")}
                            value={formAsesor.clave}
                        />
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="5" controlId="validationSaldo">
                    <Form.Label>Saldo</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        placeholder="Ingrese el saldo"
                        onChange={(e) => handleInputChange(e, "saldo")}
                        value={formAsesor.saldo}
                        disabled={isNotAllowedChangeInputBalance}
                    />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="validationEstado">
                    <Form.Label>Estado</Form.Label>
                    <Form.Select
                        required
                        disabled={isNotAllowedChangeInputBalance}
                        onChange={(e) => handleInputChange(e, "estado")}
                        value={formAsesor.estado}>
                        <option value="">Elige el estado...</option>
                        <option value="ACTIVO" >ACTIVO</option>
                        <option value="INACTIVO">INACTIVO</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                </Form.Group>
            </Row>
        </Form>
    );
}