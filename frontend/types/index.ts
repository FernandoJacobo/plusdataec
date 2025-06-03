export interface Mensaje {
    id: number;
    nombre: string;
    correo: string;
    celular: string;
    mensaje: string;
}

export interface InformacionDeContacto {
    numero: string;
    correo: string;
}

export interface Cotizacion {
    id: number;
    idEstatus: number;
    idTipoImpuesto: number;
    valorASolicitar: number;
    honorarios: number;
    nombreComlpeto: string;
    correo: string;
    celular: string;
    nombreORazonSocialBeneficiario: string;
    rucBeneficiario: string;
    archivo: File | null;
}

export interface Honorarios {
    id: number;
    rango: number;
    desde: number;
    hasta: number;
    honorario: number;
}

export interface Contribuyente {
    ruc: string;
    nombreORazonSocial: string;
    correo: string;
    celular: string;
}

export interface OptionSelect {
    value: number | string;
    label: string;
}

export interface WebStoreState {
    mensaje: Mensaje,
    setMensaje: (input: Partial<Mensaje>) => void;

    informacionDeContacto: InformacionDeContacto,
    setInformacionDeContacto: (input: Partial<InformacionDeContacto>) => void;

    cotizacion: Cotizacion;
    setCotizacion: (input: Partial<Cotizacion>) => void;

    contribuyente: Contribuyente;
    setContribuyente: (input: Partial<Contribuyente>) => void;

    loadingHonorarios: boolean;
    loadingTiposImpuesto: boolean;
    errorHonorarios: string | null;
    errorTiposImpuesto: string | null;

    arrHonorarios: Honorarios[];
    arrTiposImpuesto: OptionSelect[];

    fetchHonorarios: () => Promise<void>;
    fetchTiposImpuesto: () => Promise<void>;
}