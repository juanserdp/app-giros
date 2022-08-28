import {parseNumberFormatToNumber} from "./parseNumberFormatToNumber";
import {currencyFormatter} from "./currencyFormatter";

describe("", ()=>{
    it("",()=>{
        const tope = 12345;
        let number;
        for(number = 0; number < tope; number++){
            const numberFormat = currencyFormatter.format(number);
            const numberWithoutFormat = parseNumberFormatToNumber(numberFormat);
            expect(Number(numberWithoutFormat)).toBe(number);
        }
    })
})