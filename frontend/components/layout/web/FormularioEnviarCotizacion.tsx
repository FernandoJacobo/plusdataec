import { useEffect, useState } from "react";

import { showToast } from "@/components/general/Toast";

import { useWebStore } from '@/store/useWebStore';

import { isValidEmail, isValidPhone, isValidRuc, isOnlyNumbers } from '@/helpers/validations'
import { numberToPercent, numberFormat, showAlert } from '@/helpers/general';

import { Progressbar } from "@/components/general/Progressbar";

import { API_BASE } from "@/lib/config";

interface FormProps {
    onClickRegresar: () => void;
    onClickSenEmail: () => void;
}

const API_BASE_EMAIL = `${API_BASE}/email`;

export default function FormularioEnviarCoizacion({ onClickRegresar, onClickSenEmail }: FormProps) {
    const { arrTiposImpuesto, cotizacion, setCotizacion, informacionDeContacto } = useWebStore();

    const [showProgressbar, setShowProgressbar] = useState(false);

    const handleSendEmail = async () => {
        if (!validateForm()) return;

        setShowProgressbar(true);

        const tipoImpuesto = arrTiposImpuesto.find(item => item.value === cotizacion.idTipoImpuesto);

        const data = new FormData();

        data.append('nombreCompleto', cotizacion.nombreCompleto);
        data.append('nombreEmpresa', cotizacion.nombreORazonSocialBeneficiario);
        data.append('correo', cotizacion.correo);
        data.append('numero', cotizacion.celular);
        data.append('rucEmpresa', cotizacion.rucBeneficiario);
        data.append('tipoDeImpuesto', tipoImpuesto ? tipoImpuesto.label : cotizacion.idTipoImpuesto.toString());
        data.append('valorASolicitar', numberFormat(cotizacion.valorASolicitar));
        data.append('honorarios', numberToPercent(cotizacion.honorarios));
        data.append('correoPD', informacionDeContacto.correo);
        data.append('telefonoPD', informacionDeContacto.numero);
        data.append('idCotizacion', cotizacion.id.toString() ? cotizacion.id.toString() : '');

        const res = await fetch(`${API_BASE_EMAIL}/enviar-cotizacion`, {
            method: "POST",
            body: data,
        });

        const { success, message } = await res.json();
        
        setShowProgressbar(false);
        
        if (!success) {
            showToast(message, 'error');
            return;
        }

        showAlert({
            title: '¡COTIZACIÓN ENVIADA!',
            message: message,
            icon: 'success',
        });

        onClickSenEmail();

        return;
    };

    const validateForm = () => {
        if (cotizacion.nombreCompleto.trim() == '') {
            showToast('Campo requerido.', 'error');
            return false;
        }

        if (cotizacion.correo.trim() == '') {
            showToast('Campo requerido.', 'error');
            return false;
        }

        if (!isValidEmail(cotizacion.correo.trim())) {
            showToast('Correo Electrónico inválido.', 'error');
            return false;
        }

        if (cotizacion.celular.trim() == '') {
            showToast('Campo requerido.', 'error');
            return false;
        }

        if (!isValidPhone(cotizacion.celular.trim())) {
            showToast('Número de celular inválido.', 'error');
            return false;
        }

        if (cotizacion.nombreORazonSocialBeneficiario.trim() == '') {
            showToast('Campo requerido.', 'error');
            return false;
        }

        if (cotizacion.rucBeneficiario.trim() == '') {
            showToast('Campo requerido.', 'error');
            return false;
        }

        if (!isValidRuc(cotizacion.rucBeneficiario.trim())) {
            showToast('RUC inválido.', 'error');
            return false;
        }

        return true;
    }

    const cancelSenEmail = () => {
        onClickRegresar();
    }

    const onChangeCelular = (value: string) => {
        if (!isOnlyNumbers(value.trim())) {
            setCotizacion({celular: ''})
            return;
        }

        setCotizacion({celular: value})
    }


    const onChangeRuc = (value: string) => {
        if (!isOnlyNumbers(value.trim())) {
            setCotizacion({rucBeneficiario: ''})
            return;
        }
        
        setCotizacion({rucBeneficiario: value})
    }

    return (
        <div className="w-full flex flex-col items-center justify-center p-10">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full md:w-4/6  space-y-4">
                <h2 className="text-2xl font-bold text-center"> Enviar cotización a mi correo </h2>

                <p className='text-gray-400'> Ingresa tus datos de contacto y la informaciòn general del beneficiario (persona o empresa) para generar la cotizaciòn. </p>

                <form autoComplete="off" className="">
                    <div className="flex flex-col gap-3 mb-3">
                        <label htmlFor="name" className='font-bold'> Nombre Completo </label>
                        <input
                            type="text"
                            placeholder=""
                            value={cotizacion.nombreCompleto}
                            onChange={(e) => setCotizacion({nombreCompleto: e.target.value})}
                            className="w-full p-2 rounded input-control"
                        />
                    </div>

                    <div className='flex flex-col md:flex-row gap-2 mb-3'>
                        <div className="w-full flex flex-col gap-3">
                            <label htmlFor="email" className='font-bold'> Correo Electrónico </label>
                            <input
                                type="text"
                                placeholder=""
                                value={cotizacion.correo}
                                onChange={(e) => setCotizacion({correo: e.target.value})}
                                className="w-full p-2 rounded input-control"

                            />
                        </div>

                        <div className="w-full flex flex-col gap-3">
                            <label htmlFor="phone" className='font-bold'> Nro. de celular </label>
                            <input
                                type="text"
                                placeholder=""
                                value={cotizacion.celular}
                                onChange={(e) => {onChangeCelular(e.target.value)}}
                                className="w-full p-2 rounded input-control"

                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mb-3">
                        <label htmlFor="name" className='font-bold'> Nombre del Beneficiario (persona o empresa) </label>
                        <input
                            type="text"
                            placeholder=""
                            value={cotizacion.nombreORazonSocialBeneficiario}
                            onChange={(e) => setCotizacion({nombreORazonSocialBeneficiario: e.target.value})}
                            className="w-full p-2 rounded input-control"
                        />
                    </div>

                    <div className="flex flex-col gap-3 mb-3">
                        <label htmlFor="name" className='font-bold'> Nro. de RUC del Beneficiario </label>
                        <input
                            type="text"
                            placeholder=""
                            value={cotizacion.rucBeneficiario}
                            onChange={(e) => { onChangeRuc(e.target.value) }}
                            className="w-full p-2 rounded input-control"
                        />
                    </div>

                    <div className="mt-4 mb-4">
                        { showProgressbar ?  <Progressbar/> : <></> }
                    </div>

                    <div className="flex flex-row gap-3 mt-7">
                        <button type="button" className="w-full md:w-1/2 btn-ouline text-violet uppercase font-bold p-2 text-center rounded-4xl hover:border-amber hover:bg-ext-amber hover:text-white transition hover:cursor-pointer hover:scale-105" onClick={() => { cancelSenEmail(); }}>
                            Regresar
                        </button>

                        <button type="button" className="w-full md:w-1/2 bg-yellow text-white uppercase font-bold p-2 text-center rounded-4xl hover:border-amber hover:bg-ext-amber hover:text-white transition hover:cursor-pointer hover:scale-105" onClick={() => { handleSendEmail(); }}>
                            Enviar Cotización
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}