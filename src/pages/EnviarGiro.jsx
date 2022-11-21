// HOOKS
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// CONSULTAS
import { CREAR_GIRO } from "../services/apollo/gql/giro/crearGiro";
import { OBTENER_USUARIO_POR_ID } from "../services/apollo/gql/usuario/obtenerUsuarioPorId";

// COMPONENTES


// COMPONENTES LIBRERIAS
import { Button, Container, Form, Row } from "react-bootstrap";
import swal from "sweetalert";

// FUNCIONES
import { validarCamposNotNull } from "../util/validarCamposNotNull";
import { handleError } from "../util/handleError";
import { CircularProgressAnimation } from "../components/CircularProgressAnimation";
import { ErrorFetch } from "../components/errors/ErrorFetch";
import { Cargando } from "../components/Cargando";
import { useSesionContext } from "../providers/SesionProvider";
import { styleH2, styleH3 } from "../assets/styles/fuentes";
import { Nombres } from "../components/forms/Nombres";
import { Apellidos } from "../components/forms/Apellidos";
import { TipoDocumento } from "../components/forms/TipoDocumento";
import { NumeroDocumento } from "../components/forms/NumeroDocumento";
import { TipoCuenta } from "../components/forms/TipoCuenta";
import { NumeroCuenta } from "../components/forms/NumeroCuenta";
import { Banco } from "../components/forms/Banco";
import { ValorGiro } from "../components/forms/ValorGiro";
import { MontoBolivares } from "../components/forms/MontoBolivares";
import { currencyFormatter } from "../util/currencyFormatter";

export default function EnviarGiro() {

    // INSTANCIAS DE CLASE
    const navigate = useNavigate();

    // CONSTANTES
    const { valorGiro } = useParams();

    const estadoInicialGiro = {
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
        usuario: {}
    };

    // HOOKS
    const { sesionData: { id } } = useSesionContext();
    const { loading, data, error, refetch } = useQuery(OBTENER_USUARIO_POR_ID, {
        variables: { id },
    });

    const usuario = data || initialStateUsuario;

    const [crearGiro, crearGiroMutation] = useMutation(CREAR_GIRO);

    const loadingMutation = crearGiroMutation.loading;

    const [giro, setGiro] = useState(estadoInicialGiro);

    const [validated, setValidated] = useState(false);

    // MANEJADORES
    const handleEnviar = async (event) => {
        event.preventDefault();
        const tasa = (usuario.usuario?.usarTasaDelAsesor) ? usuario.usuario?.asesor?.tasaVenta : usuario.usuario?.tasaVenta;
        const valorMinimo = usuario.usuario?.asesor?.valorMinimoGiro;

        if (validarCamposNotNull(giro)) {
            if (giro.valorGiro >= valorMinimo) {
                await crearGiro({
                    variables: {
                        ...giro,
                        valorGiro: Number(giro.valorGiro),
                        usuario: id,
                        tasaCompra: tasa
                    },
                    onCompleted: () => {
                        swal("Enviado!", "Su giro ha sido enviado con exito", "success");
                        setValidated(false);
                        refetch();
                        navigate("/inicio");
                    },
                    onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
                })
            }
            else swal("Error!", `El valor minimo para hacer un giro es: ${currencyFormatter.format(valorMinimo)}`, "error");
        }
        else {
            setValidated(true);
            swal("Error!", "Todos los campos son obligatorios!", "error");
        }
    };

    const handleInputChange = ({ target: { name, value } }) => {
        setGiro({ ...giro, [name]: value });
    };

    if (loading) return <CircularProgressAnimation /> // CARGANDO

    if (error) return <ErrorFetch error={error} /> // ERROR

    return (
        <Container className="my-3 p-0 rounded" >

            <h2 className="mb-3 p-3" >Datos de la persona que recibe el dinero</h2>

            <Form
                className="mx-5 "
                validated={validated}>
                <Row className="mb-3" >
                    <h3 className="mb-3 p-3 rounded">
                        Datos personales
                    </h3>
                    <Nombres
                        value={giro.nombres}
                        onChange={(e) => handleInputChange(e)}
                        md={4} />

                    <Apellidos
                        value={giro.apellidos}
                        onChange={(e) => handleInputChange(e)}
                        md={4} />
                </Row>

                <Row className="mb-3">
                    <TipoDocumento
                        value={giro.tipoDocumento}
                        onChange={(e) => handleInputChange(e)}
                        md={4} />

                    <NumeroDocumento
                        value={giro.numeroDocumento}
                        onChange={(e) => handleInputChange(e)}
                        md={4} />
                </Row>

                <Row className="mb-3">
                    <h3 className="mb-3 p-3 rounded">
                        Datos Bancarios
                    </h3>

                    <TipoCuenta
                        value={giro.tipoCuenta}
                        onChange={(e) => handleInputChange(e)}
                        md={4} />

                    <NumeroCuenta
                        value={giro.numeroCuenta}
                        onChange={(e) => handleInputChange(e)}
                        md={4} />
                </Row>

                <Row className="mb-3">
                    <Banco
                        value={giro.banco}
                        onChange={(e) => handleInputChange(e)}
                        md={4} />
                </Row>

                <Row className="mb-3">
                    <h3 className="mb-3 p-3 rounded">
                        Datos de Envio
                    </h3>

                    <ValorGiro
                        value={giro.valorGiro}
                        onChange={(e) => handleInputChange(e)}
                        md={4} />

                </Row>
            </Form >

            <Button
                variant="primary"
                className="my-3 mx-5"
                disabled={loadingMutation}
                onClick={handleEnviar}>
                {(loadingMutation) ? <Cargando /> : "Enviar"}
            </Button>
        </Container>
    );
}