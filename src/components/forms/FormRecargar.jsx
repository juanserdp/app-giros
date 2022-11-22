import { Card, CardContent } from "@mui/material";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import swal from "sweetalert";
import { currencyFormatter } from "../../util/currencyFormatter";
import { handleError } from "../../util/handleError";
import { validarCamposNotNull } from "../../util/validarCamposNotNull";
import { Acordion } from "../Acordion";
import { Cargando } from "../Cargando";
import { NumeroDocumento } from "./NumeroDocumento";
import { ValorRecarga } from "./ValorRecarga";

export function FormRecargar({ recargar, refetch, recargarMutation, setValor, tasa}) {
    // CONSTANTES
    const botonStyle = {
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        width: "100%"
    };
    const initialState = {
        numeroDocumento: "",
        valorRecarga: ""
    };

    // HOOKS
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState(initialState);

    // MANEJADORES
    const handleInputChange = ({ target: { name, value } }) => {
        if(name === "valorRecarga"){
            setValor(value);
        }
        setForm({ ...form, [name]: value });
    };
    const handleRecargar = async (event) => {
        // LOGICA DE REACT BOOTSTRAP PARA CONTROL DE CAMPOS
        const formReactBoot = event.currentTarget;
        if (formReactBoot.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        // VALIDAMOS QUE LOS CAMPOS NO ESTEN VACIOS
        if (validarCamposNotNull(form)) {

            // EJECUTAMOS LA MUTACION PARA RECARGAR UN ASESOR
            await recargar({
                variables: { ...form, valorRecarga: Number(form.valorRecarga)}, // LE PASAMOS EL FORMULARIO MAS EL CASTEO DEL VALOR DE LA RECARGA A NUMERO
                onCompleted: ({ usuario }) => {
                    swal("Completado!", `El nuevo saldo de ${usuario.nombres} es: ${currencyFormatter.format(usuario.saldo)}`, "success");// EN CASO DE EXISTO MUESTRA UN MODAL CON UN MENSAJE EXITOSO Y EL NUEVO SALDO DEL ASESOR
                    setValidated(false);// REINICIAMOS EL ESTADO VALIDATE PARA EL CONTROL DEL FORMULARIO DE REACTBOOT
                    setForm(initialState);
                    refetch();
                },
                onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
            });
        }
        else {
            swal("Error!", "Todos los campos son obligatorios!", "error"); // EN CASO DE QUE ESTE VACIO EL FORMULARIO ME MUESTRA UN MODAL CON UN MENSAJE DE ERROR
            setValidated(true); // CAMBIAMOS EL ESTADO DE VALIDATE A TRUE PARA QUE MUESTRE CUALES CAMPOS SON OBLIGATORIOS
        }
    };

    return (
        <Card className="card-container-inicio rounded">
            <CardContent className="p-0 ">

                <Acordion titulo="Recargar">
                    Aquí puedes recargar el saldo de tus usuarios.
                    Ingresa el numero de su documento y
                    el monto que va a recargar.
                </Acordion>

                <Form validated={validated}>
                    <Row className="mb-2 px-3 justify-content-center" >
                        <NumeroDocumento
                            value={form.numeroDocumento}
                            onChange={(e) => handleInputChange(e)}
                            md={10} />
                    </Row>

                    <Row className="mb-2 px-3 justify-content-center" >
                        <ValorRecarga
                            value={form.valorRecarga}
                            onChange={(e) => handleInputChange(e)}
                            md={10}
                            tasa={tasa} />
                    </Row>
                </Form>

                <Row >
                    <Col md="12">
                        <Button
                            onClick={handleRecargar}
                            style={botonStyle}
                            className="btn btn-primary  px-3"
                            disabled={recargarMutation.loading}>
                            {recargarMutation.loading ? <Cargando /> : "Recargar"}
                        </Button>
                    </Col>
                </Row>
            </CardContent>

        </Card>
    )
}