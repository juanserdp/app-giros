export function guardarDatosSesion(numeroDocumento, clave){
    localStorage.setItem('numeroDocumento', numeroDocumento);
    localStorage.setItem('clave', clave);
    localStorage.setItem('recordarCredenciales', true);
}