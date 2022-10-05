// HOOKS
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// CONSULTAS
import { CREAR_GIRO } from "../services/apollo/gql/giro/crearGiro";
import { OBTENER_USUARIO_POR_ID } from "../services/apollo/gql/usuario/obtenerUsuarioPorId";

// COMPONENTES
import { FormEnviarGiros } from "../components/FormEnviarGiros";
import { NavBar } from "../components/NavBar";

// COMPONENTES LIBRERIAS
import { Backdrop, CircularProgress } from "@mui/material";
import { Button,  Container, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import swal from "sweetalert";

// FUNCIONES
import { validarCamposNotNull } from "../util/validarCamposNotNull";
import { handleError } from "../util/handleError";
import { Sesion } from "../util/Sesion";


const textStyleH2 = {
    fontWeight: "500",
    fontSize: "2rem",
    fontFamily: "'Roboto Slab', serif",
    color: "white",
    backgroundColor: "#0d6efd",
    width: "100%", 
    borderBottom: "2px solid #0d6efd", 
    outlineWidth: "10px"
};
export default function EnviarGiro() {

    // INSTANCIAS DE CLASE
    const navigate = useNavigate();
    const sesion = new Sesion();

    // CONSTANTES
    const { valorGiro } = useParams();
    const id = sesion.getUid();
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
    
    // CONSULTAS
    const { loading, data, error, refetch } = useQuery(OBTENER_USUARIO_POR_ID, {
        variables: { id: id },
    });
    const usuario = data || initialStateUsuario;
    
    // MUTACIONES
    const [crearGiro, crearGiroMutation] = useMutation(CREAR_GIRO);

    // ESTADOS
    const [form, setForm] = useState(initialState);
    const [validated, setValidated] = useState(false);

    // MANEJADORES
    const handleInputChange = (event, name) => {
        setForm({ ...form, [name]: event.target.value });
    }
    const handleEnviar = async (event) => {
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
        else{
            setValidated(true);
            swal("Error!", "Todos los campos son obligatorios!", "error");
        }
    }
    // CARGANDO
    if (loading) return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
    // ERROR
    if (error) return (
        `Error! ${error}`
    );
    return (
        <>
            <NavBar />
            <Container className="my-3 p-0 card-container-background rounded" >
                <h2 className="mb-3 p-3 rounded" style={textStyleH2}>Datos de la persona que recibe el dinero</h2>

               <FormEnviarGiros
            //    handleSubmit={handleSubmit}
               validated={validated}
               handleInputChange={handleInputChange}
               form={form}
               usuario={usuario}
               crearGiroMutation={crearGiroMutation}
               />
               {(crearGiroMutation.loading) ? (
            <Button variant="light" className="my-3 mx-5 light" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              /> &nbsp;
              Enviando...
            </Button>
          ) : (
            <Button variant="light" className="my-3 mx-5 light" onClick={handleEnviar}>Enviar</Button>
          )}
            </Container>
        </>
    );
}