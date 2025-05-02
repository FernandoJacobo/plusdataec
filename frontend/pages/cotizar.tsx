'use client'

import { useState } from "react";

import Select from 'react-select';

import FormularioRegistro from '@/components/layout/web/FormularioRegistro';
import FormularioIngresar from "@/components/layout/web/FormularioIngresar";

const steps = [
    { id: 1, title: "Cotizar" },
    { id: 2, title: "Imprimir" },
    { id: 3, title: "Ingresar" },
    { id: 4, title: "Confirmar" },
];

const options = [
    { value: 1, label: 'Pago en exceso de Impuestos a la Renta' },
    { value: 2, label: 'Retenciones de IVA' },
];

type ClickResult = {
    success: boolean;
    message: string;
};

export default function CotizarPage() {
    const [currentStep, setCurrentStep] = useState(1);

    const [tipoImpuesto, setTipoImpuesto] = useState('');
    const [valor, setValor] = useState('');

    const onChangeSelect = (e: any) => {
        if (e == null) return;

        e.value ? setTipoImpuesto(e.value) : setTipoImpuesto('');
    }

    const handleForm = async (e: React.FormEvent) => {
        e.preventDefault()
        // Aquí se llamará al backend
        console.log({ tipoImpuesto, valor })
    }

    const [ruc, setRuc] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [showRegister, setShowRegister] = useState(false);

    const renderContent = () => {
        switch (currentStep) {
            case 1: // Cotizar
                return (
                    <div className="w-full flex flex-col items-center justify-center p-10">
                        <form onSubmit={handleForm} className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full space-y-4">
                            <div className="flex flex-col gap-3">
                                <label htmlFor="tipoDeImpuesto" className='font-bold'> Tipo de Impuesto </label>
                                <Select options={options} placeholder="Selecciona" noOptionsMessage={() => 'Sin Opciones'} onChange={onChangeSelect} />
                            </div>

                            <div className="flex flex-col gap-3">
                                <label htmlFor="valor" className='font-bold'> Valor </label>

                                <input
                                    type="text"
                                    placeholder="$"
                                    value={valor}
                                    onChange={(e) => setValor(e.target.value)}
                                    className="w-full text-right input-control"
                                    required
                                />
                            </div>

                            <div className="bg-purple-50 rounded-2xl shadow-lg max-w-md w-full space-y-4 p-4">
                                <h1 className="font-bold"> Resultado de la cotización: </h1>

                                <div className="max-w-md mx-auto">
                                    <div className="bg-purple-50 rounded-lg overflow-hidden">
                                        <ul className="divide-y divide-transparent">
                                            <li className=" hover:bg-gray-100 cursor-pointer">
                                                <div className="flex justify-between items-center">
                                                    <span className=""> Intereses Ganados </span>

                                                    <span className="text-sm text-gray-500 tex-end"> $0.00 </span>
                                                </div>
                                            </li>

                                            <li className=" hover:bg-gray-100 cursor-pointer">
                                                <div className="flex justify-between items-center">
                                                    <span className=""> Honorarios </span>

                                                    <span className="text-sm text-gray-500 tex-end"> $0.00 </span>
                                                </div>
                                            </li>

                                            <li className=" hover:bg-gray-100 cursor-pointer">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold"> Valor Neto a recibir </span>
                                                    <span className="text-sm text-gray-500 tex-end"> $0.00 </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <p className='text-gray-400'> El valor de los intereses ganados son aproximados </p>

                            <button className="w-full bg-violet text-white uppercase font-bold p-2 text-center rounded-4xl hover:border-amber hover:bg-ext-amber hover:text-white transition hover:cursor-pointer hover:scale-105" onClick={() => { alert(); }}>
                                Ingresar
                            </button>
                        </form>
                    </div>
                );
            case 2: // Imprimir
                return (
                    <div className="w-full flex flex-col items-center justify-center p-10">
                        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full space-y-4">
                            <h2 className="text-2xl font-bold text-center"> Imprimir cotización </h2>

                            <p className='text-gray-400'> Debe de registrar los datos del beneficiario que forma parte de la cotización que deseas imprimir </p>

                            <form onSubmit={handleForm} className="">
                                <div className="flex flex-col gap-3 mb-3">
                                    <label htmlFor="name" className='font-bold'> Nro. de RUC </label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        value={ruc}
                                        onChange={(e) => setRuc(e.target.value)}
                                        className="w-full p-2 rounded input-control"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col gap-3 mb-3">
                                    <label htmlFor="name" className='font-bold'> Nombre o Razón Social </label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        value={ruc}
                                        onChange={(e) => setRuc(e.target.value)}
                                        className="w-full p-2 rounded input-control"
                                        required
                                    />
                                </div>

                                <div className='flex flex-col md:flex-row gap-2 mb-3'>
                                    <div className="w-full flex flex-col gap-3">
                                        <label htmlFor="email" className='font-bold'> Correo Electrónico </label>
                                        <input
                                            type="text"
                                            placeholder="Ingresa tu correo electrónico"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full p-2 rounded input-control"
                                            required
                                        />
                                    </div>

                                    <div className="w-full flex flex-col gap-3">
                                        <label htmlFor="phone" className='font-bold'> Nro. de celular </label>
                                        <input
                                            type="text"
                                            placeholder="Registra tu número"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full p-2 rounded input-control"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-row gap-3 mt-7">
                                    <button className="w-full md:w-1/2 btn-ouline text-violet uppercase font-bold p-2 text-center rounded-4xl hover:border-amber hover:bg-ext-amber hover:text-white transition hover:cursor-pointer hover:scale-105">
                                        Cancelar
                                    </button>

                                    <button className="w-full md:w-1/2 bg-yellow text-white uppercase font-bold p-2 text-center rounded-4xl hover:border-amber hover:bg-ext-amber hover:text-white transition hover:cursor-pointer hover:scale-105">
                                        Imprimir Cotización
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                );
            case 3: // Cargar Información
                return (
                    <div className="w-full md:w-5/6 mx-auto p-4 flex flex-col items-center justify-center p-10">
                        {!showRegister ? (
                            <div className="w-full flex flex-col justify-center items-center md:w-5/6 mt-2">
                                <FormularioIngresar onClick={ingresar} showLinkRegister={false} />

                                <p className="text-black text-center mt-3">
                                    ¿No tienes cuenta?{' '}
                                    <button onClick={() => setShowRegister(true)}
                                        className="text-violet hover:font-bold cursor-pointer"
                                    >
                                        Regístrate aquí
                                    </button>
                                </p>
                            </div>
                        ) : (
                            <div className="w-full flex flex-col justify-center items-center md:w-5/6 mt-2">
                                <FormularioRegistro onClick={registrar} showLinkLogin={false} />

                                <p className="text-black text-center mt-3">
                                    ¿Ya tienes cuenta?{' '}
                                    <button onClick={() => setShowRegister(false)}
                                        className="text-violet hover:font-bold cursor-pointer"
                                    >
                                        Ingresa aquí
                                    </button>
                                </p>
                            </div>
                        )}
                    </div>
                );
            case 4: // Confirmar
                return (
                    <div className="w-full flex flex-col items-center justify-center p-10">
                        <div className="w-full sm:w-5/6 bg-white p-8 rounded-4xl shadow-lg max-w-md space-y-4">
                            <h2 className="text-xl font-bold text-center mb-4"> Confirmar Solicitd </h2>

                            <p className='text-gray-400 uppercase font-bold'> Empresa de ejemplo S.A. </p>

                            <div className="bg-purple-50 rounded-2xl shadow-xl max-w-md w-full space-y-4 p-4 mb-8">
                                <h1 className="font-bold text-sm mb-8"> Resultado de la cotización: </h1>

                                <div className="max-w-md mx-auto">
                                    <div className="bg-purple-50 rounded-lg overflow-hidden">
                                        <ul className="divide-y divide-transparent">
                                            <li className=" hover:bg-gray-100 cursor-pointer">
                                                <div className="flex justify-between items-center">
                                                    <span className=""> Tipo de Impuesto </span>

                                                    <span className="text-sm text-gray-500 tex-end"> $0.00 </span>
                                                </div>
                                            </li>

                                            <li className=" hover:bg-gray-100 cursor-pointer mb-4">
                                                <div className="flex justify-between items-center">
                                                    <span className=""> Valor </span>

                                                    <span className="text-sm text-gray-500 tex-end"> $0.00 </span>
                                                </div>
                                            </li>

                                            <li className=" hover:bg-gray-100 cursor-pointer">
                                                <div className="flex justify-between items-center">
                                                    <span className=""> Intereses Ganados </span>

                                                    <span className="text-sm text-gray-500 tex-end"> $0.00 </span>
                                                </div>
                                            </li>

                                            <li className=" hover:bg-gray-100 cursor-pointer">
                                                <div className="flex justify-between items-center">
                                                    <span className=""> Honorarios 0.00% </span>

                                                    <span className="text-sm text-gray-500 tex-end"> $0.00 </span>
                                                </div>
                                            </li>

                                            <li className=" hover:bg-gray-100 cursor-pointer">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold text-[15px]"> Valor Neto a recibir </span>
                                                    <span className="text-sm text-gray-500 tex-end"> $0.00 </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex flex-col md:flex-row gap-4">
                                <button className="w-full md:w-1/2 bg-white btn-ouline text-violet uppercase font-bold p-2 text-center rounded-4xl hover:border-amber hover:bg-ext-amber hover:text-violet transition hover:cursor-pointer hover:scale-105" >
                                    Continuar Luego
                                </button>

                                <button className="w-full md:w-1/2 bg-yellow text-white uppercase font-bold p-2 text-center rounded-4xl hover:border-amber hover:bg-ext-amber hover:text-white transition hover:cursor-pointer hover:scale-105">
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const ingresar = (res: ClickResult) => {
        console.log('c', res);
    }

    const registrar = (res: ClickResult) => {
        console.log('c', res);
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center space-x-4">
                {steps.map((step) => (
                    <div key={step.id} onClick={() => setCurrentStep(step.id)} className="flex-1 text-center cursor-pointer" >
                        <div className={`text-sm font-semibold transition-colors ${step.id === currentStep ? "text-violet" : "text-gray-400"}`}>
                            {step.id}- {step.title}
                        </div>

                        <div className={`h-1 mt-1 rounded transition-all ${step.id === currentStep ? "bg-violet w-full" : "bg-gray-200 w-full"}`} />
                    </div>
                ))}
            </div>

            {renderContent()}
        </div>
    );
}