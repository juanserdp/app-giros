export function dateJSONupdate(data, form) {
    let camposModificados = {};
    for (const field in form) {
        if (form[field] == "") continue;
        else if (form[field] != data[field]) {
            console.log(`${form[field]} != ${data[field]} => ${form[field] != data[field]}`)
            // NUMBER
            if (typeof data[field] === 'number') 
                camposModificados = { ...camposModificados, [field]: Number(form[field]) };
            // STRING
            else camposModificados = { ...camposModificados, [field]: form[field] };
        }
        else continue;
    }
    return camposModificados;
};