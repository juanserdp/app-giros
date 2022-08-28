import { currencyFormatter } from "./currencyFormatter";
import { parseNumberFormatToNumber } from "./parseNumberFormatToNumber";

export function modificarInputValue(value, form, input) {
    let number = parseNumberFormatToNumber(value);
    const numberStringToNumber = Number(number);
    if (form && input) {
        form.value = numberStringToNumber.toString();
        input.value = currencyFormatter.format(form.value);
    }
    return numberStringToNumber.toString();
};
