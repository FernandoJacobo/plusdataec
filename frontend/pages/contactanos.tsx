'use client';

import { useState } from "react"

import { useWebStore } from '@/store/useWebStore';
import { isValidEmail, isValidPhone } from "@/helpers/validations";
import { showToast } from "@/components/general/Toast";

import { sendMessage, registerMessage } from '@/lib/api/web';

export default function Contactanos() {
    const { informacionDeContacto, mensaje, setMensaje } = useWebStore();

    const [showProgressbar, setShowProgressbar] = useState(false);

    const resetForm = () => {
        setMensaje({ nombre: '' });
        document.getElementById('name')?.focus();

        setMensaje({ correo: '' });
        setMensaje({ celular: '' });
        setMensaje({ mensaje: '' });
    }

    const validateForm = () => {
        if (mensaje.nombre == '') {
            showToast('Campo requerido.', 'error');
            document.getElementById('name')?.focus();
            return false;
        }

        if (mensaje.correo == '') {
            showToast('Campo requerido.', 'error');
            document.getElementById('email')?.focus();
            return false;
        }

        if (!isValidEmail(mensaje.correo)) {
            showToast('Campo requerido.', 'error');
            document.getElementById('email')?.focus();
            return false;
        }

        if (mensaje.celular == '') {
            showToast('Campo requerido.', 'error');
            document.getElementById('phone')?.focus();
            return false;
        }

        if (!isValidPhone(mensaje.celular)) {
            showToast('Campo requerido.', 'error');
            document.getElementById('phone')?.focus();
            return false;
        }

        if (mensaje.mensaje == '') {
            showToast('Campo requerido.', 'error');
            document.getElementById('message')?.focus();
            return false;
        }

        return true;
    }

    const sendEmail = async () => {
        if (!validateForm()) return;

        setShowProgressbar(true);

        const resEnvio = await sendMessage({
            id: 0,
            nombre: mensaje.nombre,
            correo: mensaje.correo,
            celular: mensaje.celular,
            mensaje: mensaje.mensaje
        });

        setShowProgressbar(false);

        if (resEnvio.error) {
            showToast(resEnvio.message, 'error');
            return;
        }

        const resRegistro = await registerMessage({
            id: 0,
            nombre: mensaje.nombre,
            correo: mensaje.correo,
            celular: mensaje.celular,
            mensaje: mensaje.mensaje
        });

        if (resRegistro.error) {
            showToast(resRegistro.message, 'error');
            return;
        }

        resetForm();

        showToast(resEnvio.message, 'success');
    }

    return (
        <section className="w-full bg-purple-50 p-8" id="contactanos">
            <div className="px-4">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center mb-4">
                    {/* Información de contacto */}
                    <div className="w-full p-4">
                        <h1 className="text-4xl text-center font-bold mb-4"> ¿Tienes dudas? ¡Contáctanos! </h1>

                        <p className="text-purple text-lg font-[400] p-2 mb-8 text-center md:text-left">
                            Tienes soporte gratis e ilimitado para comunicarte con nuestro equipo especializado ¡Dino cómo podemos ayudarte!
                        </p>

                        <div className="w-full flex flex-col gap-4">
                            <div className="flex items-center p-2">
                                <div className="w-16 p-2 flex-shrink-0">
                                    <img src="/images/atencion-al-cliente.png" className="icon-contact" alt="Atención al cliente" />
                                </div>

                                <div className="flex-1 p-2">
                                    <h1 className="text-lg font-[500]">Soluciona tus dudas en segundos</h1>
                                    <h1 className="text-lg font-bold">
                                        Llamanos o escribenos al <span className="text-amber-400"> {informacionDeContacto.numero} </span>
                                    </h1>
                                </div>
                            </div>

                            <div className="flex items-center p-2">
                                <div className="w-16 p-2 flex-shrink-0">
                                    <img src="/images/charla.png" className="icon-contact" alt="Charla" />
                                </div>

                                <div className="flex-1 p-2">
                                    <h1 className="text-lg font-[500]">Deseas una conversación más formal</h1>
                                    <h1 className="text-lg font-bold">
                                        Escríbenos al correo <span className="text-amber-400"> {informacionDeContacto.correo} </span>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="">
                        <div className="w-full bg-white shadow-lg rounded-2xl overflow-hidden p-8">
                            <h1 className="text-lg font-bold mb-3">¿Prefieres que nosotros te contactemos? ¡Adelante!</h1>

                            <p className="text-purple text-medium font-[400] mb-3">
                                Nuestro equipo te responderá en el menor tiempo posible
                            </p>

                            <form autoComplete="off" className="mb-3">
                                <div className="flex flex-wrap gap-4">
                                    <div className="w-full mb-3">
                                        <label htmlFor="name" className="font-bold">Nombre completo</label>
                                        <input id="name" name="name" type="text" className="w-full p-2 rounded input-control" value={mensaje.nombre} onChange={(e) => setMensaje({nombre: e.target.value})} />
                                    </div>

                                    <div className="w-full flex flex-col md:flex-row gap-4">
                                        <div className="w-full md:w-1/2 mb-3">
                                            <label htmlFor="email" className="font-bold">Correo electrónico</label>
                                            <input id="email" name="email" type="email" className="w-full p-2 rounded input-control" value={mensaje.correo} onChange={(e) => setMensaje({correo: e.target.value})} />
                                        </div>

                                        <div className="w-full md:w-1/2 mb-3">
                                            <label htmlFor="phone" className="font-bold">Nro. de celular</label>
                                            <input id="phone" name="phone" type="text" className="w-full p-2 rounded input-control" value={mensaje.celular} onChange={(e) => setMensaje({celular: e.target.value})} />
                                        </div>
                                    </div>

                                    <div className="w-full mb-3">
                                        <label htmlFor="message" className="font-bold">¿En qué podemos ayudarte?</label>
                                        <textarea id="message" name="message" placeholder="Cuéntanos un poco más, para darte una respuesta más rápida" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none h-32 input-control" value={mensaje.mensaje} onChange={(e) => setMensaje({mensaje: e.target.value})} />
                                    </div>
                                </div>
                            </form>

                            <div className="flex flex-col md:flex-row gap-2">
                                <button className="w-full md:w-[150px] bg-yellow text-white p-2 text-center rounded-4xl hover:border-amber hover:bg-ext-amber hover:text-white transition hover:cursor-pointer hover:scale-105" onClick={() => { sendEmail(); }}>
                                    Enviar
                                </button>

                                <button className="w-full md:w-[150px] bg-purple text-white p-2 text-center rounded-4xl hover:bg-purple hover:text-white transition hover:cursor-pointer hover:scale-105" onClick={() => { resetForm(); }}>
                                    Limpiar Campos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
