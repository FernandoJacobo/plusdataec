import { useState } from "react";

import { showToast } from "@/components/general/Toast";

import { useStore } from '@/store/useStore';

import { isValidEmail, isValidPhone } from '@/helpers/validations'
import { numberToPercent, numberFormat } from '@/helpers/general';

type ClickResult = {
    success: boolean;
    message: string;
};

interface FormProps {
    onClickRegresar: (data: {}) => ClickResult;
}

export default function FormularioEnviarCoizacion({ onClickRegresar }: FormProps) {
    const { cotizacion, setCotizacion } = useStore();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [nameBeneficiary, setNameBeneficiary] = useState('');
    const [rucBeneficiary, setBeneficiary] = useState('');

    const handleSendEmail = async () => {
        if (!validateForm()) return;

        const data = new FormData();

        data.append('nombreORazonSocial', name);
        data.append('nombreEmpresa', nameBeneficiary);
        data.append('correo', email);
        data.append('numero', phone);
        data.append('rucEmpresa', rucBeneficiary);
        data.append('tipoDeImpuesto', cotizacion.tipoImpuesto);
        data.append('valorASolicitar', cotizacion.valorASolicitar);
        data.append('honorarios', numberToPercent(cotizacion.honorarios));

        const res = await fetch("http://localhost:4000/api/email/send", {
            method: "POST",
            body: data,
        });

        const { success, message } = await res.json();
        
        if (!success) {
            showToast(message, 'error');
            return;
        }

        showToast(message, 'success');
        return;
    };

    const validateForm = () => {
        if (name.trim() == '') {
            showToast('Campo requerido.', 'error');
            return false;
        }

        if (email.trim() == '') {
            showToast('Campo requerido.', 'error');
            return false;
        }

        if (!isValidEmail(email.trim())) {
            showToast('Correo Electrónico inválido.', 'error');
            return false;
        }

        if (phone.trim() == '') {
            showToast('Campo requerido.', 'error');
            return false;
        }

        if (!isValidPhone(phone.trim())) {
            showToast('Número de celular inválido.', 'error');
            return false;
        }

        if (nameBeneficiary.trim() == '') {
            showToast('Campo requerido.', 'error');
            return false;
        }

        if (rucBeneficiary.trim() == '') {
            showToast('Campo requerido.', 'error');
            return false;
        }

        return true;
    }

    const cancelSenEmail = () => {
        onClickRegresar(true);
    }

    return (
        <div className="w-full flex flex-col items-center justify-center p-10">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full space-y-4">
                <h2 className="text-2xl font-bold text-center"> Enviar cotización a mi correo </h2>

                <p className='text-gray-400'> Ingresa tus datos de contacto y la informaciòn general del beneficiario (persona o empresa) para generar la cotizaciòn. </p>

                <form autoComplete="off" className="">
                    <div className="flex flex-col gap-3 mb-3">
                        <label htmlFor="name" className='font-bold'> Nombre Completo </label>
                        <input
                            type="text"
                            placeholder=""
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 rounded input-control"
                        />
                    </div>

                    <div className='flex flex-col md:flex-row gap-2 mb-3'>
                        <div className="w-full flex flex-col gap-3">
                            <label htmlFor="email" className='font-bold'> Correo Electrónico </label>
                            <input
                                type="text"
                                placeholder=""
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 rounded input-control"

                            />
                        </div>

                        <div className="w-full flex flex-col gap-3">
                            <label htmlFor="phone" className='font-bold'> Nro. de celular </label>
                            <input
                                type="text"
                                placeholder=""
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full p-2 rounded input-control"

                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mb-3">
                        <label htmlFor="name" className='font-bold'> Nombre del Beneficiario (persona o empresa) </label>
                        <input
                            type="text"
                            placeholder=""
                            value={nameBeneficiary}
                            onChange={(e) => setNameBeneficiary(e.target.value)}
                            className="w-full p-2 rounded input-control"
                        />
                    </div>

                    <div className="flex flex-col gap-3 mb-3">
                        <label htmlFor="name" className='font-bold'> Nro. de RUC del Beneficiario </label>
                        <input
                            type="text"
                            placeholder=""
                            value={rucBeneficiary}
                            onChange={(e) => setBeneficiary(e.target.value)}
                            className="w-full p-2 rounded input-control"
                        />
                    </div>

                    <div className="flex flex-row gap-3 mt-7">
                        <button type="button" className="w-full md:w-1/2 btn-ouline text-violet uppercase font-bold p-2 text-center rounded-4xl hover:border-amber hover:bg-ext-amber hover:text-white transition hover:cursor-pointer hover:scale-105" onClick={() => { cancelSenEmail(); }}>
                            Regresar atrás
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