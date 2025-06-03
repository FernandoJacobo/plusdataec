import { useEffect, useState } from 'react';

import Select from 'react-select';
import { numberToPercent, numberFormat } from '@/helpers/general';
import { useWebStore } from '@/store/useWebStore';

interface FormProps {
    onClickDownload: () => void;
    onClickNext: () => void;
}

export default function FormularioCotizarEnLinea({ onClickDownload, onClickNext }: FormProps) {
    const { cotizacion, setCotizacion, arrHonorarios, fetchHonorarios, arrTiposImpuesto, fetchTiposImpuesto } = useWebStore();

    const tipoImpuesto = arrTiposImpuesto.find(item => item.value === cotizacion.idTipoImpuesto) || null;

    const [valorASolicitar, setValorASolicitar] = useState('');
    const [errors, setErrors] = useState<{ tipoImpuesto?: string; valorASolicitar?: string }>({});

    const onChangeTipoImpuesto = (e: any) => {
        setErrors((prev) => ({ ...prev, tipoImpuesto: '' }));
        if (e == null) return;

        e.value ? setCotizacion({ idTipoImpuesto: e.value }) : setCotizacion({ idTipoImpuesto: 0 });
    };

    const onChangeValorASolicitar = (value: string) => {
        const newErrors: { tipoImpuesto?: string; valorASolicitar?: string } = {};

        setErrors((prev) => ({ ...prev, valorASolicitar: '' }));
        setValorASolicitar(value);

        const val = parseFloat(value.replace(/[^0-9.]/g, ''));
        setCotizacion({ valorASolicitar: val });

        if (val < 9999.99) {
            newErrors.valorASolicitar = 'Monto mínimo $10,000.00.';
        }

        setErrors(newErrors);

        const honorario = getHonorio(val);
        setCotizacion({ honorarios: honorario });
    };

    const getHonorio = (value: number) => {
        const rangoValido = arrHonorarios.find(h => value >= h.desde && value <= h.hasta);
        return rangoValido ? rangoValido.honorario : 0;
    };

    const print = () => {
        if (!validateForm()) return;
        onClickDownload();
    };

    const next = () => {
        if (!validateForm()) return;
        onClickNext();
    };

    const validateForm = () => {
        const newErrors: { tipoImpuesto?: string; valorASolicitar?: string } = {};

        if (cotizacion.idTipoImpuesto === 0) {
            newErrors.tipoImpuesto = 'Selecciona un tipo de impuesto.';
        }

        if (cotizacion.valorASolicitar === 0) {
            newErrors.valorASolicitar = 'Agrega un valor a solicitar.';
        }

        if (cotizacion.valorASolicitar < 9999.99) {
            newErrors.valorASolicitar = 'Monto mínimo $10,000.00.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        if (cotizacion.valorASolicitar > 0) {
            setValorASolicitar(numberFormat(cotizacion.valorASolicitar));
        }
    }, []);

    return (
        <div className="w-full flex flex-col items-center justify-center p-10">
            <form autoComplete="off" className="w-full md:w-4/6 bg-white p-8 rounded-2xl shadow-lg space-y-4">
                <h2 className="text-2xl font-bold text-center"> Cotizar en línea </h2>

                {/* Tipo de Impuesto */}
                <div className="flex flex-col gap-3">
                    <label htmlFor="tipoDeImpuesto" className='font-bold'>Tipo de Impuesto</label>
                    <Select
                        options={arrTiposImpuesto}
                        placeholder="Selecciona"
                        noOptionsMessage={() => 'Sin opciones'}
                        value={tipoImpuesto}
                        onChange={onChangeTipoImpuesto}
                    />
                    {errors.tipoImpuesto && <p className="text-red-500 text-sm">{errors.tipoImpuesto}</p>}
                </div>

                {/* Valor a solicitar */}
                <div className="flex flex-col gap-3">
                    <label htmlFor="valor" className='font-bold'>Valor a solicitar</label>
                    <input
                        type="text"
                        placeholder="$"
                        value={valorASolicitar}
                        onChange={(e) => onChangeValorASolicitar(e.target.value)}
                        className="w-full text-right input-control"
                    />
                    {errors.valorASolicitar && <p className="text-red-500 text-sm">{errors.valorASolicitar}</p>}
                </div>

                {/* Resultado cotización */}
                <div className="bg-purple-50 rounded-2xl shadow-lg w-full space-y-4 p-4">
                    <p className="text-gray-500 mb-4">Resultado de la cotización</p>
                    <div className="bg-purple-50 rounded-lg overflow-hidden">
                        <ul className="divide-y divide-transparent">
                            <li>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">Honorarios (No incluye IVA)</span>
                                    <span className="text-sm text-yellow font-bold">
                                        {numberToPercent(cotizacion.honorarios)}
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <p className="text-gray-500 mt-4 mb-4">
                    Nuestros honorarios se pagan en su totalidad (100%) después de que el SRI emita la resolución final. No requerimos anticipos.
                </p>

                {/* Botones */}
                <div className="flex flex-col md:flex-row gap-3">
                    <button
                        type="button"
                        className="w-full md:w-1/2 bg-white btn-ouline-violet text-violet uppercase font-bold p-2 text-center rounded-4xl hover:border-amber hover:bg-ext-amber hover:text-violet transition hover:cursor-pointer hover:scale-105"
                        onClick={print}
                    >
                        Imprimir cotización
                    </button>

                    <button
                        type="button"
                        className="w-full md:w-1/2 bg-yellow text-white uppercase font-bold p-2 text-center rounded-4xl hover:border-amber hover:bg-ext-amber hover:text-white transition hover:cursor-pointer hover:scale-105"
                        onClick={next}
                    >
                        Continuar
                    </button>
                </div>
            </form>
        </div>
    );
}
