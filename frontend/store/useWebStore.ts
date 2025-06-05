import { create } from "zustand";

import { WebStoreState } from '@/types';

import { API_BASE_WEB } from "@/lib/config";

const API_BASE = API_BASE_WEB;

export const useWebStore = create<WebStoreState>((set) => ({
    // Mensaje de Contacto
    mensaje: {
        id: 0,
        nombre: '',
        correo: '',
        celular: '',
        mensaje: '',
    },
    setMensaje: (valor) =>
        set((state) => ({
            mensaje: {
                ...state.mensaje,
                ...valor,
            },
        })),

    // Información de Contacto
    informacionDeContacto: {
        numero: '0967899905',
        correo: 'info@plusdata.ec'
    },
    setInformacionDeContacto: (valor) =>
        set((state) => ({
            informacionDeContacto: {
                ...state.informacionDeContacto,
                ...valor,
            },
        })),

    // Cotización inicial
    cotizacion: {
        id: 0,
        idEstatus: 0,
        idTipoImpuesto: 0,
        valorASolicitar: 0,
        honorarios: 0,
        nombreCompleto: '',
        correo: '',
        celular: '',
        nombreORazonSocialBeneficiario: '',
        rucBeneficiario: '',
        archivo: null,
        archivoNombre: '',
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
