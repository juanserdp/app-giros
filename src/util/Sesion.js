export class Sesion{
    constructor(){
        const token = localStorage.getItem("jwt");
        this.uid =  JSON.parse(window.atob(token.split('.')[1])).uid;
        this.estado = JSON.parse(window.atob(token.split('.')[1])).estado;
        this.rol = JSON.parse(window.atob(token.split('.')[1])).rol;
    };
    cerrarSesion(){
        localStorage.removeItem("jwt");
    };
    getUid(){
        return this.uid;
    }
    getEstado(){
        return this.estado;
    }
    getRol(){
        return this.rol;
    }
}