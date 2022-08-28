export const parseNumberFormatToNumber = (oldNumber="") => {
    let newNumber = "";
    // oldNumber = oldNumber.slice(1,oldNumber.length - 3);
    for(let numero of oldNumber){
        if(!isNaN(numero)) newNumber += numero;
        else continue;
    }
    return newNumber;
}