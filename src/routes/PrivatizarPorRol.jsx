import { Navigate } from 'react-router-dom';
import { Sesion } from '../util/Sesion';

export function PrivatizarPorRol({ children, rolAccess }) {
    const sesion = new Sesion();
    const rol = sesion.getRol();
    if (rol) {
        switch (rolAccess) {
            case "USUARIO":
                return (rol === "USUARIO" || rol === "ASESOR" || rol === "ADMINISTRADOR") ? children : <Navigate to="/" />
            case "ASESOR":
                return (rol === "ASESOR" || rol === "ADMINISTRADOR") ? children : <Navigate to="/" />
            case "ADMINISTRADOR":
                return (rol === "ADMINISTRADOR") ? children : <Navigate to="/" />
            default:
                return <Navigate to="/" />
        }
    }
    else {
        alert("Debe volver a iniciar sesion");
        console.log("Ocurrio un error al iniciar, no tiene acceso a la ruta especificada o no se le proporciono un token de acceso", " from PrivatizarPorRol.js");
        return <Navigate to="/" />
    }
}