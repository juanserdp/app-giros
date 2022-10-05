import { useState } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { currencyFormatter } from '../../util/currencyFormatter';
import { parseNumberFormatToNumber } from '../../util/parseNumberFormatToNumber';
import { modificarInputValue } from "../../util/modificarInputValue";
export function FormUsuario({
    handleSubmit,
    validated,
    usuario,
    isNotAllowedChangeInputBalance,
    setUsuario,
    isEditing
}) {
    // ESTADOS
    const [form, setForm] = useState(usuario);

    // MENJADORES
    const handleInputChange = (event, name) => {
        setForm({ ...form, [name]: event.target.value });
        setUsuario({ ...form, [name]: event.target.value });
    }
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} >
            <Row className="mb-3 mx-5" >
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
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
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
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                    </Form.Group>
                ) : null}
            </Row>
            <Row className="mb-3 mx-5">
                <Form.Group as={Col} md="3" controlId="validationSaldo">
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
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                </Form.Group>
                {(isEditing) ? (
                    <Form.Group as={Col} md="3" controlId="validationSaldo">
                        <Form.Label>Deuda</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Ingrese la deuda"
                            onChange={(e) => {
                                const str = modificarInputValue(e.target.value);
                                handleInputChange({
                                    target: {
                                        value: parseNumberFormatToNumber(str)
                                    }
                                }, "deuda");
                            }}
                            value={(form.deuda) ? currencyFormatter.format(form.deuda) : ""}
                            disabled={isNotAllowedChangeInputBalance}
                        />
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                    </Form.Group>
                ) : null}

                <Form.Group as={Col} md="3" controlId="validationClave">
                    <Form.Label>Tasa Venta</Form.Label>
                    <InputGroup >
                        <Form.Control
                            required
                            type="number"
                            placeholder="Ingrese la tasa de venta..."
                            onChange={(e) => handleInputChange(e, "tasaVenta")}
                            value={form.tasaVenta}
                        />
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationSaldo">
                    <Form.Label>Max. Prestamo</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Ingrese el tope"
                        onChange={(e) => {
                            const str = modificarInputValue(e.target.value);
                            handleInputChange({
                                target: {
                                    value: parseNumberFormatToNumber(str)
                                }
                            }, "capacidadPrestamo");
                        }}
                        value={(form.capacidadPrestamo) ? currencyFormatter.format(form.capacidadPrestamo) : ""}
                        disabled={isNotAllowedChangeInputBalance}
                    />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                </Form.Group>

            </Row>
        </Form>
    );
};