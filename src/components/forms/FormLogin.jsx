import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import swal from 'sweetalert';
import { useState } from 'react';
import { borrarCredenciales } from '../../util/borrarCredenciales';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../services/apollo/gql/login';
import { handleError } from '../../util/handleError';
import { NumeroDocumento } from './NumeroDocumento';
import { Clave } from './Clave';
import logotipo from "../../assets/images/logotipo_login.png"
import { Cargando } from '../Cargando';
import { useSesionContext } from '../../providers/SesionProvider';
export function FormLogin() {
    // INSTANCIAS
    const navigate = useNavigate();
    const { guardarCredenciales } = useSesionContext();

    // CONSTANTES
    const initialStateFormLogin = {
        numeroDocumento: localStorage.getItem("numeroDocumento") || "",
        clave: localStorage.getItem("clave") || ""
    };
    const initialStateRecordarCredenciales = localStorage.getItem("recordarCredenciales") || false;
    const imgStyle = {
        width: "100%",
        height: "300px"
    };
    const formStyle = {
        width: "100%",
        height: "650px",
        maxWidth: "330px",
        padding: "15px",
        margin: "auto",
        marginTop: "calc(50vh - 325px)"
    };

    // ESTADOS
    const [formLogin, setFormLogin] = useState(initialStateFormLogin);
    const [recordarCredenciales, setRecordarCredenciales] = useState(initialStateRecordarCredenciales);

    // MUTACIONES
    const [login, { loading, error }] = useMutation(LOGIN, {
        variables: formLogin,
        onCompleted: ({ login }) => {
            if (login.token) {
                localStorage.setItem("jwt", login.token);
                guardarCredenciales();
                navigate('/inicio');
            }
            else if (login.error) swal("Error al iniciar sesión", login.error, "error");
        },
        onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
    });

    // MANEJADORES
    const handleSubmit = () => {
        if (recordarCredenciales) guardarCredenciales(formLogin.numeroDocumento, formLogin.clave);
        else borrarCredenciales();
        if (formLogin.numeroDocumento !== "" && formLogin.clave !== "") login();
        else swal("Error", "¡Todos los campos son obligatorios!", "error");
    }
    const handleChange = (evento, campo) => setFormLogin({ ...formLogin, [campo]: evento.target.value });

    if (error) return `Error! ${error}`;

    return (
        <Container fluid="md">
            <Form style={formStyle}>
                <img
                    src={logotipo}
                    style={imgStyle} />
                <NumeroDocumento
                    value={formLogin.numeroDocumento}
                    onChange={handleChange} />
                <Clave
                    value={formLogin.clave}
                    onChange={handleChange} />
                <Form.Group
                    className="mb-3"
                    controlId="label_recordarCredenciales">
                    <Form.Check
                        onChange={() => setRecordarCredenciales(!recordarCredenciales)}
                        defaultChecked={recordarCredenciales}
                        type="checkbox"
                        label="Recordarme" />
                </Form.Group>
                <Button
                    disabled={loading}
                    onClick={(evento) => handleSubmit(evento)}
                    variant="primary"  >
                    {loading ? <Cargando /> : "Ingresar"}
                </Button>
            </Form>
        </Container>
    );
}


