import { create } from 'zustand'

interface OptionItem {
    value: number | string
    label: string
}

interface WebState {
    loadingHonorarios: boolean
    loadingTiposImpuesto: boolean
    errorHonorarios: string | null
    errorTiposImpuesto: string | null
    arrHonorarios: OptionItem[]
    arrTiposImpuesto: OptionItem[]
    fetchHonorarios: () => Promise<void>
    fetchTiposImpuesto: () => Promise<void>
}

const API_BASE = process.env.API_URL || 'http://localhost:4000/api/web'

export const useWebStore = create<WebState>((set) => ({
    loadingHonorarios: false,
    loadingTiposImpuesto: false,
    errorHonorarios: null,
    errorTiposImpuesto: null,
    arrHonorarios: [],
    arrTiposImpuesto: [],

    // Función para obtener honorarios
    fetchHonorarios: async () => {
        set({ loadingHonorarios: true, errorHonorarios: null })
        try {
            const res = await fetch(`${API_BASE}/honorarios`)
            if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)

            const result = await res.json()
            if (!Array.isArray(result.data)) throw new Error('Respuesta inválida del servidor')

            set({ arrHonorarios: result.data })
        } catch (err: any) {
            set({ errorHonorarios: err.message || 'Error desconocido' })
            console.error('[Zustand] Honorarios:', err)
        } finally {
            set({ loadingHonorarios: false })
        }
    },

    // Función para obtener tipos de impuesto
    fetchTiposImpuesto: async () => {
        set({ loadingTiposImpuesto: true, errorTiposImpuesto: null })
        try {
            const res = await fetch(`${API_BASE}/tiposimpuesto`)
            if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)

            const result = await res.json()
            if (!Array.isArray(result.data)) throw new Error('Respuesta inválida del servidor')

            set({ arrTiposImpuesto: result.data })
        } catch (err: any) {
            set({ errorTiposImpuesto: err.message || 'Error desconocido' })
            console.error('[Zustand] TiposImpuesto:', err)
        } finally {
            set({ loadingTiposImpuesto: false })
        }
    }
}))
