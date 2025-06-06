const formatDate = (dateString?: string) => {
  const date = dateString ? new Date(dateString) : new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 porque enero es 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const LayoutCotizacion = (data: any): string => `
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Cotización</title>
    <style>
        html, body {
            height: 100%;
            margin: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .main {
            padding: 30px;
        }

        h1 {
            text-align: center;
            text-transform: uppercase;
        }

        .header {
            display: flex;
            justify-content: space-between;
        }

        .numero-cotizacion h2,
        .numero-cotizacion h6 {
            margin-top: 4px;
            margin-bottom: 4px;
            text-transform: uppercase;
        }

        .numero-cotizacion h6 {
            text-align: right;
            color: #999999;
        }

        .section-cliente {
            margin-bottom: 40px;
            margin-top: 40px;
        }

        .section-content {
            margin-bottom: 40px;
            margin-top: 40px;
        }

        .section-total {
            display: flex;
            justify-content: end;
        }

        .section-total div {
            background: #999999;
            color: #FFFFFF;
            padding: 8px;
            width: 40%;
            display: flex;
            justify-content: space-between;
        }

        .label {
            display: inline-block;
            width: 180px;
        }

        .box {
            border: 1px solid #000;
            padding: 10px;
            margin-top: 10px;
        }

        .notes {
            margin-top: 30px;
            font-size: 0.9em;
            line-height: 1.5;
            width: 70%;
            text-align: justify;
            text-justify: inter-word;
        }

        .notes h3 {
            color: #F5A623;
            text-transform: uppercase;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            border: transparent;
        }

        .table thead {
            background: #999999;
            color: #FFFFFF;
        }

        .table th {
            text-align: center;
            padding: 5px;
            font-size: 13px;
        }

        .table td {
            padding: 8px;
            font-size: 13px;
        }

        .footer {
            font-size: 0.9em;
            display: flex;
            flex-direction: column;
            padding: 30px;
            justify-content: end;
            align-items: end;
        }

        .footer div {
            padding: 10px;
            width: 30%;
            text-align: right;
        }

        .footer .url {
            background-color: #F5A623;
            color: #FFFFFF;
            text-align: center;
        }
    </style>
</head>

<body>

    <div class="main">
        <div class="header">
            <div class="logo">

            </div>

            <div class="numero-cotizacion">
                <h2> Cotización </h2>
                <h6> NRO. ${String(data.id).padStart(9, '0')} </h6>
            </div>
        </div>

        <div class="section section-cliente">
            <div>
                <span class="label"> Cliente: </span>
                ${data.nombre}
            </div>
            <div>
                <span class="label"> Fecha: </span>
                ${formatDate(data.fecha) || formatDate(new Date().toLocaleDateString())}
            </div>
            <div>
                <span class="label"> Beneficiario: </span>
                ${data.nombreBeneficiario}
            </div>
            <div>
                <span class="label"> RUC: </span>
                ${data.rucBeneficiario}
            </div>
            <div>
                <span class="label"> Celular: </span>
                ${data.celular}
            </div>
            <div>
                <span class="label"> Correo: </span>
                ${data.correo}
            </div>
        </div>

        <div class="section section-content">
            <table class="table">
                <thead>
                    <tr>
                        <th> Descripción </th>
                        <th> Tipo de Tramite </th>
                        <th> Monto a Solicitar </th>
                        <th> % Honorarios </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> PATROCINIO EN LA DEVOLUCIÓN DE IMPUESTOS </td>
                        <td> ${data.idTiposImpuesto} </td>
                        <td> $ ${data.valorASolicitar} </td>
                        <td> ${data.honorarios} </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="section section-total">
            <div>
                <span class="label"> Total (No incluye IVA) </span> ${data.honorarios}
            </div>
        </div>

        <div class="notes">
            <h3 class="title"> Notas </h3>

            <p>
                Nuestros honorarios por el trámite de devolución se calculará sobre el monto recuperado efectivamente de acuerdo a la Nota de Crédito emitida por el Servicio de Rentas Internas
            </p>

            <p>
                Nuestros honorarios se pagan en su totalidad (100%) después de que el SRI emita la resolución final. No requerimos anticipos.
            </p>
        </div>

        <div class="notes">
            <h3 class="title"> Acepta tu cotización </h3>

            <p>
                Una vez aceptada la cotización, nuestros asesores le proporcionarán acceso
                a nuestra plataforma PLUSDATA.EC para que pueda seguir el estado de su
                trámite en tiempo real.
            </p>
        </div>
    </div>

    <div class="footer">
        <div> <span> Correo:  ${data.correoPD} </span> </div>
        <div> <span> Cel:  ${data.numeroPD} </span> </div>
        <div class="url">
            <span> www.plusdata.ec </span>
        </div>
    </div>

</body>

</html>
`;
