import React, { useContext, useState } from "react";
import { Sesion } from "../util/Sesion";

export const Context = React.createContext();

export function useSesionContext() {
    return useContext(Context);
}

export function SesionProvider({ children, uid, urol }) {

    const sesion = new Sesion();

    const valorInicialCredenciales = {
        id: sesion.getUid(),
        rol: sesion.getRol()
    };

    const [sesionData, setSesionData] = useState(valorInicialCredenciales);

    const guardarCredenciales = () => {
        const sesion = new Sesion();
        setSesionData({
            id: sesion.getUid(),
            rol: sesion.getRol()
        });
    }

    const borrarCredenciales = () => {
        setSesionData({
            id: "",
            rol: ""
        });
    }

    return (
        <Context.Provider value={{
            sesionData,
            guardarCredenciales,
            borrarCredenciales
        }}>
            {children}
        </Context.Provider>
    )
}