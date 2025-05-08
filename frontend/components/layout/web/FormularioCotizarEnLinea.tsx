import { useEffect, useState } from 'react';

import { Toast, showToast } from "@/components/general/Toast";

import Select from 'react-select';

import { numberToPercent, numberFormat } from '@/helpers/general';

import { useWebStore } from '@/store/useWebStore';

type ClickResult = {
    success: boolean;
    message: string;
};

interface FormProps {
    onClickDownload: (data: {}) => ClickResult;
    onClickNext: (data: {}) => ClickResult;
}

export default function FormularioCotizarEnLinea({ onClickDownload, onClickNext }: FormProps) {
    const { cotizacion, setCotizacion, arrHonorarios, fetchHonorarios, arrTiposImpuesto, fetchTiposImpuesto } = useWebStore();

    useEffect(() => { 
        fetchHonorarios();
        fetchTiposImpuesto();
    }, []);

    const tipoImpuesto = arrTiposImpuesto.find(item => item.value === cotizacion.tipoImpuesto) || null;
    
    const onChangeTipoImpuesto = (e: any) => {
        if (e == null) return;

        e.value ? setCotizacion({tipoImpuesto: e.value}) : setCotizacion({tipoImpuesto: ''});
    }

    const [valorASolicitar, setValorASolicitar] = useState('');
    const onChangeValorASolicitar = (value: string) => {
        setCotizacion({valorASolicitar: value});

        const val = parseFloat(value);

        setValorADeVolver(val);

        const honorario = getHonorio(val);
        setCotizacion({honorarios: honorario});
    }

    const [valorADeVolver, setValorADeVolver] = useState(0);

    const [interesesGanados, setInteresesGanados] = useState(0);
    const [valorNotaDeCredito, setValorNotaDeCredito] = useState(0);

    const [honorarios, setHonorarios] = useState(0);

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

        // handleGeneratePDF();

        onClickDownload({
            tipoImpuesto,
            valorASolicitar,
            valorADeVolver,
            interesesGanados,
            valorNotaDeCredito,
            honorarios,
        });
    }

    const next = async () => {
        if (!validateForm()) return;

        onClickNext({
            tipoImpuesto,
            valorASolicitar,
            valorADeVolver,
            interesesGanados,
            valorNotaDeCredito,
            honorarios,
        });
    }

    const validateForm = () => {
        if (cotizacion.tipoImpuesto == '') {
            showToast('Es requerido seleccionar un tipo de impuesto.', 'error');
            return false;
        }

        if (cotizacion.valorASolicitar.trim() == '') {
            showToast('Es requerido agregar un valor a solicitar.', 'error');
            return false;
        }

        /* if (valorADeVolver == 0) {
            showToast('Campo Requerido', 'error');
            return false;
        }

        if (interesesGanados == 0) {
            showToast('Campo Requerido', 'error');
            return false;
        }

        if (valorNotaDeCredito == 0) {
            showToast('Campo Requerido', 'error');
            return false;
        }

        if (honorarios == 0) {
            showToast('Campo Requerido', 'error');
            return false;
        } */

        return true;
    }

    const handleGeneratePDF = async () => {
        const html = `<html><body><h1>Hola, PDF</h1></body></html>`;

        const res = await fetch("http://localhost:4000/api/pdf/generate-pdf", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ htmlContent: html }),
        });

        console.log(res);

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "documento.pdf";
        link.click();
    };

    const reset = () => {
        setCotizacion({tipoImpuesto: ''})
        setCotizacion({valorASolicitar: ''});
        setCotizacion({honorarios: 0});
    }

    return (
        <>
            <div className="w-full flex flex-col items-center justify-center p-10">
                <form autoComplete="off" className="bg-white p-8 rounded-2xl shadow-lg w-full md:w-4/6 space-y-4">
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
                            value={cotizacion.valorASolicitar}
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

                        <button type="button" className="w-full md:w-1/2 bg-purple text-white uppercase font-bold p-2 text-center rounded-4xl hover:border-amber hover:bg-purple hover:text-violet transition hover:cursor-pointer hover:scale-105" onClick={() => { reset(); }}>
                            Limpiar Campos
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-3">
                        <button type="button" className="w-full md:w-1/2 bg-white btn-ouline-yellow text-yellow uppercase font-bold p-2 text-center rounded-4xl hover:border-yellow hover:bg-ext-yellow hover:text-yellow transition hover:cursor-pointer hover:scale-105" onClick={() => { print(); }}>
                            Enviar cotización
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