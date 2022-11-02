import { Form, Row } from "react-bootstrap";
import { styleH3 } from "../../assets/styles/fuentes";
import { Apellidos } from "./Apellidos";
import { Banco } from "./Banco";
import { MontoBolivares } from "./MontoBolivares";
import { Nombres } from "./Nombres";
import { NumeroCuenta } from "./NumeroCuenta";
import { NumeroDocumento } from "./NumeroDocumento";
import { TipoCuenta } from "./TipoCuenta";
import { TipoDocumento } from "./TipoDocumento";
import { ValorGiro } from "./ValorGiro";

const textStyleH2 = {
  fontWeight: "500",
  fontSize: "2rem",
  fontFamily: "'Roboto Slab', serif",
  color: "black",
  width: "100%",
};

export function FormEnviarGiros({
  validated,
  handleInputChange,
  form,
  usuario,
}) {
  return (
    <Form
      className="mx-5 "
      validated={validated}>
      <Row className="mb-3" >
        <h3 className="mb-3 p-3 rounded" style={styleH3}>
          Datos personales
        </h3>
        <Nombres
          value={form.nombres}
          onChange={(e) => handleInputChange(e)}
          md={4} />

        <Apellidos
          value={form.apellidos}
          onChange={(e) => handleInputChange(e)}
          md={4} />
      </Row>

      <Row className="mb-3">
        <TipoDocumento
          value={form.tipoDocumento}
          onChange={(e) => handleInputChange(e)}
          md={4} />

        <NumeroDocumento
          value={form.numeroDocumento}
          onChange={(e) => handleInputChange(e)}
          md={4} />
      </Row>

      <Row className="mb-3">
        <h3 className="mb-3 p-3 rounded" style={styleH3}>
          Datos Bancarios
        </h3>

        <TipoCuenta
          value={form.tipoCuenta}
          onChange={(e) => handleInputChange(e)}
          md={4} />

        <NumeroCuenta
          value={form.numeroCuenta}
          onChange={(e) => handleInputChange(e)}
          md={4} />
      </Row>

      <Row className="mb-3">
        <Banco
          value={form.banco}
          onChange={(e) => handleInputChange(e)}
          md={4} />
      </Row>

      <Row className="mb-3">
        <h3 className="mb-3 p-3 rounded" style={styleH3}>
          Datos de Envio
        </h3>

        <ValorGiro
          value={form.valorGiro}
          onChange={(e) => handleInputChange(e)}
          md={4} />

        <MontoBolivares
          value={(form.valorGiro * 1) / usuario.usuario.tasaVenta}
          onChange={(e) => handleInputChange(e)}
          md={4} />
      </Row>
    </Form >
  );
}
