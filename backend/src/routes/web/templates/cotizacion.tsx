export const LayoutCotizacion = (data: any): string => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Cotización</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 40px;
      color: #333;
    }
    h1 {
      text-align: center;
      text-transform: uppercase;
    }
    .section {
      margin-bottom: 20px;
    }
    .label {
      font-weight: bold;
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
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      font-size: 0.9em;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }
    .table th, .table td {
      border: 1px solid #999;
      padding: 8px;
      text-align: left;
    }
    .right {
      text-align: right;
    }
  </style>
</head>
<body>

  <h1>Cotización NRO. ${data.numeroCotizacion || '0000001'}</h1>

  <div class="section">
    <div><span class="label">Cliente:</span> ${data.nombre}</div>
    <div><span class="label">Fecha:</span> ${data.fecha || new Date().toLocaleDateString()}</div>
    <div><span class="label">Beneficiario:</span> ${data.nombreBeneficiario}</div>
    <div><span class="label">RUC:</span> ${data.rucBeneficiario}</div>
    <div><span class="label">Celular:</span> ${data.celular}</div>
    <div><span class="label">Correo:</span> ${data.correo}</div>
  </div>

  <div class="section">
    <table class="table">
      <thead>
        <tr>
          <th>Descripción</th>
          <th>% Honorarios</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>PATROCINIO EN LA DEVOLUCIÓN DE IMPUESTOS<br>RETENCIONES DE IMPUESTO A LA RENTA</td>
          <td class="right">${data.honorarios}%</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="section">
    <div><span class="label">Monto a Solicitar:</span> $${data.valorASolicitar}</div>
    <div><span class="label">Total (no incluye IVA):</span> <strong>$${data.valorASolicitar}</strong></div>
  </div>

  <div class="notes">
    Nuestra comisión por el trámite de devolución se calculará sobre el monto recuperado efectivamente, incluyendo en el cálculo los intereses ganados, los cuales podrían ascender aproximadamente a $11,000.00 adicionales.<br><br>

    Nuestros honorarios se pagan en su totalidad (100%) después de que el SRI emita la resolución final. No requerimos anticipos.
  </div>

  <div class="section" style="margin-top: 40px;">
    <strong>Acepta tu cotización:</strong>
    <div class="box">&nbsp;</div>
  </div>

  <div class="footer">
    www.plusdata.ec<br>
    Una vez aceptada la cotización, nuestros asesores le proporcionarán acceso a nuestra plataforma PLUSDATA.EC para que pueda seguir el estado de su trámite en tiempo real.
  </div>

</body>
</html>
`;
