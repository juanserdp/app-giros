// HOOKS
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// CONSULTAS
import { CREAR_GIRO } from "../services/apollo/gql/giro/crearGiro";
import { OBTENER_USUARIO_POR_ID } from "../services/apollo/gql/usuario/obtenerUsuarioPorId";

// COMPONENTES
import { FormEnviarGiros } from "../components/forms/FormEnviarGiros";

// COMPONENTES LIBRERIAS
import { Button, Container} from "react-bootstrap";
import swal from "sweetalert";

// FUNCIONES
import { validarCamposNotNull } from "../util/validarCamposNotNull";
import { handleError } from "../util/handleError";
import { CircularProgressAnimation } from "../components/CircularProgressAnimation";
import { ErrorFetch } from "../components/errors/ErrorFetch";
import { Cargando } from "../components/Cargando";
import { useSesionContext } from "../providers/SesionProvider";
import { styleH2 } from "../assets/styles/fuentes";

export default function EnviarGiro() {

    // INSTANCIAS DE CLASE
    const navigate = useNavigate();

    // CONSTANTES
    const { valorGiro } = useParams();
    const initialState = {
        nombres: "",
        apellidos: "",
        tipoDocumento: "",
        numeroDocumento: "",
        banco: "",
        tipoCuenta: "",
        numeroCuenta: "",
        valorGiro: valorGiro || "",
    };
    const initialStateUsuario = {
        usuario: {
            tasaVenta: ""
        }
    };

    // HOOKS
    const { sesionData: { id } } = useSesionContext();
    const { loading, data, error, refetch } = useQuery(OBTENER_USUARIO_POR_ID, {
        variables: { id: id },
    });
    const usuario = data || initialStateUsuario;
    const [crearGiro, crearGiroMutation] = useMutation(CREAR_GIRO);
    const [form, setForm] = useState(initialState);
    const [validated, setValidated] = useState(false);

    // MANEJADORES
    const handleEnviar = async () => {
        if (validarCamposNotNull(form)) {
            await crearGiro({
                variables: {
                    ...form,
                    usuario: id,
                    valorGiro: Number(form.valorGiro),
                    tasaCompra: Number(usuario.usuario.tasaVenta)
                },
                onCompleted: () => {
                    swal("Enviado!", "Su giro ha sido enviado con exito", "success");
                    refetch();
                    navigate("/inicio");
                    setValidated(false);
                },
                onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
            })
        }
        else {
            setValidated(true);
            swal("Error!", "Todos los campos son obligatorios!", "error");
        }
    };

    const handleInputChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
    };

    if (loading) return <CircularProgressAnimation /> // CARGANDO

    if (error) return <ErrorFetch error={error} /> // ERROR

    return (
        <Container className="my-3 p-0 rounded" >

            <h2 className="mb-3 p-3 rounded" style={styleH2}>Datos de la persona que recibe el dinero</h2>

            <FormEnviarGiros
                validated={validated}
                handleInputChange={handleInputChange}
                form={form}
                usuario={usuario}
                crearGiroMutation={crearGiroMutation} />

            <Button
                variant="primary"
                className="my-3 mx-5"
                disabled={crearGiroMutation.loading}
                onClick={handleEnviar}>
                {(crearGiroMutation.loading) ? <Cargando /> : "Enviar"}
            </Button>
        </Container>
    );
}