import { DIRECCION_EMPRESA, NOMBRE_EMPRESA, TELEFONO_EMPRESA } from "../assets/constants/empresa";
import { currencyFormatter } from "./currencyFormatter";

export function generarFactura({
  id,
  nombresRemitente,
  apellidosRemitente,
  tipoDocumentoRemitente,
  numeroDocumentoRemitente,
  nombres,
  apellidos,
  tipoDocumento,
  numeroDocumento,
  banco,
  tipoCuenta,
  numeroCuenta,
  valorGiro,
  fechaEnvio
}) {
  const factura = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
        crossorigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet"
      />
      <!--font-family: 'Roboto', sans-serif;-->
      <title>Static Template</title>
      <style type="text/css">
        @media print {
          .noprint {
            visibility: hidden;
          }
        }
        .font {
          font-family: "Roboto", sans-serif;
        }
  
        .cursive {
          font-style: italic;
        }

        body {
          margin-left: 20%;
          margin-right: 20%;
        }
      </style>
    </head>
    <body>
      <div id="app" class="container border my-5 font">
        <div class="row text-center">
          <div class="col"></div>
          <div class="col-6">
            <img
              height="150"
              alt="logo_empresarial"
              src="https://i.ibb.co/30DQqkm/logotipo-login.png"
            />
          </div>
          <div class="col"></div>
        </div>
  
        <div class="row text-center">
          <div class="col"></div>
          <!-- 
          <div class="col-6">
            <p class="mb-1 cursive">${NOMBRE_EMPRESA}</p>
            <p class="mb-1 cursive">${DIRECCION_EMPRESA}</p>
            <p class="mb-1 cursive">${TELEFONO_EMPRESA}</p>
          </div>
          -->
          <div class="col"></div>
        </div>
  
        <hr />
  
        <div class="row text-center">
          <div class="col"></div>
          <div class="col-6">
            <h2>Resumen del giro:</h2>
            <p class="mb-1">
              <b class="cursive">ID del giro: </b><span>${id}</span>
            </p>
            <p class="mb-1">
              <b class="cursive">Valor del giro (VES): </b><span>${currencyFormatter.format(valorGiro)}</span>
            </p>
            <p class="mb-1">
              <b class="cursive">Fecha de envio: </b><span>${fechaEnvio}</span>
            </p>
          </div>
          <div class="col"></div>
        </div>
        <hr />
        <div class="row mb-3">
          <div class="col-6">
            <h5 class="text-center mb-3">Persona que envia:</h5>
            ${(nombresRemitente) ? 
            `<p class="mb-1">
              <b class="cursive">Nombres: </b><span>${nombresRemitente + " " + apellidosRemitente}</span>
            </p>
            <p class="mb-1">
              <b class="cursive">${tipoDocumentoRemitente}: </b><span>${numeroDocumentoRemitente}</span>
            </p>` : ""}
          </div>
          <div class="col-6">
            <h5 class="text-center mb-3">Persona que recibe:</h5>
            <p class="mb-1">
              <b class="cursive">Nombres: </b><span>${nombres + " " + apellidos}</span>
            </p>
            <p class="mb-1">
              <b class="cursive">${tipoDocumento}: </b><span>${numeroDocumento}</span>
            </p>
            <p class="mb-1">
              <b class="cursive">Banco: </b><span>${banco}</span>
            </p>
            <p class="mb-1">
              <b class="cursive">Cuenta (<span>${tipoCuenta}</span>): </b
              ><span>${numeroCuenta}</span>
            </p>
          </div>
        </div>
        <div class="row text-center">
          <div class="col"></div>
          <div class="col-6">
            <button
              onclick="window.print()"
              type="button"
              class="btn btn-primary noprint mb-3">
              Imprimir
            </button>
          </div>
          <div class="col"></div>
        </div>
      </div>
    </body>
  </html>
    `;
  return factura;
}
