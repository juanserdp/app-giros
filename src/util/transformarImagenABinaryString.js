import swal from "sweetalert";

export function transformarImagenABinaryString(id, accion) {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/*";
    inputFile.style.display = "none";
    if (inputFile) inputFile.click();
    inputFile.addEventListener("change", async function () {
        const fileList = this.files;
        const comprobante = fileList[0];

        if (comprobante.size < 2000000) {
            const reader = new FileReader();
            reader.onload = async function (e) {
                const binaryString = e.target.result;
                accion(binaryString);
            };
            reader.readAsBinaryString(comprobante);
        } else swal("Error!", "No se puede cargar una imagen que pese mas de 2mb", "error");
    });
}