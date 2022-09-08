import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { currencyFormatter } from "../../util/currencyFormatter";
import { modificarInputValue } from "../../util/modificarInputValue";
import { Buzon } from "../Buzon";
import { CardContent, Card, Backdrop, CircularProgress } from "@mui/material";
import { Sesion } from "../../util/Sesion";
import { useMutation, useQuery } from '@apollo/client';
import swal from "sweetalert";
import { OBTENER_BUZON } from "../../services/apollo/gql/buzon/obtenerBuzon";
import { useCargarDataForm } from "../../hooks/useCargarDataForm";
import { OBTENER_ASESOR_POR_ID } from "../../services/apollo/gql/asesor/obtenerAsesorPorId";
import { Saldo } from "../Saldo";
import { Deuda } from "../Deuda";
import { EDITAR_TASA_VENTA } from "../../services/apollo/gql/asesor/editarTasaVenta";
import { handleError } from "../../util/handleError";
import "../../assets/styles/inicio.css";
import { TasaVenta } from "./TasaVenta";
import { useCargarValue } from "../../hooks/useCargarValue";
import { FormRecargar } from "../FormRecargar";
import { validarCamposNotNull } from "../../util/validarCamposNotNull";


const textStyleH2 = {
    fontWeight: "500",
    fontSize: "1.5rem",
    fontFamily: "'Roboto Slab', serif",
    color: "white",
    backgroundColor: "#0d6efd",
};

export function InicioAsesor() {

    // ESTADO INICIAL DEL FORM
    const initialState = {
        valorGiro: "",
    }
    const initialStateTasa = 0;
    const initialStateAsesor = {
        saldo: "",
        deuda: "",
        tasaVenta: ""
    };

    // EFECTOS
    useEffect(() => {
        const button = document.getElementsByClassName("accordion-button collapsed");
        for (let boton of button) {
            boton.style.backgroundColor = "#0d6efd";
            boton.style.borderTopLeftRadius = "0px";
            boton.style.borderTopRightRadius = "0px";
            boton.style.border = "0px";
            boton.style.height = "20px";
            boton.style.outlineStyle = "none";
            boton.style.color = "white";
            boton.style.fontFamily = "'Roboto Slab', serif";
            boton.style.fontWeight = "500";
            boton.style.fontSize = "1.5rem";
            boton.style.padding = "5px";
            boton.style.textAlign = "center"
        };
    });

    // OBTENGO LO DATOS DE SESION DEL USUARIO
    const sesion = new Sesion();
    const id = sesion.getUid();

    // CONSULTAS
    const buzon = useQuery(OBTENER_BUZON);
    const { loading, data, error } = useQuery(OBTENER_ASESOR_POR_ID, {
        variables: { id }
    });

    // MUTACIONES
    const [editarTasaVenta] = useMutation(EDITAR_TASA_VENTA);

    // ESTADOS
    const [configuracion] = useCargarDataForm({ buzon: [] }, buzon.data);
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState(initialState);
    const [asesor] = useCargarDataForm(initialStateAsesor, data);
    const [tasa, setTasa] = useCargarValue(initialStateTasa, asesor.tasaVenta);

    // MANEJADORES
    const handleInputChange = (event, name) => {
        setForm({ ...form, [name]: event.target.value });
    }

    const handleEditarTasa = async () => {
        swal("Nueva tasa de venta:", {
            content: "input",
        }).then(async (value) => {
            if (value) {
                if (value < 0 || value > 1) {
                    swal("Error!", "La tasa debe estar entre 0 y 1!", "error");
                } else {
                    await editarTasaVenta({
                        variables: { id, tasaVenta: Number(value) },
                        onCompleted: ({ tasa }) => {
                            setTasa(tasa.tasaVenta);
                            swal("Editado!", "La tasa de Venta ha sido editada con exito", "success");
                        },
                        onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
                    });
                }
            }
            else swal("Error!", "Todos los campos son obligatorios!", "error");
        });
    }

    const handleRecargar = (event) => {
        const formReactBoot = event.currentTarget;
        if (formReactBoot.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        // if (validarCamposNotNull(form)) {
        //     if (form.valorGiro < 1000) swal("Error!", "No puede hacer un giro con ese valor!", "error");
        //     else navigate(`/enviar-giro/${id}/${form.valorGiro}`);
        // }
        // else swal("Error!", "Todos los campos son obligatorios!", "error");
        if (validarCamposNotNull(form)) {

        }
        else setValidated(true);
    }

    if (loading) return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
    // LO QUE MUESTRA EN CASO DE ERROR
    if (error) return (
        `Error! ${error}`
    );
    return (
        <>
            <Container className="my-4" style={{ textAlign: "center" }}>
                <Row className="mb-3 justify-content-center">
                    <Col md="8">
                        <FormRecargar
                            form={form}
                            handleRecargar={handleRecargar}
                            setForm={setForm} />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md="12">
                        <Buzon configuracion={configuracion} />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md="4">
                        <TasaVenta
                            tasa={tasa}
                            handleEditarTasa={handleEditarTasa}
                            loading={loading}
                            rol="ASESOR" />
                    </Col>
                    <Col md="4">
                        <Saldo
                            saldo={asesor.saldo}
                            loading={loading} />
                    </Col>
                    <Col md="4">
                        <Deuda
                            deuda={asesor.deuda}
                            loading={loading} />
                    </Col>
                </Row>
            </Container>

        </>
    );
}