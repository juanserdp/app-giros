import { currencyFormatter } from "./currencyFormatter";

export function generarFactura({
  nombres,
  apellidos,
  tipoDocumento,
  numeroDocumento,
  banco,
  tipoCuenta,
  numeroCuenta,
  valorGiro,
  fechaEnvio,
  tasaCompra,
  estadoGiro,
}) {
  const factura = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
      crossorigin="anonymous"
    />
    <title>Static Template</title>
    <style type="text/css">
    @media print {
               .noprint {
                  visibility: hidden;
               }
            }
    
      .factura {
        table-layout: fixed;
      }

      .fact-info > div > h5 {
        font-weight: bold;
      }

      .factura > thead {
        border-top: solid 3px #000;
        border-bottom: 3px solid #000;
      }

      .factura > thead > tr > th:nth-child(2),
      .factura > tbod > tr > td:nth-child(2) {
        width: 300px;
      }

      .factura > thead > tr > th:nth-child(n + 3) {
        text-align: right;
      }

      .factura > tbody > tr > td:nth-child(n + 3) {
        text-align: right;
      }

      .factura > tfoot > tr > th,
      .factura > tfoot > tr > th:nth-child(n + 3) {
        font-size: 24px;
        text-align: right;
      }

      .cond {
        border-top: solid 2px #000;
      }
    </style>
  </head>
  <body>
    <div id="app" class="container">
      <h2><b>Factura</b></h2>

      <div class="row my-3">
        <div class="col-10">
          <h1>App Giros</h1>
          <p>Nombre de la empresa</p>
          <p>Direccion de la empresa</p>
          <p>Telefono de la empresa</p>
        </div>
        <div class="col-2">
          <img
            height="100"
            src="https://d500.epimg.net/cincodias/imagenes/2015/05/08/pyme/1431098283_691735_1431098420_noticia_normal.jpg"
          />
        </div>
      </div>

      <hr />

      <div class="row fact-info mt-3">
        <h3>Datos Personales</h3>
        <div class="col-6">
          <h5>Nombres:</h5>
          <p>
            ${nombres + " " + apellidos}
          </p>
        </div>

        <div class="col-6">
            <h5>Identificacion:</h5>
            <p>
              ${tipoDocumento}: ${numeroDocumento}
            </p>
          </div>
      </div>

      <div class="row fact-info mt-3">
          <h3>Datos Bancarios</h3>
          <div class="col-6">
            <h5>Banco:</h5>
            <p>
              ${banco}
            </p>
          </div>
          <div class="col-6">
              <h5>Cuenta:</h5>
              <p>
                ${tipoCuenta}: ${numeroCuenta}
              </p>
            </div>
      </div>

      <div class="row fact-info mt-3">
          <h3>Datos del Giro</h3>
          
          <div class="col-6">
              <h5>Valor del Giro(COP):</h5>
              <p>
                ${currencyFormatter.format(valorGiro)}
              </p>
            </div>
            <div class="col-6">
                <h5>Valor del Giro(Bs):</h5>
                <p>
                    ${currencyFormatter.format(valorGiro / tasaCompra)}
                </p>
              </div>
              <div class="col-6">
                  <h5>Fecha de Envio:</h5>
                  <p>
                    ${fechaEnvio}
                  </p>
                </div>
      </div>
    <button onclick="window.print()" type="button" class="btn btn-primary noprint">Imprimir</button>
      </div>
    </div>
  </body>
</html>

    `;

  return factura;
}
