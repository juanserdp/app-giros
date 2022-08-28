import { useState } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { currencyFormatter } from '../../util/currencyFormatter';
import { parseNumberFormatToNumber } from '../../util/parseNumberFormatToNumber';
import { modificarInputValue } from "../../util/modificarInputValue";
import { bancos } from "../../assets/constants/bancos";
export function FormGiro({ initialState, handleSubmit, validated, giroPorId, isNotAllowedChangeInput, setUsuario }) {

    const [form, setForm] = useState(giroPorId[0] || initialState);
    const handleInputChange = (event, name) => {
        setForm({ ...form, [name]: event.target.value });
        setUsuario({ ...form, [name]: event.target.value });
    }
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} >
            <Row className="mb-3">
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

            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationEstado">
                    <Form.Label>Banco</Form.Label>
                    <Form.Select
                        required
                        disabled={isNotAllowedChangeInput}
                        onChange={(e) => handleInputChange(e, "banco")}
                        value={form.banco}>
                        <option value="">Elige el banco...</option>
                        {bancos.map((banco, indice) => {
                            return <option  key={indice} value={banco} >{banco}</option>
                        })}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationEstado">
                    <Form.Label>Tipo de Cuenta</Form.Label>
                    <Form.Select
                        required
                        disabled={isNotAllowedChangeInput}
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
            <Row className="mb-3">
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
                        value={(form.valorGiro)?currencyFormatter.format(form.valorGiro):""}
                        disabled={isNotAllowedChangeInput}
                    />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                </Form.Group>



                <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationNombres"
                >
                    <Form.Label>Comprobate de Pago</Form.Label>
                    <Form.Control
                        required
                        type="file"
                        onChange={(e) => handleInputChange(e, "comprobantePago")}
                        value={form.comprobantePago}
                    />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                </Form.Group>


                <Form.Group as={Col} md="4" controlId="validationSaldo">
                    <Form.Label>Fecha de Envio</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        placeholder="Ingrese el tope"
                        value={form.fechaEnvio}
                        disabled={isNotAllowedChangeInput}
                    />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                </Form.Group>
            </Row>
        </Form>
    );
}