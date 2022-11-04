import { dateJSONupdate } from "./dateJSONupdate";

describe("", () => {
    it("", () => {
        const asesorDate = {
            nombres: "Juan",
            apellidos: "Rod",
            numeroDocumento: "1095",
            tipoDocumento: "CC",
            saldo: 100,
            tasaVenta: 0.05
        };
        const asesorUpdated = {
            nombres: "Juan",
            apellidos: "Rododriguez",
            numeroDocumento: "1095",
            tipoDocumento: "CC",
            saldo: 200,
            tasaVenta: 0.05
        };
        const update = dateJSONupdate(asesorDate, asesorUpdated);
        console.log(update, " ::")
        expect(update).toStrictEqual({
            apellidos: "Rododriguez",
            saldo: 200
        });
    });

    it("", () => {
        const asesorDate = {
            nombres: "Juan",
            apellidos: "Rod",
            numeroDocumento: "1095",
            tipoDocumento: "CC",
            saldo: 100,
            tasaVenta: 0.05
        };
        const asesorUpdated = {
            nombres: "Juan",
            apellidos: "Rododriguez",
            numeroDocumento: "1095",
            tipoDocumento: "CC",
            saldo: 0,
            tasaVenta: 0
        };
        const update = dateJSONupdate(asesorDate, asesorUpdated);
        console.log(update, " ::")
        expect(update).toStrictEqual({
            apellidos: "Rododriguez",
            saldo: 0,
            tasaVenta: 0
        });
    });

    it("", () => {
        const asesorDate = {
            nombres: "Juan",
            apellidos: "Rod",
            numeroDocumento: "1095",
            tipoDocumento: "CC",
            saldo: 0,
            tasaVenta: 0
        };
        const asesorUpdated = {
            nombres: "Juan",
            apellidos: "Rododriguez",
            numeroDocumento: "1095",
            tipoDocumento: "AA",
            saldo: 1,
            tasaVenta: 1
        };
        const update = dateJSONupdate(asesorDate, asesorUpdated);
        console.log(update, " ::")
        expect(update).toStrictEqual({
            apellidos: "Rododriguez",
            tipoDocumento: "AA",
            saldo: 1,
            tasaVenta: 1
        });
    });
})
