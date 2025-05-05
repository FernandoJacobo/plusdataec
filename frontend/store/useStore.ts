import { create } from 'zustand';

export interface Cotizacion {
    tipoImpuesto: string;
    valorASolicitar: string;
    honorarios: number;
}

export interface StoreState {
    cotizacion: Cotizacion;
    setCotizacion: (input: Partial<Cotizacion>) => void;
}

export const useStore = create<StoreState>((set) => ({
    cotizacion: {
        tipoImpuesto: '',
        valorASolicitar: '',
        honorarios: 0
    },
    setCotizacion: (valor) => set((state) => ({
        cotizacion: {
            ...state.cotizacion,
            ...valor
        }
    }))
}));