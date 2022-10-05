import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { bancos } from "../assets/constants/bancos";
import { currencyFormatter } from "../util/currencyFormatter";
import { modificarInputValue } from "../util/modificarInputValue";

const textStyleH2 = {
    fontWeight: "500",
    fontSize: "2rem",
    fontFamily: "'Roboto Slab', serif",
    color: "white",
    width: "100%", 
    borderBottom: "2px solid #0d6efd", 
    outlineWidth: "10px"
};

export function FormEnviarGiros({
    // handleSubmit,
    validated,
    handleInputChange,
    form,
    usuario
}) {
    return (
        <Form className="mx-5 "
            validated={validated}
            //onSubmit={handleSubmit} 
            >
            <Row className="mb-3">
                <h3 className="mb-3 p-3 rounded" style={textStyleH2}>Datos personales</h3>
                <Form.Group
                    as={Col}
                    md="4"
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
                <Form.Group as={Col} md="4" controlId="validationApellidos">
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
                <Form.Group as={Col} md="4" controlId="validationTipoDocumento">
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
                <Form.Group as={Col} md="4" controlId="validationNumeroDocumento">
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
                <h3 className="mb-3 p-3 rounded" style={textStyleH2}>Datos Bancarios</h3>

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
            <Row className="mb-3">
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
            <Row className="mb-3">
                <h3 className="mb-3 p-3 rounded" style={textStyleH2}>Datos de Envio</h3>
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
                        value={(form.valorGiro) ? currencyFormatter.format(form.valorGiro * 1 / usuario.usuario.tasaVenta) : ""}
                        disabled={true}
                    />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                </Form.Group>
            </Row>
        </Form>
    )
}