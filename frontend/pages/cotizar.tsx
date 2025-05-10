'use client';

import { useState } from 'react';

import FormularioCotizarEnLinea from '@/components/layout/web/FormularioCotizarEnLinea';
import FormularioEnviarCoizacion from '@/components/layout/web/FormularioEnviarCotizacion';
import FormularioIngresar from '@/components/layout/web/FormularioIngresar';
import FormularioRegistro from '@/components/layout/web/FormularioRegistro';
import FormularioSubirSolicitud from '@/components/layout/web/FormularioSubirSolicitud';

import { showToast } from '@/components/general/Toast';

import { useWebStore } from '@/store/useWebStore';

import { numberToPercent, numberFormat } from '@/helpers/general';

import { register } from '@/lib/api/cotizaciones'

const steps = [
    { id: 1, title: 'Cotizar' },
    { id: 2, title: 'Subir solicitud' },
    /* { id: 3, title: 'Ingresar' }, */
    { id: 3, title: 'Confirmar' },
];

export default function CotizarPage() {
    const { arrTiposImpuesto, cotizacion, contribuyente } = useWebStore();

    const [currentStep, setCurrentStep] = useState(1);
    const [stepsCompleted, setStepsCompleted] = useState<number[]>([]);
    const [showRegister, setShowRegister] = useState(false);
    const [showCotizar, setShowCotizar] = useState(true);

    const updateStepsCompleted = (step: number) => {
        setStepsCompleted((prev) => (prev.includes(step) ? prev : [...prev, step]));
    };

    const goToStep = (step: number) => {
        /* if (step === 1 || stepsCompleted.includes(step - 1)) {
            setCurrentStep(step);
            if (step === 1) updateStepsCompleted(1);
        } else {
            showToast(`No puedes continuar con el paso ${step} sin completar el paso ${step - 1}`, 'error');
        } */

        setCurrentStep(step);

        if (step === 1) updateStepsCompleted(1);
    };

    const goToNextStep = () => setCurrentStep((prev) => prev + 1);
    const goToPrevStep = () => setCurrentStep((prev) => prev - 1);

    const handleStepAdvance = (step: number) => {
        updateStepsCompleted(step - 1);
        setCurrentStep(step);
    };

    const deleteCurrentStep = () => {
        setStepsCompleted((prev) => prev.filter((step) => step !== currentStep));
    };

    const handleCancelStep = () => {
        deleteCurrentStep();
        goToPrevStep();
    };

    const registerUser = (token: string) => {
        handleStepAdvance(4);
    }

    const login = () => {
        showToast('Plataforma en Construcción.', 'success');
    }

    const tipoImpuesto = arrTiposImpuesto.find(item => item.value === cotizacion.idTipoImpuesto);

    const downloadBase64 = (base64String: string, fileName: string) => {
        const linkSource = base64String; // Ya debe venir como: data:application/pdf;base64,...
        const downloadLink = document.createElement('a');
        const suggestedFileName = fileName || `cotizacion_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`;

        downloadLink.href = linkSource;
        downloadLink.download = suggestedFileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const confirm = async () => {
        const cotizacionData = {
            idEstatus: 3,
            idTiposImpuesto: cotizacion.idTipoImpuesto,
            valorASolicitar: cotizacion.valorASolicitar,
            honorarios: cotizacion.honorarios,
            nombre: cotizacion.nombreComlpeto,
            correo: cotizacion.correo,
            celular: cotizacion.celular,
            nombreBeneficiario: cotizacion.nombreORazonSocialBeneficiario,
            rucBeneficiario: cotizacion.rucBeneficiario,
        };

        const res = await register(cotizacionData);

        if (res.error) {
            showToast(res.message, 'error');
            return;
        }

        if (res.pdfBase64) {
            downloadBase64(`data:application/pdf;base64,${res.pdfBase64}`, res.fileName);
            showToast(res.message, 'success');
            // Aquí podrías redirigir o mostrar un mensaje adicional indicando que el correo será enviado.
        } else {
            showToast('No se recibió el contenido Base64 del PDF.', 'error');
        }

        // La URL para el correo electrónico estará en res.downloadUrl
        console.log('URL para el correo electrónico:', res.downloadUrl);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return showCotizar ? (
                    <FormularioCotizarEnLinea onClickDownload={() => { setShowCotizar(false) }} onClickNext={() => handleStepAdvance(2)} />
                ) : (
                    <FormularioEnviarCoizacion onClickRegresar={() => { setShowCotizar(true) }} onClickSenEmail={() => { setShowCotizar(true) }} />
                );
            case 2:
                return (
                    <div className="w-full flex flex-col items-center justify-center p-10">
                        <div className="w-full md:w-5/2 bg-white p-8 rounded-2xl shadow-xl max-w-lg space-y-4">
                            <h2 className="text-xl font-bold text-center">Registra la información del contribuyente</h2>
                            <FormularioSubirSolicitud onClickCancel={() => { handleCancelStep() }} onClickContinue={() => handleStepAdvance(3)} />
                        </div>
                    </div>
                );
            case 30:
                return (
                    <div className="w-full md:w-5/6 mx-auto p-4 flex flex-col items-center justify-center p-10">
                        {!showRegister ? (
                            <div className="w-full md:w-5/6 flex flex-col justify-center items-center mt-2">
                                <FormularioIngresar onClick={login} showLinkRegister={false} />
                                <p className="text-black text-center mt-3">
                                    ¿No tienes cuenta?
                                    <button onClick={() => setShowRegister(true)} className="text-violet hover:font-bold cursor-pointer">
                                        Regístrate aquí
                                    </button>
                                </p>
                            </div>
                        ) : (
                            <div className="w-full md:w-5/6 flex flex-col justify-center items-center mt-2">
                                <FormularioRegistro onClick={registerUser} showLinkLogin={false} />
                                <p className="text-black text-center mt-3">
                                    ¿Ya tienes cuenta?
                                    <button onClick={() => setShowRegister(false)} className="text-violet hover:font-bold cursor-pointer">
                                        Ingresa aquí
                                    </button>
                                </p>
                            </div>
                        )}
                    </div>
                );
            case 3:
                return (
                    <div className="w-full flex flex-col items-center justify-center p-10">
                        <div className="w-full md:w-4/6 bg-white p-8 rounded-4xl shadow-lg space-y-4">
                            <h2 className="text-xl font-bold text-center mb-4">Confirmar Solicitud</h2>

                            <p className="text-gray-400 uppercase font-bold"> {cotizacion.nombreORazonSocialBeneficiario} </p>
                            <p className="text-gray-400 uppercase font-bold"> RUC: {cotizacion.rucBeneficiario} </p>

                            <div className="bg-purple-50 rounded-2xl shadow-lg w-full space-y-4 p-4">
                                <div className="mx-auto">
                                    <p className="text-gray-500 mb-4"> Resultado de la cotización </p>

                                    <div className="bg-purple-50 rounded-lg overflow-hidden">
                                        <ul className="divide-y divide-transparent">
                                            <li className="cursor-pointer mb-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold"> Tipo Impuesto </span>

                                                    <span className="text-sm tex-end"> {tipoImpuesto?.label} </span>
                                                </div>
                                            </li>

                                            <li className="cursor-pointer mb-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold"> Valor a solicitar </span>

                                                    <span className="text-sm tex-end"> ${numberFormat(cotizacion.valorASolicitar)} </span>
                                                </div>
                                            </li>

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

                            <div className="w-full flex flex-col md:flex-row gap-4">
                                <button className="w-full md:w-1/2 btn-ouline text-violet uppercase font-bold p-2 text-center rounded-full hover:border-amber hover:bg-ext-amber hover:text-violet transition hover:cursor-pointer hover:scale-105" onClick={() => { goToPrevStep(); }}>
                                    Regresar
                                </button>

                                <button className="w-full md:w-1/2 bg-yellow text-white uppercase font-bold p-2 text-center rounded-4xl hover:border-amber hover:bg-ext-amber hover:text-white transition hover:cursor-pointer hover:scale-105" onClick={() => { confirm(); }}>
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

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center space-x-4">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        onClick={() => goToStep(step.id)}
                        className="flex-1 text-center cursor-pointer"
                    >
                        <div
                            className={`text-sm font-semibold transition-colors ${step.id === currentStep ? 'text-violet' : 'text-gray-400'}`}
                        >
                            {step.id}- {step.title}
                        </div>
                        <div
                            className={`h-1 mt-1 rounded transition-all ${step.id === currentStep ? 'bg-violet w-full' : 'bg-gray-200 w-full'}`}
                        />
                    </div>
                ))}
            </div>
            {renderStepContent()}
        </div>
    );
}