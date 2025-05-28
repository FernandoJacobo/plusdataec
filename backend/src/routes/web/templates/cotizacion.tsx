export const LayoutCotizacion = (data: any): string => `
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Cotización</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
			font-size: 15px;
			padding: 20px;
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
            width: 30%;
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
        }

        .notes h3 {
            color: #F5A623;
            text-transform: uppercase;
        }

        .footer {
            text-align: right;
            font-size: 0.9em;
            width: 100%;
            display: flex;
            justify-content: end;
            flex-direction: column;
            align-items: end;
        }

        .footer div {
            width: 30%;
            padding: 8px;
        }

        .footer .url {
            background-color: #F5A623;
            color: #FFFFFF;
            text-align: center;
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
            padding: 8px;
            font-size: 15px;
        }

        .table td {
            padding: 8px;
            font-size: 13px;
        }

        .right {
            text-align: right;
        }
    </style>
</head>

<body>

    <div class="header">
        <div class="logo">

        </div>

        <div class="numero-cotizacion">
            <h2> Cotización </h2>
            <h6> NRO. ${data.id} </h6>
        </div>
    </div>

    <div class="section section-cliente">
        <div>
            <span class="label"> Cliente: </span>
            ${data.nombre}
        </div>
        <div>
            <span class="label"> Fecha: </span>
            ${data.fecha || new Date().toLocaleDateString()}
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
            Nuestra comisión por el trámite de devolución se calculará sobre el monto recuperado efectivamente,
            incluyendo en el cálculo los intereses ganados, los cuales podrían ascender aproximadamente a $11,000.00
            adicionales.
        </p>

        <p>
            Nuestros honorarios se pagan en su totalidad (100%) después de que el SRI emita la resolución final. No
            requerimos anticipos.
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

    <div class="footer">
        <div> Correo: info@plusdata.ec </div>
        <div> Cel: 0999677844 </div>
        <div class="url">
            www.plusdata.com
        </div>
    </div>

</body>

</html>
`;
