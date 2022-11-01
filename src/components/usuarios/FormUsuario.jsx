import { useState } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { currencyFormatter } from '../../util/currencyFormatter';
import { parseNumberFormatToNumber } from '../../util/parseNumberFormatToNumber';
import { modificarInputValue } from "../../util/modificarInputValue";
import { Nombres } from "../forms/Nombres";
import { Apellidos } from "../forms/Apellidos";
import { TipoDocumento } from "../forms/TipoDocumento";
import { NumeroDocumento } from "../forms/NumeroDocumento";
import { Clave } from "../forms/Clave";
import { Estado } from "../forms/Estado";
import { Deuda } from "../forms/Deuda";
import { TasaVenta } from "../forms/TasaVenta";
import { CapacidadPrestamo } from "../forms/CapacidadPrestamo";
import { Saldo } from "../forms/Saldo";
export function FormUsuario({
    handleSubmit,
    validated,
    usuario,
    setUsuario,
    isEditing
}) {
    // ESTADOS
    const [form, setForm] = useState(usuario);

    // MENJADORES
    const handleInputChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
        setUsuario({ ...form, [name]: value });
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} >
            <Row className="mb-3 mx-5" >
                <Nombres
                    md={6}
                    onChange={(e) => handleInputChange(e)}
                    value={form.nombres} />
                <Apellidos
                    md={6}
                    onChange={(e) => handleInputChange(e)}
                    value={form.apellidos} />
            </Row>

            <Row className="mb-3 mx-5">
                <TipoDocumento
                    value={form.tipoDocumento}
                    onChange={(e) => handleInputChange(e)}
                    md={6} />
                <NumeroDocumento
                    value={form.numeroDocumento}
                    onChange={(e) => handleInputChange(e)}
                    md={6} />
            </Row>

            <Row className="mb-3 mx-5">
                <Clave
                    value={form.clave}
                    onChange={(e) => handleInputChange(e)}
                    md={6} />
                {(isEditing) ? (
                    <Estado
                        value={form.estado}
                        onChange={(e) => handleInputChange(e)}
                        md={6} />
                ) : null}
            </Row>

            <Row className="mb-3 mx-5">
                <Saldo
                    value={form.saldo}
                    onChange={(e) => handleInputChange(e)}
                    md={3} />

                {(isEditing) ? (
                    <Deuda
                        value={form.deuda}
                        onChange={(e) => handleInputChange(e)}
                        md={3} />
                ) : null}

                <TasaVenta
                    value={form.tasaVenta}
                    onChange={(e) => handleInputChange(e)}
                    md={3} />

                <CapacidadPrestamo
                    value={form.capacidadPrestamo}
                    onChange={(e) => handleInputChange(e)}
                    md={3} />
            </Row>
        </Form>
    );
};