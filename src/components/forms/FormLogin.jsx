import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import swal from 'sweetalert';
import { guardarCredenciales } from "../../util/guardarCredenciales";
import { useState } from 'react';
import { borrarCredenciales } from '../../util/borrarCredenciales';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../services/apollo/gql/login';
import { Spinner } from 'react-bootstrap';
import { handleError } from '../../util/handleError';
import { NumeroDocumento } from './NumeroDocumento';

export function FormLogin() {
    // INSTANCIAS DE CLASE
    const navigate = useNavigate();

    // CONSTANTES
    const estadoInicial = {
        numeroDocumento: localStorage.getItem("numeroDocumento") || "",
        clave: localStorage.getItem("clave") || ""
    };

    // ESTADOS
    const [formLogin, setFormLogin] = useState(estadoInicial);
    const [recordarCredenciales, setRecordarCredenciales] = useState(localStorage.getItem("recordarCredenciales") || false);

    // MUTACIONES
    const [login, { loading, error }] = useMutation(LOGIN, {
        variables: formLogin,
        onCompleted: ({ login }) => {
            if (login.token) {
                localStorage.setItem("jwt", login.token);
                navigate('/inicio');
            }
            else if (login.error) swal("Error al iniciar sesión", login.error, "error");
        },
        onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
    });
    const handlerSubmit = () => {
        if (recordarCredenciales) guardarCredenciales(formLogin.numeroDocumento, formLogin.clave);
        else borrarCredenciales();
        if (formLogin.numeroDocumento !== "" && formLogin.clave !== "") login();
        else swal("Error", "¡Todos los campos son obligatorios!", "error");
    }
    const handleChange = (evento, campo) => {
        setFormLogin({ ...formLogin, [campo]: evento.target.value })
    }
    if (error) return `Error! ${error}`;
    return (
        <Container fluid="md">
            <Form style={{
                width: "100%",
                height: "650px",
                maxWidth: "330px",
                padding: "15px",
                margin: "auto",
                marginTop: "calc(50vh - 325px)"
            }}>
                <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy5C__8LdlPzxa7WMOTs54k7jwNlRyKS4xKzIAN0IL2skfCe_yeOQqag5wSoYkwGYqoqo&usqp=CAU'
                    style={{
                        width: "100%",
                        height: "300px"
                    }}
                ></img>
                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Numero de Documento</Form.Label>
                    <Form.Control onChange={event => setFormLogin({ ...formLogin, numeroDocumento: event.target.value })
                    } value={formLogin.numeroDocumento} type="text" placeholder="Ingrese el numero" />
                </Form.Group> */}
                <NumeroDocumento
                    value={formLogin.numeroDocumento}
                    onChange={handleChange} />
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control onChange={event => setFormLogin({ ...formLogin, clave: event.target.value })
                    } value={formLogin.clave} type="password" placeholder="Ingrese la contraseña" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check onChange={() => setRecordarCredenciales(!recordarCredenciales)
                    } defaultChecked={recordarCredenciales} type="checkbox" label="Recordarme" />
                </Form.Group>
                <Button disabled={loading ? true : false} onClick={(evento) => handlerSubmit(evento)} variant="primary"  >
                    {loading ? (
                        <><Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> &nbsp;
                            Cargando...</>
                    ) : "Ingresar"}
                </Button>
            </Form>
        </Container>
    );
}


