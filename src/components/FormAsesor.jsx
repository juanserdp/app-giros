import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from "react";

export function FormAsesor({asesorPorId, isNotAllowedChangeInputBalance, setAsesor }) {
    const [validated, setValidated] = useState(false);
    const initialState = {
        nombres: "",
        apellidos: "",
        tipoDocumento: "",
        numeroDocumento: "",
        clave: "",
        saldo:  0,
        estado:  ""
    }
    const [formAsesor, setFormAsesor] = useState(asesorPorId[0] || initialState);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };
    const handleInputChange = (event, name) => {
        setFormAsesor({ ...formAsesor, [name]: event.target.value });
        setAsesor({ ...formAsesor, [name]: event.target.value });
    }
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group
                    as={Col}
                    md="5"
                    controlId="validationCustom01"
                >
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


                <Form.Group as={Col} md="5" controlId="validationCustom02">
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
                <Form.Group as={Col} md="5" controlId="validationGenero">
                    <Form.Label>Tipo de Documento</Form.Label>
                    <Form.Select
                        required
                        aria-label="Elige tu tipo de documento..."
                        onChange={(e) => handleInputChange(e, "tipoDocumento")}
                        value={formAsesor.tipoDocumento}>
                        <option></option>
                        <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                        <option value="Cedula de Ciudadania">Cédula de Ciudadanía</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                </Form.Group>



                <Form.Group as={Col} md="5" controlId="validationDireccion">
                    <Form.Label>Numero de Documento</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="number"
                            placeholder="Ingrese su direccion..."
                            aria-describedby="inputGroupPrepend"
                            required
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
                <Form.Group as={Col} md="5" controlId="validationCorreo">
                    <Form.Label>Contraseña</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese su contraseña..."
                            aria-describedby="inputGroupPrepend"
                            onChange={(e) => handleInputChange(e, "clave")}
                            value={formAsesor.clave}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>



            <Row className="mb-3">
                <Form.Group as={Col} md="5" controlId="validationNumeroIdentificacion">
                    <Form.Label>Saldo</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        placeholder="Ingrese el saldo"
                        onChange={(e) => {
                            setFormAsesor({ ...formAsesor, saldo: Number(e.target.value) })
                        }}
                        value={formAsesor.saldo}
                        disabled={isNotAllowedChangeInputBalance}
                    />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                </Form.Group>


                <Form.Group as={Col} md="5" controlId="validationGenero">
                    <Form.Label>Estado</Form.Label>
                    <Form.Select
                        disabled={isNotAllowedChangeInputBalance}
                        required aria-label="Elige tu tipo de documento..."
                        onChange={(e) => handleInputChange(e, "estado")}
                        value={formAsesor.estado}>
                        <option></option>
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