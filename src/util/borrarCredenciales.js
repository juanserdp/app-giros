export function borrarCredenciales(){
    localStorage.removeItem('numeroDocumento');
    localStorage.removeItem('clave');
    localStorage.removeItem('recordarCredenciales');
}