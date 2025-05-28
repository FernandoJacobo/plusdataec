import { useEffect, useState } from 'react';

import { Toast, showToast } from "@/components/general/Toast";

import Select from 'react-select';

import { numberToPercent, numberFormat } from '@/helpers/general';

import { useWebStore } from '@/store/useWebStore';

interface FormProps {
    onClickDownload: () => void;
    onClickNext: () => void;
}

export default function FormularioCotizarEnLinea({ onClickDownload, onClickNext }: FormProps) {
    const { cotizacion, setCotizacion, arrHonorarios, fetchHonorarios, arrTiposImpuesto, fetchTiposImpuesto } = useWebStore();

    useEffect(() => { 
        fetchHonorarios();
        fetchTiposImpuesto();
    }, []);

    const tipoImpuesto = arrTiposImpuesto.find(item => item.value === cotizacion.idTipoImpuesto) || null;
    
    const onChangeTipoImpuesto = (e: any) => {
        if (e == null) return;

        e.value ? setCotizacion({idTipoImpuesto: e.value}) : setCotizacion({idTipoImpuesto: 0});
    }

    const [valorASolicitar, setValorASolicitar] = useState('');
    const onChangeValorASolicitar = (value: string) => {
        setValorASolicitar(value);

        const val = parseFloat(value);
        
        setCotizacion({valorASolicitar: val});

        const honorario = getHonorio(val);
        setCotizacion({honorarios: honorario});
    }

    const getHonorio = (value: number) => {
        const rangoValido = arrHonorarios.find(h =>
            value >= h.desde && value <= h.hasta
        );

        if (rangoValido) {
            const honorario = rangoValido.honorario;
            return honorario;
        }

        return 0;
    }

    const print = async () => {
        if (!validateForm()) return;

        onClickDownload();
    }

    const next = async () => {
        if (!validateForm()) return;

        onClickNext();
    }

    const validateForm = () => {
        if (cotizacion.idTipoImpuesto == 0) {
            showToast('Es requerido seleccionar un tipo de impuesto.', 'error');
            return false;
        }

        if (cotizacion.valorASolicitar == 0) {
            showToast('Es requerido agregar un valor a solicitar.', 'error');
            return false;
        }

        return true;
    }

    const reset = () => {
        setCotizacion({idTipoImpuesto: 0})
        setCotizacion({valorASolicitar: 0});
        setCotizacion({honorarios: 0});
    }

    useEffect(() => { 
        cotizacion.valorASolicitar > 0 ? setValorASolicitar(numberFormat(cotizacion.valorASolicitar)) : 0;
    }, []);

    return (
        <>
            <div className="w-full flex flex-col items-center justify-center p-10">
                <form autoComplete="off" className="w-full md:w-4/6 bg-white p-8 rounded-2xl shadow-lg space-y-4">
                    <h2 className="text-2xl font-bold text-center"> Cotizar en linea </h2>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="tipoDeImpuesto" className='font-bold'> Tipo de Impuesto </label>
                        <Select options={arrTiposImpuesto} placeholder="Selecciona" noOptionsMessage={() => 'Sin Opciones'} value={tipoImpuesto} onChange={onChangeTipoImpuesto} />
                    </div>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="valor" className='font-bold'> Valor a solicitar </label>

                        <input
                            type="text"
                            placeholder="$"
                            value={valorASolicitar}
                            onChange={(e) => onChangeValorASolicitar(e.target.value)}
                            className="w-full text-right input-control"
                        />
                    </div>

                    <div className="bg-purple-50 rounded-2xl shadow-lg w-full space-y-4 p-4">
                        <div className="mx-auto">
                            <p className="text-gray-500 mb-4"> Resultado de la cotización </p>
                            
                            <div className="bg-purple-50 rounded-lg overflow-hidden">
                                <ul className="divide-y divide-transparent">
                                    <li className="cursor-pointer">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold"> Honorarios (No incluye IVA) </span>

                                            <span className="text-sm text-yellow tex-end font-bold"> {numberToPercent(cotizacion.honorarios)} </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-500 mt-4 mb-4"> Nuestros honorarios se pagan en su totalidad (100%) despues de que el SRI emita la resolución final. No requerimos anticipos. </p>

                    <div className="flex flex-col md:flex-row gap-3">
                        <button type="button" className="w-full md:w-1/2 bg-white btn-ouline-violet text-violet uppercase font-bold p-2 text-center rounded-4xl hover:border-amber hover:bg-ext-amber hover:text-violet transition hover:cursor-pointer hover:scale-105" onClick={() => { print(); }}>
                            Imprimir cotización
                        </button>

                        <button type="button" className="w-full md:w-1/2 bg-yellow text-white uppercase font-bold p-2 text-center rounded-4xl hover:border-amber hover:bg-ext-amber hover:text-white transition hover:cursor-pointer hover:scale-105" onClick={() => { next(); }}>
                            Continuar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}