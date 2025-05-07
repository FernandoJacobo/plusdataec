import { create } from "zustand";

export interface Cotizacion {
    tipoImpuesto: string;
    valorASolicitar: string;
    honorarios: number;
}

interface Honorarios {
    id: number;
    rango: number;
    desde: number;
    hasta: number;
    honorario: number;
}

interface OptionSelect {
    value: number | string;
    label: string;
}

interface Contribuyente {
    ruc: string;
    nombreORazonSocial: string;
    correo: string;
    celular: string;
    archivo: File | null;
}

interface WebStoreState {
    // Datos de Cotización
    cotizacion: Cotizacion;
    setCotizacion: (input: Partial<Cotizacion>) => void;

    // Datos Contribuyente
    contribuyente: Contribuyente;
    setContribuyente: (input: Partial<Contribuyente>) => void;

    // Estado de carga y errores
    loadingHonorarios: boolean;
    loadingTiposImpuesto: boolean;
    errorHonorarios: string | null;
    errorTiposImpuesto: string | null;

    // Listas de opciones
    arrHonorarios: Honorarios[];
    arrTiposImpuesto: OptionSelect[];

    // Métodos para cargar datos desde el backend
    fetchHonorarios: () => Promise<void>;
    fetchTiposImpuesto: () => Promise<void>;
}

const API_BASE = process.env.API_URL || "http://localhost:4000/api/web";

export const useWebStore = create<WebStoreState>((set) => ({
    // Cotización inicial
    cotizacion: {
        tipoImpuesto: "",
        valorASolicitar: "",
        honorarios: 0,
    },
    setCotizacion: (valor) =>
        set((state) => ({
            cotizacion: {
                ...state.cotizacion,
                ...valor,
            },
        })),

    // Contribuyente
    contribuyente: {
        ruc: "",
        nombreORazonSocial: "",
        correo: "",
        celular: "",
        archivo: null
    },
    setContribuyente: (valor) =>
        set((state) => ({
            contribuyente: {
                ...state.contribuyente,
                ...valor,
            },
        })),

    // Estado de carga y errores
    loadingHonorarios: false,
    loadingTiposImpuesto: false,
    errorHonorarios: null,
    errorTiposImpuesto: null,

    // Listas vacías por defecto
    arrHonorarios: [],
    arrTiposImpuesto: [],

    // Cargar honorarios
    fetchHonorarios: async () => {
        set({ loadingHonorarios: true, errorHonorarios: null });
        try {
            const res = await fetch(`${API_BASE}/honorarios`);
            if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

            const result = await res.json();
            if (!Array.isArray(result.data))
                throw new Error("Respuesta inválida del servidor");

            set({ arrHonorarios: result.data });
        } catch (err: any) {
            set({ errorHonorarios: err.message || "Error desconocido" });
            console.error("[Zustand] Honorarios:", err);
        } finally {
            set({ loadingHonorarios: false });
        }
    },

    // Cargar tipos de impuesto
    fetchTiposImpuesto: async () => {
        set({ loadingTiposImpuesto: true, errorTiposImpuesto: null });
        try {
            const res = await fetch(`${API_BASE}/tiposimpuesto`);
            if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

            const result = await res.json();
            if (!Array.isArray(result.data))
                throw new Error("Respuesta inválida del servidor");

            set({ arrTiposImpuesto: result.data });
        } catch (err: any) {
            set({ errorTiposImpuesto: err.message || "Error desconocido" });
            console.error("[Zustand] TiposImpuesto:", err);
        } finally {
            set({ loadingTiposImpuesto: false });
        }
    },
}));
