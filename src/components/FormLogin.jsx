import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import swal from 'sweetalert';
import { guardarCredenciales } from "../util/guardarCredenciales";
import { useState } from 'react';
import { borrarCredenciales } from '../util/borrarCredenciales';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../services/apollo/gql/login';

export function FormLogin() {
    const navigate = useNavigate();
    const estadoInicial = {
        numeroDocumento: localStorage.getItem("numeroDocumento") || "",
        clave: localStorage.getItem("clave") || ""
    }
    const [formLogin, setFormLogin] = useState(estadoInicial);
    const [recordarCredenciales, setRecordarCredenciales] = useState(localStorage.getItem("recordarCredenciales") || false);

    const [login] = useMutation(LOGIN, {
        variables: formLogin,
        onCompleted: ({ login }) => {
            if (login.token) {
                localStorage.setItem("jwt", login.token);
                navigate('/inicio');
            }
            else if (login.error) {
                console.error("Error!", login.error, "from FormLogin.js");
                swal("Error al iniciar sesión", login.error, "error");
            }
        },
        onError: ({ networkError }) => {
            if (networkError) {
                console.error(`[Network error]: ${networkError}`, " from FormLogin.js");
                if (networkError.result.errors[0].message)
                    swal("Error!", networkError.result.errors[0].message, "error");
            }
        }
    });
    const handlerSubmit = () => {
        if (recordarCredenciales) guardarCredenciales(formLogin.numeroDocumento, formLogin.clave);
        else borrarCredenciales();
        if (formLogin.numeroDocumento !== "" && formLogin.clave !== "") login();
        else swal("Error", "¡Todos los campos son obligatorios!", "error");
    }
    return (
        <Container fluid="md">
            <Form style={{
                width: "100%",
                height: "300px",
                maxWidth: "330px",
                padding: "15px",
                margin: "auto",
                marginTop: "calc(50vh - 150px)"
            }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Numero de Identificacion</Form.Label>
                    <Form.Control onChange={event => setFormLogin({ ...formLogin, numeroDocumento: event.target.value })
                    } value={formLogin.numeroDocumento} type="text" placeholder="Ingrese el numero" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control onChange={event => setFormLogin({ ...formLogin, clave: event.target.value })
                    } value={formLogin.clave} type="password" placeholder="Ingrese la contraseña" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check onChange={() => setRecordarCredenciales(!recordarCredenciales)
                    } defaultChecked={recordarCredenciales} type="checkbox" label="Recordarme" />
                </Form.Group>

                <Button onClick={(evento)=>handlerSubmit(evento)} variant="primary" >
                    Ingresar
                </Button>
            </Form>
        </Container>
    );
}


