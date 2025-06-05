import { Mensaje } from '@/types';

import { API_BASE_WEB } from "@/lib/config";

const API_BASE = API_BASE_WEB;

export const sendMessage = async ({nombre, correo, celular, mensaje}: Mensaje) => {
    const res = await fetch(`${API_BASE}/enviar-mensaje`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({nombre, correo, celular, mensaje}),
    });

    if (!res.ok) throw new Error("Envio fallido");

    return res.json();
};

export const registerMessage = async ({nombre, correo, celular, mensaje}: Mensaje) => {
    const res = await fetch(`${API_BASE}/registrar-mensaje`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({nombre, correo, celular, mensaje}),
    });

    if (!res.ok) throw new Error("Registro fallido");

    return res.json();
};