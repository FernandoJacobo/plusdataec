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
import { register, update, confirm } from '@/lib/api/cotizaciones';

const steps = [
    { id: 1, title: 'Cotizar' },
    { id: 2, title: 'Subir solicitud' },
    { id: 3, title: 'Confirmar' },
];

export default function CotizarPage() {
    const { arrTiposImpuesto, cotizacion } = useWebStore();

    const [currentStep, setCurrentStep] = useState(1);
    const [stepsCompleted, setStepsCompleted] = useState<number[]>([]);
    const [showCotizar, setShowCotizar] = useState(true);

    const tipoImpuesto = arrTiposImpuesto.find(item => item.value === cotizacion.idTipoImpuesto);

    const updateStepsCompleted = (step: number) => {
        setStepsCompleted(prev => prev.includes(step) ? prev : [...prev, step]);
    };

    const goToStep = (step: number) => {
        if (step === 1 || stepsCompleted.includes(step - 1)) {
            setCurrentStep(step);
            updateStepsCompleted(step);
        } else {
            showToast(`No puedes continuar con el paso ${step} sin completar el paso ${step - 1}`, 'error');
        }
    };

    const goToPrevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const handleCancelStep = () => {
        setStepsCompleted(prev => prev.filter(step => step !== currentStep));
        goToPrevStep();
    };

    const handleStepAdvance = (step: number) => {
        updateStepsCompleted(step - 1);
        setCurrentStep(step);
    };

    const registrarActualizarCotizacion = async (idStatus: number) => {
        const cotizacionData = {
            id: cotizacion.id || 0,
            idEstatus: idStatus,
            idTiposImpuesto: cotizacion.idTipoImpuesto,
            valorASolicitar: cotizacion.valorASolicitar,
            honorarios: cotizacion.honorarios,
            nombre: cotizacion.nombreComlpeto,
            correo: cotizacion.correo,
            celular: cotizacion.celular,
            nombreBeneficiario: cotizacion.nombreORazonSocialBeneficiario,
            rucBeneficiario: cotizacion.rucBeneficiario,
        };

        const res = cotizacionData.id ? await update(cotizacionData) : await register(cotizacionData);

        if (res.error) return showToast(res.message, 'error');

        if (res.id) cotizacion.id = res.id;
    };

    const downloadBase64 = (base64String: string, fileName: string) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = base64String;
        downloadLink.download = fileName || `cotizacion_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const confirmar = async (idStatus: number) => {
        const cotizacionData = {
            id: cotizacion.id,
            idEstatus: idStatus,
            idTiposImpuesto: cotizacion.idTipoImpuesto,
            valorASolicitar: cotizacion.valorASolicitar,
            honorarios: cotizacion.honorarios,
            nombre: cotizacion.nombreComlpeto,
            correo: cotizacion.correo,
            celular: cotizacion.celular,
            nombreBeneficiario: cotizacion.nombreORazonSocialBeneficiario,
            rucBeneficiario: cotizacion.rucBeneficiario,
        };

        let res = await confirm(cotizacionData);

        if (res.error) return showToast(res.message, 'error');

        if (res.id) cotizacion.id = res.id;

        if (res.pdfBase64) {
            downloadBase64(`data:application/pdf;base64,${res.pdfBase64}`, res.fileName);
            showToast(res.message, 'success');
            reiniciarCotizacion();
        } else {
            showToast('No se recibió el contenido Base64 del PDF.', 'error');
        }

        console.log('URL para el correo electrónico:', res.downloadUrl);
    };

    const reiniciarCotizacion = () => {
        setCurrentStep(1);
        setStepsCompleted([]);
        cotizacion.id = 0;
        cotizacion.idTipoImpuesto = 0;
        cotizacion.valorASolicitar = 0;
        cotizacion.honorarios = 0;
        cotizacion.nombreComlpeto = '';
        cotizacion.correo = '';
        cotizacion.celular = '';
        cotizacion.nombreORazonSocialBeneficiario = '';
        cotizacion.rucBeneficiario = '';
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return showCotizar ? (
                    <FormularioCotizarEnLinea
                        onClickDownload={() => setShowCotizar(false)}
                        onClickNext={() => {
                            handleStepAdvance(2);
                            registrarActualizarCotizacion(1);
                        }}
                    />
                ) : (
                    <FormularioEnviarCoizacion
                        onClickRegresar={() => setShowCotizar(true)}
                        onClickSenEmail={() => setShowCotizar(true)}
                    />
                );
            case 2:
                return (
                    <div className="w-full flex justify-center p-10">
                        <div className="w-full md:w-5/6 bg-white p-8 rounded-2xl shadow-xl max-w-lg space-y-4">
                            <h2 className="text-xl font-bold text-center">Registra la información del contribuyente</h2>
                            <FormularioSubirSolicitud
                                onClickCancel={handleCancelStep}
                                onClickContinue={() => {
                                    handleStepAdvance(3);
                                    registrarActualizarCotizacion(2);
                                }}
                            />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="w-full flex justify-center p-10">
                        <div className="w-full md:w-4/6 bg-white p-8 rounded-2xl shadow-lg space-y-4">
                            <h2 className="text-xl font-bold text-center mb-4">Confirmar Solicitud</h2>

                            <p className="text-gray-400 uppercase font-bold">{cotizacion.nombreORazonSocialBeneficiario}</p>
                            <p className="text-gray-400 uppercase font-bold">RUC: {cotizacion.rucBeneficiario}</p>

                            <div className="bg-purple-50 rounded-2xl shadow-lg p-4 space-y-4">
                                <p className="text-gray-500 mb-4">Resultado de la cotización</p>
                                <ul className="space-y-2">
                                    <li className="flex justify-between">
                                        <span className="font-bold">Tipo Impuesto</span>
                                        <span className="text-sm">{tipoImpuesto?.label}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="font-bold">Valor a solicitar</span>
                                        <span className="text-sm">${numberFormat(cotizacion.valorASolicitar)}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="font-bold">Honorarios (No incluye IVA)</span>
                                        <span className="text-sm font-bold text-yellow">
                                            {numberToPercent(cotizacion.honorarios)}
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                                <button
                                    className="w-full md:w-1/2 btn-ouline text-violet font-bold p-2 rounded-full transition hover:bg-ext-amber hover:text-violet hover:scale-105 uppercase hover:cursor-pointer"
                                    onClick={goToPrevStep}
                                >
                                    Regresar
                                </button>
                                <button
                                    className="w-full md:w-1/2 bg-yellow text-white font-bold p-2 rounded-full transition hover:bg-ext-amber hover:scale-105 uppercase hover:cursor-pointer"
                                    onClick={() => confirmar(3)}
                                >
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
            <div className="flex justify-between items-center space-x-4 mb-6">
                {steps.map(step => (
                    <div
                        key={step.id}
                        onClick={() => goToStep(step.id)}
                        className="flex-1 text-center cursor-pointer"
                    >
                        <div className={`text-sm font-semibold ${step.id === currentStep ? 'text-violet' : 'text-gray-400'}`}>
                            {step.id}- {step.title}
                        </div>
                        <div className={`h-1 mt-1 rounded ${step.id === currentStep ? 'bg-violet' : 'bg-gray-200'}`} />
                    </div>
                ))}
            </div>
            {renderStepContent()}
        </div>
    );
}
