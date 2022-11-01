export function dateJSONupdate(data, form) {
    let camposModificados = {};
    for (const field in form) {
        console.log(`${form[field]} != ${data[field]} => ${form[field] != data[field]}`)
        if (form[field] == "") continue;
        else if (form[field] != data[field]) {
            
            if (typeof data[field] === 'number') 
                camposModificados = { ...camposModificados, [field]: Number(form[field]) };
            else camposModificados = { ...camposModificados, [field]: form[field] };
        }
        else continue;
        
    }
    return camposModificados;
};