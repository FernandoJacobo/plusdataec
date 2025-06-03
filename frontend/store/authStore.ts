import { create } from 'zustand'

interface AuthState {
    loading: boolean
    error: string | null
    token: string | null
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    register: (name: string, email: string, password: string) => Promise<void>
    logout: () => void
    checkAuth: () => Promise<void>
}

import { API_BASE_AUTH } from "@/lib/config";

const API_BASE = API_BASE_AUTH;

export const useAuthStore = create<AuthState>((set) => ({
    loading: false,
    error: null,
    token: null,
    isAuthenticated: false,

    login: async (email, password) => {
        set({ loading: true, error: null })
        try {
            const res = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            if (!res.ok) throw new Error('Credenciales incorrectas')

            const result = await res.json()
            if (!result.token) throw new Error('Token no recibido')

            localStorage.setItem('auth_token', result.token)
            set({ token: result.token, isAuthenticated: true })
        } catch (err: any) {
            set({ error: err.message || 'Error al iniciar sesión' })
        } finally {
            set({ loading: false })
        }
    },

    register: async (name, email, password) => {
        set({ loading: true, error: null })
        try {
            const res = await fetch(`${API_BASE}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            })

            if (!res.ok) throw new Error('Error al registrarse')

            const result = await res.json()
            if (!result.token) throw new Error('Token no recibido')

            localStorage.setItem('auth_token', result.token)
            set({ token: result.token, isAuthenticated: true })
        } catch (err: any) {
            set({ error: err.message || 'Error al registrar' })
        } finally {
            set({ loading: false })
        }
    },

    logout: () => {
        localStorage.removeItem('auth_token')
        set({ token: null, isAuthenticated: false, error: null })
    },

    checkAuth: async () => {
        const storedToken = localStorage.getItem('auth_token')
        if (!storedToken) return

        set({ loading: true, error: null })

        try {
            const res = await fetch(`${API_BASE}/verify-token`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })

            if (!res.ok) throw new Error('Token inválido')

            // Si el token es válido:
            set({ token: storedToken, isAuthenticated: true })
        } catch (err: any) {
            localStorage.removeItem('auth_token')
            set({ token: null, isAuthenticated: false, error: err.message || 'No autorizado' })
        } finally {
            set({ loading: false })
        }
    }
}));