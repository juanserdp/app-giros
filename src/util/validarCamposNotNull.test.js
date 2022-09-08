import {validarCamposNotNull} from "./validarCamposNotNull";

describe("Cuando se le da un formulario",()=>{
    it("Retorna false si todos los campos estan vacios",()=>{
        const form = {
            prop1: "",
            prop2: "",
            prop3: ""
        };
        const isFormFull = validarCamposNotNull(form);
        expect(isFormFull).toBe(false);
    });
    it("Retorna false si al menos un campo esta lleno",()=>{
        const form = {
            prop1: "juan",
            prop2: "",
            prop3: ""
        };
        const isFormFull = validarCamposNotNull(form);
        expect(isFormFull).toBe(false);
    });
    it("Retorna false si al menos un campo esta vacio",()=>{
        const form = {
            prop1: "juan",
            prop2: "1234",
            prop3: ""
        };
        const isFormFull = validarCamposNotNull(form);
        expect(isFormFull).toBe(false);
    });
    it("Retorna true si todos los campos estan llenos",()=>{
        const form = {
            prop1: "juan",
            prop2: "1234",
            prop3: "123"
        };
        const isFormFull = validarCamposNotNull(form);
        expect(isFormFull).toBe(true);
    });
})