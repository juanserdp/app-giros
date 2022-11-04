// COMPONENTES
import { InicioAdmin } from "../components/administrador/InicioAdmin";
import { InicioAsesor } from "../components/asesores/InicioAsesor";
import { InicioUsuario } from "../components/usuarios/InicioUsuario";
import { Footer } from "../components/Footer";

// HOOKS
import React from "react";
import { useSesionContext } from "../providers/SesionProvider";

function InicioPorRol({ rol }) {
    switch (rol) {
        case "ADMINISTRADOR":
            return <InicioAdmin />;
        case "ASESOR":
            return <InicioAsesor />;
        case "USUARIO":
            return <InicioUsuario />;
        default:
            return null;
    }
};

export default function Inicio() {

    const { sesionData: {  rol } } = useSesionContext();
    return (
        <React.Fragment>
            <InicioPorRol rol={rol} />
            <Footer />
        </React.Fragment>
    )
}