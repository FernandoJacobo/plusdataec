'use client'

import { useState } from "react";

import FormularioCotizarEnLinea from "@/components/layout/web/FormularioCotizarEnLinea";
import FormularioEnviarCoizacion from "@/components/layout/web/FormularioEnviarCotizacion";
import FormularioIngresar from "@/components/layout/web/FormularioIngresar";
import FormularioRegistro from '@/components/layout/web/FormularioRegistro';

import { showToast } from "@/components/general/Toast";
import FormularioSubirSolicitud from "@/components/layout/web/FormularioSubirSolicitud";

const steps = [
    { id: 1, title: "Cotizar" },
    { id: 2, title: "Subir solicitud" },
    { id: 3, title: "Ingresar" },
    { id: 4, title: "Confirmar" },
];

type ClickResult = {
    success: boolean;
    message: string;
};

export default function CotizarPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [stepsCompleted, setStepsCompleted] = useState([]);

    const handleFormContribuyente = async (e: React.FormEvent) => {
        e.preventDefault()
        // Aquí se llamará al backend
    }

    const [showRegister, setShowRegister] = useState(false);
    const [showCotizar, setShowCotizar] = useState(true);

    const cancelSendEmail = (cancel: boolean) => {
        setShowCotizar(true);
    }

    const download = async (e: any) => {
        setShowCotizar(false);
    }

    const gotToStep2 = async (e: any) => {
        setCurrentStep(2);
        setStepsCompleted([...stepsCompleted, 1]);
    }

    const gotToStep3 = async () => {
        setCurrentStep(3);
        setStepsCompleted([...stepsCompleted, 2]);
    }

    const gotToStep4 = async () => {
        setCurrentStep(4);
        setStepsCompleted([...stepsCompleted, 3]);
    }

    const goToPrevStep = () => {
        const newStep = currentStep - 1;
        setCurrentStep(newStep);
        deleteCurrentStep();
    }

    const setNewStep = (id: number) => {
        // Paso inicial siempre está permitido
        if (id === 1) {
            setCurrentStep(1);
            if (!stepsCompleted.includes(1)) {
                setStepsCompleted([...stepsCompleted, 1]);
            }
            return;
        }

        const prev = id - 1;

        // Si el paso anterior ya fue completado, permitir avanzar
        if (stepsCompleted.includes(prev)) {
            setCurrentStep(id);
        } else {
            // No permitir avanzar
            showToast(`No puedes continuar con el paso ${id} sin completar el paso ${prev}`, 'error');
        }
    }

    const deleteCurrentStep = () => {
        const newSteps = stepsCompleted.filter(step => step !== currentStep);
        newSteps.sort();
        setStepsCompleted(newSteps);
    }

    const cancelStep2 = () => {
        goToPrevStep();
    }

    const renderContent = () => {
        switch (currentStep) {
            case 1: // Cotizar
                return (
                    <>
                        {showCotizar ? (
                            <FormularioCotizarEnLinea onClickDownload={download} onClickNext={gotToStep2} />
                        ) : (
                            <FormularioEnviarCoizacion onClickRegresar={cancelSendEmail} />
                        )}
                    </>
                );
            case 2: // Subir Solicitd
                return (
                    <div className="w-full flex flex-col items-center justify-center p-10">
                        <div className="w-full md:w-5/2 bg-white p-8 rounded-2xl shadow-xl max-w-lg space-y-4">
                            <h2 className="text-xl font-bold text-center"> Registra la información del contribuyete </h2>

                            <FormularioSubirSolicitud onClickCancel={cancelStep2} onClickContinue={gotToStep3}/>
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
            <pre>{stepsCompleted}</pre>
            <div className="flex justify-between items-center space-x-4">
                {steps.map((step) => (
                    <div key={step.id} onClick={() => setNewStep(step.id)} className="flex-1 text-center cursor-pointer" >
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