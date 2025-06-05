interface UserProps {
    id: number;
    idEstatus: number;
    nombre: string;
    celular: string;
    correo: string;
    contrasena: string;
}

import { API_BASE_AUTH } from "@/lib/config";

const API_BASE = API_BASE_AUTH;

export const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    if (!res.ok) throw new Error('Login fallido')

    return res.json()
}

export const register = async ({idEstatus, nombre, celular, correo, contrasena}: UserProps) => {
    const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idEstatus, nombre, celular, correo, contrasena })
    })

    if (!res.ok) throw new Error('Registro fallido')

    return res.json()
}

export const verifyToken = async (token: string) => {
    const res = await fetch(`${API_BASE}/verify-token`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) throw new Error('Token inválido')

    return res.json()
}