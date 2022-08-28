import { currencyFormatter } from "./currencyFormatter";
import { parseNumberFormatToNumber } from "./parseNumberFormatToNumber";

describe("", () => {
    it("", () => {
        let form = {
            value: ""
        }
        let input = {
            value: currencyFormatter.format(form.value),
            onChange: function (text) {
                let number = parseNumberFormatToNumber(input.value + text);
                const numberStringToNumber = Number(number);
                form.value = numberStringToNumber.toString();
                input.value = currencyFormatter.format(form.value);
            }
        };

        expect(input.value).toBe("$0");
        expect(form.value).toBe("");

        console.log("Tipeo:", "0");
        input.onChange("0");
        console.log("InputValue:", input.value);
        expect(input.value).toBe("$0");
        console.log("FormValue:", form.value);
        expect(form.value).toBe("0");

        console.log("Tipeo:", "0");
        input.onChange("0");
        console.log("InputValue:", input.value);
        expect(input.value).toBe("$0");
        console.log("FormValue:", form.value);
        expect(form.value).toBe("0");

        console.log("Tipeo:", "0");
        input.onChange("0");
        console.log("InputValue:", input.value);
        expect(input.value).toBe("$0");
        console.log("FormValue:", form.value);
        expect(form.value).toBe("0");

        console.log("Tipeo:", "1");
        input.onChange("1");
        console.log("InputValue:", input.value);
        expect(input.value).toBe("$1");
        console.log("FormValue:", form.value);
        expect(form.value).toBe("1");

        console.log("Tipeo:", "12");
        input.onChange("12");
        console.log("InputValue:", input.value);
        expect(input.value).toBe("$112");
        console.log("FormValue:", form.value);
        expect(form.value).toBe("112");

        console.log("Tipeo:", "25");
        input.onChange("25");
        console.log("InputValue:", input.value);
        expect(input.value).toBe("$11,225");
        console.log("FormValue:", form.value);
        expect(form.value).toBe("11225");

        console.log("Tipeo:", "250");
        input.onChange("250");
        console.log("InputValue:", input.value);
        expect(input.value).toBe("$11,225,250");
        console.log("FormValue:", form.value);
        expect(form.value).toBe("11225250");

        console.log("Tipeo:", "2502");
        input.onChange("2502");
        console.log("InputValue:", input.value);
        expect(input.value).toBe("$112,252,502,502");
        console.log("FormValue:", form.value);
        expect(form.value).toBe("112252502502");
    });

})