export function guardarCredenciales(numeroDocumento, clave, recordarCredenciales){
    localStorage.setItem('numeroDocumento', numeroDocumento);
    localStorage.setItem('clave', clave);
    localStorage.setItem('recordarCredenciales', true);
}