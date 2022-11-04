import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import swal from "sweetalert";
import { useSesionContext } from "../../providers/SesionProvider";
import { EDITAR_ASESOR } from "../../services/apollo/gql/asesor/editarAsesor";
import { EDITAR_USUARIO } from "../../services/apollo/gql/usuario/editarUsuario";
import { dateJSONupdate } from "../../util/dateJSONupdate";
import { handleError } from "../../util/handleError";
import { Cargando } from "../Cargando";
import { ValorMinimoGiro } from "../forms/ValorMinimoGiro";

export function FormEnvios({
    datosPersonalesUsuario,
    refetch
}) {
    // CONSTANTES
    const estadoInicialUsuario = {
        valorMinimoGiro: ""
    };

    // HOOKS
    const [usuario, setUsuario] = useState(datosPersonalesUsuario);
    const [editarAsesor, editarAsesorInfo] = useMutation(EDITAR_ASESOR);
    const [editarUsuario, editarUsuarioInfo] = useMutation(EDITAR_USUARIO);
    const { sesionData: { id, rol } } = useSesionContext();

    const loading = editarAsesorInfo.loading || editarUsuarioInfo.loading;

    // MANEJADORES
    const handleSubmit = async () => {

        const camposParaEditar = dateJSONupdate(datosPersonalesUsuario, usuario);
        const tamañoObjeto = Object.keys(camposParaEditar).length;

        if (tamañoObjeto > 0) {
            if (rol === "ASESOR") {
                await editarAsesor({
                    variables: {
                        id,
                        asesor: { ...camposParaEditar },
                    },
                    onCompleted: () => {
                        swal("Editado!", "El asesor ha sido editado.", "success");
                        refetch();
                    },
                    onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError }),
                });
            } else if (rol === "USUARIO") {
                await editarUsuario({
                    variables: {
                        id,
                        usuario: camposParaEditar,
                    },
                    onCompleted: () => {
                        swal("Editado!", "El usuario ha sido editado.", "success");
                        refetch();
                    },
                    onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError }),
                });
            }
        }
        else swal("Error!", "No ha editado ningun campo!", "error");
    };

    const handleInputChange = ({ target: { name, value } }) => {
        setUsuario({ ...usuario, [name]: value });
    };

    return (
        <Form>
            <Row className="m-3">
                <ValorMinimoGiro
                    value={usuario.valorMinimoGiro}
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
}