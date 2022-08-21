export function getToken(){
    const token = localStorage.getItem("jwt");
    let uid;
    let estado;
    let rol;
    if(token){
        uid = JSON.parse(window.atob(token.split('.')[1])).uid;
        estado = JSON.parse(window.atob(token.split('.')[1])).estado;
        rol = JSON.parse(window.atob(token.split('.')[1])).rol;
    }
    return {uid, estado, rol};
}