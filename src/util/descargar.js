
export function descargar(binaryString) {

    const length = binaryString.length;
    const array = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
        array[i] = binaryString.charCodeAt(i);
    };

    const blob = new Blob([array], { type: "image/jpeg" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "comprobante_de_pago.png";
    a.style.textDecoration = "none";
    a.style.color = "white";

    a.onload = function () {
        URL.revokeObjectURL(this.href);
    };
    a.onerror = function () {
        alert("Ocurrio un error al intentar descargar");
    };

    a.click();
}