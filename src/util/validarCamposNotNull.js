export const validarCamposNotNull = (campos) => {
    let isFull;
    for (const prop in campos) {
        if (campos[prop] === "" || campos[prop] == null) return false;
        else isFull = true;
    }
    return isFull;
}