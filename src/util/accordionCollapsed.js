export const accordionCollapsed = () => {
    const botones = document.getElementsByClassName("accordion-button collapsed");
    for (let boton of botones) {
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
    }
}