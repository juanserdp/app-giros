import { useEffect } from "react";
import { Accordion } from "react-bootstrap";

export function Acordion({ children, titulo }) {

    useEffect(() => {
        const button = document.getElementsByClassName("accordion-button collapsed");
        for (let boton of button) {
            boton.style.backgroundColor = "#0d6efd";
            boton.style.color = "white";
            boton.style.fontFamily = "'Roboto', sans-serif";
            boton.style.fontWeight = "500";
            boton.style.fontSize = "1.5rem";
        }
    });
    const styleAcordion = {
        fontWeight: "300",
        fontFamily: "'Roboto', sans-serif",
        textAlign: "left"
    };

    return (
        <Accordion className="mb-4">
            <Accordion.Item style={{ border: "0px" }} eventKey="0" >
                <Accordion.Header >
                    {titulo}
                </Accordion.Header>
                <Accordion.Body style={styleAcordion}>
                    {children}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}