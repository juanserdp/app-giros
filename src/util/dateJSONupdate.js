export function dateJSONupdate(datosIniciales, formulario) {
    let camposModificados = {};
    for (const campo in formulario) { // RECORREMOS FORMULARIO CAMPO POR CAMPO
        // console.log(`${formulario[campo]} != ${datosIniciales[campo]} => ${formulario[campo] != datosIniciales[campo]}`)
        const actual = datosIniciales[campo];
        const nuevo = formulario[campo];

        if (nuevo === "") continue; // SI EL CAMPO ESTA VACIO PASAMOS AL SIGUIENTE
        if (nuevo !== actual) {
            if (typeof actual === 'number')
                camposModificados = { ...camposModificados, [campo]: Number(nuevo) };
            else camposModificados = { ...camposModificados, [campo]: nuevo };
        };
    }
    return camposModificados;
};