interface Cotizacion {
    id: number;
    idEstatus: number;
    idTiposImpuesto: number;
    valorASolicitar: number;
    honorarios: number;
    nombre: string;
    correo: string;
    celular: string;
    nombreBeneficiario: string;
    rucBeneficiario: string;
    correoPD?: string;
    numeroPD?: string;
}

import { API_BASE } from "@/lib/config";

const API_BASE_COT = `${API_BASE}/cotizaciones`;

export const register = async ({idEstatus, idTiposImpuesto, valorASolicitar, honorarios, nombre, correo, celular, nombreBeneficiario, rucBeneficiario}: Cotizacion) => {
    const res = await fetch(`${API_BASE_COT}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idEstatus, idTiposImpuesto, valorASolicitar, honorarios, nombre, correo, celular, nombreBeneficiario, rucBeneficiario })
    })

    if (!res.ok) throw new Error('Registro fallido')

    return res.json()
}

export const update = async ({id, idEstatus, idTiposImpuesto, valorASolicitar, honorarios, nombre, correo, celular, nombreBeneficiario, rucBeneficiario}: Cotizacion) => {
    const res = await fetch(`${API_BASE_COT}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, idEstatus, idTiposImpuesto, valorASolicitar, honorarios, nombre, correo, celular, nombreBeneficiario, rucBeneficiario })
    })

    if (!res.ok) throw new Error('Registro fallido')

    return res.json()
}

export const confirm = async ({id, idEstatus, idTiposImpuesto, valorASolicitar, honorarios, nombre, correo, celular, nombreBeneficiario, rucBeneficiario, correoPD, numeroPD}: Cotizacion) => {
    const res = await fetch(`${API_BASE_COT}/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, idEstatus, idTiposImpuesto, valorASolicitar, honorarios, nombre, correo, celular, nombreBeneficiario, rucBeneficiario, correoPD, numeroPD })
    })

    if (!res.ok) throw new Error('Registro fallido')

    return res.json()
}