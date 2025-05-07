interface UserProps {
    nombre: string;
    celular: string;
    correo: string;
    contrasena: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/auth'

export const login = async (email: string, password: string) => {
    const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    if (!res.ok) throw new Error('Login fallido')

    return res.json()
}

export const register = async ({nombre, celular, correo, contrasena}: UserProps) => {
    const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, celular, correo, contrasena })
    })

    console.log(res);

    if (!res.ok) throw new Error('Registro fallido')

    return res.json()
}

export const verifyToken = async (token: string) => {
    const res = await fetch(`${API}/verify-token`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) throw new Error('Token inválido')

    return res.json()
}