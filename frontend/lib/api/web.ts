const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/web";

import { Mensaje } from '@/types'

export const sendMessage = async ({nombre, correo, celular, mensaje}: Mensaje) => {
    const res = await fetch(`${API}/enviar-mensaje`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({nombre, correo, celular, mensaje}),
    });

    if (!res.ok) throw new Error("Envio fallido");

    return res.json();
};

export const registerMessage = async ({nombre, correo, celular, mensaje}: Mensaje) => {
    const res = await fetch(`${API}/registrar-mensaje`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({nombre, correo, celular, mensaje}),
    });

    if (!res.ok) throw new Error("Registro fallido");

    return res.json();
};