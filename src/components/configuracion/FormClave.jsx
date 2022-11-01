import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import swal from "sweetalert";
import { useSesionContext } from "../../providers/SesionProvider";
import { EDITAR_ASESOR } from "../../services/apollo/gql/asesor/editarAsesor";
import { EDITAR_USUARIO } from "../../services/apollo/gql/usuario/editarUsuario";
import { handleError } from "../../util/handleError";
import { validarCamposNotNull } from "../../util/validarCamposNotNull";
import { Cargando } from "../Cargando";
import { Clave } from "../forms/Clave";

export function FormClave() {

    // CONSTANTES
    const estadoInicialUsuario = {
        clave: ""
    };

    // HOOKS
    const [usuario, setUsuario] = useState(estadoInicialUsuario);
    const [editarAsesor, editarAsesorInfo] = useMutation(EDITAR_ASESOR);
    const [editarUsuario, editarUsuarioInfo] = useMutation(EDITAR_USUARIO);
    const { sesionData: { id, rol } } = useSesionContext();

    const loading = editarAsesorInfo.loading || editarUsuarioInfo.loading;

    // MANEJADORES
    const handleSubmit = async () => {
        if (validarCamposNotNull(usuario)) {
            if (rol === "ASESOR") await editarAsesor({
                variables: {
                    id,
                    asesor: usuario,
                },
                onCompleted: () => swal("Editado!", "El asesor ha sido editado.", "success"),
                onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError }),
            });
            else if (rol === "USUARIO") await editarUsuario({
                variables: {
                    id,
                    usuario: usuario,
                },
                onCompleted: () => swal("Editado!", "El usuario ha sido editado.", "success"),
                onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError }),
            });

        }
        else swal("Error!", "No ha editado ningun campo!", "error");
    };

    const handleInputChange = ({ target: { name, value } }) => {
        setUsuario({ ...usuario, [name]: value });
    };

    return (
        <Form>
            <Row className="m-3">
                <Clave
                    value={usuario.clave}
                    onChange={(e) => handleInputChange(e)}
                    md={6} />
            </Row>

            <Button
                className="m-3"
                variant="primary"
                onClick={handleSubmit}
                disabled={loading}>
                {(loading) ? <Cargando /> : "Editar"}
            </Button>
        </Form>
    )
};