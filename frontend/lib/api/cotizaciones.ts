interface Cotizacion {
    idEstatus: number;
    idTiposImpuesto: number;
    valorASolicitar: number;
    honorarios: number;
    nombre: string;
    correo: string;
    celular: string;
    nombreBeneficiario: string;
    rucBeneficiario: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/cotizaciones'

export const register = async ({idEstatus, idTiposImpuesto, valorASolicitar, honorarios, nombre, correo, celular, nombreBeneficiario, rucBeneficiario}: Cotizacion) => {
    const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idEstatus, idTiposImpuesto, valorASolicitar, honorarios, nombre, correo, celular, nombreBeneficiario, rucBeneficiario })
    })

    if (!res.ok) throw new Error('Registro fallido')

    return res.json()
}