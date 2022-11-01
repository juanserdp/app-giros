export function guardarCredenciales(numeroDocumento, clave){
    localStorage.setItem('numeroDocumento', numeroDocumento);
    localStorage.setItem('clave', clave);
    localStorage.setItem('recordarCredenciales', true);
}