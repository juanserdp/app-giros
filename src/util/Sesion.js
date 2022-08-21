export class Sesion{
    constructor(token){
        this.uid =  JSON.parse(window.atob(token.split('.')[1])).uid;
        this.estado = JSON.parse(window.atob(token.split('.')[1])).estado;
        this.rol = JSON.parse(window.atob(token.split('.')[1])).rol;
    };
    cerrarSesion(){

    };
}