import { MockedProvider } from "@apollo/client/testing"
import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { SesionProvider } from "../../providers/SesionProvider"
import { TablaUsuarios } from "./TablaUsuarios"


describe("TablaUsuarios", () => {
    it("Obtiene", () => {
        render(
            <MockedProvider>
                <SesionProvider >
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={
                                <TablaUsuarios
                                    usuarios
                                    refetch
                                    loading
                                    handleShow
                                    eliminarUsuario />} />
                        </Routes>
                    </BrowserRouter>
                </SesionProvider>
            </MockedProvider>
        )
    })
})