import { useState } from "react";
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { Clave } from "../forms/Clave";
import { Nombres } from "../forms/Nombres";
import { Apellidos } from "../forms/Apellidos";
import { TipoDocumento } from "../forms/TipoDocumento";
import { NumeroDocumento } from "../forms/NumeroDocumento";
import { Saldo } from "../forms/Saldo";
import { Estado } from "../forms/Estado";

export function FormAsesor({
    handleSubmit,
    validated,
    asesor,
    setAsesor,
    isEditing
}) {
    const [form, setForm] = useState(asesor);

    const handleInputChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
        setAsesor({ ...form, [name]: value });
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} >
            <Row className="mb-3 mx-5">
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

                <Saldo
                    value={form.saldo}
                    onChange={(e) => handleInputChange(e)}
                    md={6} />
            </Row>

            <Row className="mb-3 mx-5">
                {(isEditing) ? (
                    <Estado
                        value={form.estado}
                        onChange={(e) => handleInputChange(e)}
                        md={6} />
                ) : null}
            </Row>
        </Form>
    );
}