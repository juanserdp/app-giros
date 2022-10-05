import { useState } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { currencyFormatter } from "../../util/currencyFormatter";
import { modificarInputValue } from "../../util/modificarInputValue";
import { parseNumberFormatToNumber } from "../../util/parseNumberFormatToNumber";
import { FeedBack } from "../Feedback";

export function FormAsesor({
    handleSubmit,
    validated,
    asesor,
    isNotAllowedChangeInputBalance,
    setAsesor,
    isEditing
}) {
    // ESTADOS
    const [form, setForm] = useState(asesor);

    // MANEJADORES
    const handleInputChange = (event, name) => {
        // GUARDAR
        setForm({ ...form, [name]: event.target.value });
        setAsesor({ ...form, [name]: event.target.value });
    }
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} >
            <Row className="mb-3 mx-5">
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
                        value={form.nombres}
                    />
                    <FeedBack />
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
                    <FeedBack />
                </Form.Group>
            </Row>
            <Row className="mb-3 mx-5">
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
                    <FeedBack />
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
                        <FeedBack />
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-3 mx-5">
                <Form.Group as={Col} md="5" controlId="validationClave">
                    <Form.Label>Contraseña</Form.Label>
                    <InputGroup >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Ingrese su contraseña..."
                            onChange={(e) => handleInputChange(e, "clave")}
                            value={form.clave}
                        />
                        <FeedBack />
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="validationSaldo">
                    <Form.Label>Saldo</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Ingrese el saldo"
                        onChange={(e) => {
                            const str = modificarInputValue(e.target.value);
                            handleInputChange({
                                target: {
                                    value: parseNumberFormatToNumber(str)
                                }
                            }, "saldo");
                        }}
                        value={(form.saldo) ? currencyFormatter.format(form.saldo) : ""}
                        disabled={isNotAllowedChangeInputBalance}
                    />
                    <FeedBack />
                </Form.Group>
            </Row>
            <Row className="mb-3 mx-5">
                {(isEditing) ? (
                    <Form.Group as={Col} md="5" controlId="validationEstado">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select
                            required
                            disabled={isNotAllowedChangeInputBalance}
                            onChange={(e) => handleInputChange(e, "estado")}
                            value={form.estado}>
                            <option value="">Elige el estado...</option>
                            <option value="ACTIVO" >ACTIVO</option>
                            <option value="INACTIVO">INACTIVO</option>
                        </Form.Select>
                        <FeedBack />
                    </Form.Group>
                ) : null}
            </Row>
        </Form>
    );
}