export class Sesion {
    constructor() {
        const token = localStorage.getItem("jwt");
        this.uid = (token) ? JSON.parse(window.atob(token.split('.')[1])).uid : null;
        this.estado = (token) ? JSON.parse(window.atob(token.split('.')[1])).estado : null;
        this.rol = (token) ? JSON.parse(window.atob(token.split('.')[1])).rol : null;
    };
    static cerrarSesion() {
        localStorage.removeItem("jwt");
    };
    getUid() {
        return this.uid;
    }
    getEstado() {
        return this.estado;
    }
    getRol() {
        return this.rol;
    }
}