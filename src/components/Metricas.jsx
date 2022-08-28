import { Row } from "react-bootstrap";

export function Metricas({ rol, form }) {

    if (rol === "ADMINISTRADOR") {

    }
    else if (rol === "ASESOR") {
        return (
            <Row className="mb-3 ">
                {(rol === "ASESOR") ? (<p><b>No. Usuarios:</b><span>&nbsp;{form.usuarios.length}</span></p>) : null}
            </Row>)
    }
    return (
        <>
            <p><b>No. Giros:</b><span>{(form.apellidos) ? (form.giros.lenght) : ""}</span></p>
        </>
    );
}