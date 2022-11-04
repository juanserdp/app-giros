import { useState } from "react";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { Nombres } from "../forms/Nombres";
import { Apellidos } from "../forms/Apellidos";
import { useSesionContext } from "../../providers/SesionProvider";
import { TipoDocumento } from "../forms/TipoDocumento";
import { NumeroDocumento } from "../forms/NumeroDocumento";
import { Banco } from "../forms/Banco";
import { TipoCuenta } from "../forms/TipoCuenta";
import { NumeroCuenta } from "../forms/NumeroCuenta";
import { ValorGiro } from "../forms/ValorGiro";
import { EstadoGiro } from "../forms/EstadoGiro";

export function FormGiro({
  validated,
  giro,
  isNotAllowedChangeInput,
  setGiro,
}) {
  // HOOKS
  const { sesionData: { rol } } = useSesionContext();
  const [form, setForm] = useState(giro);

  // MANEJADORES
  const handleInputChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
    setGiro({ ...form, [name]: value });
  };

  const desactivado = form?.estadoGiro === "PENDIENTE" ? false : isNotAllowedChangeInput;

  return (
    <Form noValidate validated={validated}>
      <Row className="mb-3">
        <Nombres
          md={6}
          onChange={(e) => handleInputChange(e)}
          value={form?.nombres}
          disabled={desactivado} />

        <Apellidos
          md={6}
          onChange={(e) => handleInputChange(e)}
          value={form?.apellidos}
          disabled={desactivado} />
      </Row>

      <Row className="mb-3">
        <TipoDocumento
          value={form?.tipoDocumento}
          onChange={(e) => handleInputChange(e)}
          md={6}
          disabled={desactivado} />

        <NumeroDocumento
          value={form?.numeroDocumento}
          onChange={(e) => handleInputChange(e)}
          md={6}
          disabled={desactivado} />
      </Row>

      <Row className="mb-3">
        <Banco
          value={form?.banco}
          onChange={(e) => handleInputChange(e)}
          md={4}
          disabled={desactivado} />

        <TipoCuenta
          value={form?.tipoCuenta}
          onChange={(e) => handleInputChange(e)}
          md={4}
          disabled={desactivado} />

        <NumeroCuenta
          value={form?.numeroCuenta}
          onChange={(e) => handleInputChange(e)}
          md={4}
          disabled={desactivado} />
      </Row>

      <Row className="mb-3">
        <ValorGiro
          value={form?.valorGiro}
          onChange={(e) => handleInputChange(e)}
          md={3}
          disabled={true} />

        {rol !== "USUARIO"
          ? <EstadoGiro
            value={form?.estadoGiro}
            onChange={(e) => handleInputChange(e)}
            md={3} />
          : null}
      </Row>
    </Form>
  );
}
