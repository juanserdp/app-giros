import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { currencyFormatter } from "../../util/currencyFormatter";
// import { parseNumberFormatToNumber } from '../../util/parseNumberFormatToNumber';
import { modificarInputValue } from "../../util/modificarInputValue";
import { bancos } from "../../assets/constants/bancos";
import { Sesion } from "../../util/Sesion";
export function FormGiro({
  validated,
  giro,
  isNotAllowedChangeInput,
  setGiro,
}) {
  const sesion = new Sesion();
  const rol = sesion.getRol();

  // ESTADOS
  const [form, setForm] = useState(giro);

  // MANEJADORES
  const handleInputChange = (event, name) => {
    setForm({ ...form, [name]: event.target.value });
    setGiro({ ...form, [name]: event.target.value });
  };
  return (
    <Form noValidate validated={validated}>
      <Row className="mb-3">
        <Form.Group as={Col} md="5" controlId="validationNombres">
          <Form.Label>Nombres</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Ingrese sus nombres..."
            autoFocus
            onChange={(e) => handleInputChange(e, "nombres")}
            value={form.nombres}
            disabled={
              form.estadoGiro === "PENDIENTE" ? false : isNotAllowedChangeInput
            }
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
            disabled={
              form.estadoGiro === "PENDIENTE" ? false : isNotAllowedChangeInput
            }
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
            value={form.tipoDocumento}
            disabled={
              form.estadoGiro === "PENDIENTE" ? false : isNotAllowedChangeInput
            }
          >
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
          <InputGroup>
            <Form.Control
              required
              type="number"
              placeholder="Ingrese su numero de documento..."
              onChange={(e) => handleInputChange(e, "numeroDocumento")}
              value={form.numeroDocumento}
              disabled={
                form.estadoGiro === "PENDIENTE"
                  ? false
                  : isNotAllowedChangeInput
              }
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
            disabled={
              form.estadoGiro === "PENDIENTE" ? false : isNotAllowedChangeInput
            }
            onChange={(e) => handleInputChange(e, "banco")}
            value={form.banco}
          >
            <option value="">Elige el banco...</option>
            {bancos.map((banco, indice) => {
              return (
                <option key={indice} value={banco}>
                  {banco}
                </option>
              );
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
            disabled={
              form.estadoGiro === "PENDIENTE" ? false : isNotAllowedChangeInput
            }
            onChange={(e) => handleInputChange(e, "tipoCuenta")}
            value={form.tipoCuenta}
          >
            <option value="">Elige el tipo de cuenta...</option>
            <option value="AHORROS">AHORROS</option>
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
            disabled={
              form.estadoGiro === "PENDIENTE" ? false : isNotAllowedChangeInput
            }
          />
          <Form.Control.Feedback type="invalid">
            Este campo es obligatorio
          </Form.Control.Feedback>
          <Form.Control.Feedback>Okey!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="validationSaldo">
          <Form.Label>Valor</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Ingrese el saldo"
            onChange={(e) => {
              handleInputChange(
                {
                  target: {
                    value: modificarInputValue(e.target.value),
                  },
                },
                "valorGiro"
              );
            }}
            value={
              form.valorGiro ? currencyFormatter.format(form.valorGiro) : ""
            }
            disabled={true}
          />
          <Form.Control.Feedback type="invalid">
            Este campo es obligatorio
          </Form.Control.Feedback>
          <Form.Control.Feedback>Okey!</Form.Control.Feedback>
        </Form.Group>

        {/* {(rol !== "USUARIO") ? (<Form.Group
                    as={Col}
                    md="3"
                    controlId="validationNombres"
                >
                    <Form.Label>Comprobate de Pago</Form.Label>
                    <Form.Control
                        required
                        type="file"
                        name="image"
                        // onChange={(e) => handleInputChange(e, "comprobantePago")}
                        // value={form.comprobantePago}
                    />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                </Form.Group>) : null} */}

        <Form.Group as={Col} md="3" controlId="validationEstado">
          <Form.Label>Estado</Form.Label>
          <Form.Select
            required
            disabled={
              rol === "OPERARIO"
                ? false
                : form.estadoGiro === "PENDIENTE"
                ? false
                : isNotAllowedChangeInput
            }
            onChange={(e) => handleInputChange(e, "estadoGiro")}
            value={form.estadoGiro}
          >
            <option value="">Elige estado...</option>
            <option value="PENDIENTE">PENDIENTE</option>
            <option value="EN PROCESO">EN PROCESO</option>
            <option value="COMPLETADO">COMPLETADO</option>
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
