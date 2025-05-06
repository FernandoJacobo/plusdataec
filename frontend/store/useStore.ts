import { create } from 'zustand';

export interface Cotizacion {
    tipoImpuesto: string;
    valorASolicitar: string;
    honorarios: number;
}

export interface SubirSolicitud {
    ruc: string;
    name: string;
    email: string;
    phone: string;
    file: File | null
}

export interface StoreState {
    cotizacion: Cotizacion;
    setCotizacion: (input: Partial<Cotizacion>) => void;
    subirSolicitud: SubirSolicitud;
    setSubirSolicitud: (input: Partial<SubirSolicitud>) => void;
}

export const useStore = create<StoreState>((set) => ({
    cotizacion: {
        tipoImpuesto: '',
        valorASolicitar: '',
        honorarios: ''
    },
    setCotizacion: (valor) => set((state) => ({
        cotizacion: {
            ...state.cotizacion,
            ...valor
        }
    })),
    subirSolicitud: {
        ruc: '',
        name: '',
        email: '',
        phone: '',
        file: null,
      },
      setSubirSolicitud: (valor) => set((state) => ({
        subirSolicitud: {
          ...state.subirSolicitud,
          ...valor,
        }
      })),
}));