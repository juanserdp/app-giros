import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import swal from "sweetalert";
import { useSesionContext } from "../../providers/SesionProvider";
import { EDITAR_ASESOR } from "../../services/apollo/gql/asesor/editarAsesor";
import { EDITAR_USUARIO } from "../../services/apollo/gql/usuario/editarUsuario";
import { dateJSONupdate } from "../../util/dateJSONupdate";
import { handleError } from "../../util/handleError";
import { Cargando } from "../Cargando";
import { Apellidos } from "../forms/Apellidos";
import { Nombres } from "../forms/Nombres";
import { NumeroDocumento } from "../forms/NumeroDocumento";
import { TipoDocumento } from "../forms/TipoDocumento";

export function FormDatosPersonales({
    datosPersonalesUsuario,
    refetch
}) {
    const estadoInicialFormulario = {
        nombres: "",
        apellidos: "",
        numeroDocumento: "",
        tipoDocumento: ""
    };

    // HOOKS
    const [editarAsesor, editarAsesorInfo] = useMutation(EDITAR_ASESOR);
    const [editarUsuario, editarUsuarioInfo] = useMutation(EDITAR_USUARIO);
    const { sesionData: { id, rol } } = useSesionContext();
    const [usuario, setUsuario] = useState(datosPersonalesUsuario);

    const loading = editarAsesorInfo.loading || editarUsuarioInfo.loading;

    // MANEJADORES
    const handleSubmit = async () => {

        const camposParaEditar = dateJSONupdate(datosPersonalesUsuario, usuario);
        const tamanoObjeto = Object.keys(camposParaEditar).length;

        if (tamanoObjeto > 0) {
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

    const handleInputChange = ({ target: { name, value } }, nombres) => {
        setUsuario({ ...usuario, [name]: value });
    };

    return (
        <Form noValidate>
            <Row className="m-3">
                <Nombres
                    md={6}
                    onChange={(e) => handleInputChange(e)}
                    value={usuario.nombres} />
                <Apellidos
                    md={6}
                    onChange={(e) => handleInputChange(e)}
                    value={usuario.apellidos} />
            </Row>

            <Row className="m-3">
                <TipoDocumento
                    value={usuario.tipoDocumento}
                    onChange={(e) => handleInputChange(e)}
                    me={6} />
                <NumeroDocumento
                    value={usuario.numeroDocumento}
                    onChange={(e) => handleInputChange(e)}
                    me={6} />
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