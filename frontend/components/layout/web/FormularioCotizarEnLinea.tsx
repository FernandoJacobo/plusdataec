import { useState } from 'react';

import { Toast, showToast } from "@/components/general/Toast";

import Select from 'react-select';

type ClickResult = {
    success: boolean;
    message: string;
};

interface FormProps {
    onClickDownload: (data: {}) => ClickResult;
    onClickNext: (data: {}) => ClickResult;
}

const options = [
    { value: '1', label: 'Retenciones de Impuesto a la Renta' },
    { value: '2', label: 'Retenciones de IVA' },
];

const arrHonorarios = [
    { id: 1, rango: 2, desde: 0, hasta: 9999, honorario: 0.12 },
    { id: 2, rango: 2, desde: 10000, hasta: 20000, honorario: 0.12 },
    { id: 3, rango: 3, desde: 20001, hasta: 30000, honorario: 0.10 },
    { id: 4, rango: 4, desde: 30001, hasta: 50000, honorario: 0.08 },
    { id: 5, rango: 6, desde: 50001, hasta: 80000, honorario: 0.07 },
    { id: 6, rango: 7, desde: 80001, hasta: 150000, honorario: 0.06 },
    { id: 7, rango: 8, desde: 150001, hasta: 300000, honorario: 0.05 },
    { id: 8, rango: 9, desde: 300001, hasta: 500000, honorario: 0.04 },
    { id: 9, rango: 10, desde: 500001, hasta: 800000, honorario: 0.03 },
    { id: 10, rango: 10, desde: 800001, hasta: 99999999999, honorario: 0.02 },
];

export default function FormularioCotizarEnLinea({ onClickDownload, onClickNext }: FormProps) {
    const [tipoImpuesto, setTipoImpuesto] = useState('');
    const onChangeTipoImpuesto = (e: any) => {
        if (e == null) return;

        e.value ? setTipoImpuesto(e.value) : setTipoImpuesto('');
    }

    const [valorASolicitar, setValorASolicitar] = useState('');
    const onChangeValorASolicitar = (value: string) => {
        setValorASolicitar(value);

        const val = parseFloat(value);

        setValorADeVolver(val);

        const honorario = getHonorio(val);
        setHonorarios(honorario);
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

    const numberToPercent = (number: number) => {
        const percent = number * 100;
        return `${percent.toFixed(2)} %`;
    }

    const numberFormat = (number: number, decimals: number = 2) => {
        return number.toFixed(decimals)
    }

    const donwload = async () => {
        if (!validateForm()) return;

        handleGeneratePDF();

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
        if (tipoImpuesto.trim() == '') {
            showToast('Es requerido seleccionar un tipo de impuesto.', 'error');
            return false;
        }

        if (valorASolicitar.trim() == '') {
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

    return (
        <>
            <div className="w-full flex flex-col items-center justify-center p-10">
                <form autoComplete="off" className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full space-y-4">
                    <h2 className="text-2xl font-bold text-center"> Cotizar en linea </h2>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="tipoDeImpuesto" className='font-bold'> Tipo de Impuesto </label>
                        <Select options={options} placeholder="Selecciona" noOptionsMessage={() => 'Sin Opciones'} onChange={onChangeTipoImpuesto} />
                    </div>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="valor" className='font-bold'> Valor a solicitar </label>

                        <input
                            type="text"
                            placeholder="$"
                            value={valorASolicitar}
                            onChange={(e) => onChangeValorASolicitar(e.target.value)}
                            className="w-full text-right input-control"
                            required
                        />
                    </div>

                    <div className="bg-purple-50 rounded-2xl shadow-lg max-w-md w-full space-y-4 p-4">
                        <h1 className="font-bold"> Resultado de la cotización: </h1>

                        <div className="max-w-md mx-auto">
                            <div className="bg-purple-50 rounded-lg overflow-hidden">
                                <ul className="divide-y divide-transparent">
                                    <li className="cursor-pointer">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400 font-bold"> Valor a devolver </span>

                                            <span className="text-sm text-gray-500 tex-end"> {numberFormat(valorADeVolver)} </span>
                                        </div>
                                    </li>

                                    <li className="cursor-pointer">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400 font-bold"> (+) Intereses Ganados </span>

                                            <span className="text-sm text-gray-500 tex-end"> {numberFormat(interesesGanados)} </span>
                                        </div>
                                    </li>

                                    <li className="cursor-pointer">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400 font-bold"> (=) Valor de la Nota de Crédito </span>

                                            <span className="text-sm text-gray-500 tex-end"> {numberFormat(valorNotaDeCredito)} </span>
                                        </div>
                                    </li>

                                    <li className="cursor-pointer">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold"> Honorarios (No incluye IVA) </span>

                                            <span className="text-sm text-yellow tex-end font-bold"> {numberToPercent(honorarios)} </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <p className='text-gray-400'> El valor de los intereses ganados son aproximados </p>

                    <div className="flex flex-col md:flex-row gap-3">
                        <button type="button" className="w-full md:w-1/2 bg-white btn-ouline text-violet uppercase font-bold p-2 text-center rounded-4xl hover:border-amber hover:bg-ext-amber hover:text-violet transition hover:cursor-pointer hover:scale-105" onClick={() => { donwload(); }}>
                            Descargar cotización
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