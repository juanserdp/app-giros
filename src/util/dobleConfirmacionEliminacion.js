import swal from "sweetalert";
export async function dobleConfirmacionEliminacion(callback) {
    const willDelete = await swal({
        title: "Esta seguro?",
        text: "Una vez eliminado, no podra recuperar la informacion",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    });
    if (willDelete) {
        if (window.confirm("Confirme su desicion!"))
            callback(null, true);
        else swal("Su informacion esta a salvo!");
        callback(null, false);
    } else {
        swal("Su informacion esta a salvo!");
        callback(null, false);
    }
}