import { useState } from 'react';

import Link from 'next/link';

import { Toast, showToast } from "@/components/general/Toast";

type ClickResult = {
    success: boolean;
    message: string;
};

interface FormProps {
    onClick: (data: { error: boolean; message: string }) => ClickResult;
    showLinkRegister: boolean;
}

export default function FormularioIngresar({ onClick, showLinkRegister }: FormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        onClick({ error: false, message: '' });
    };

    const validateForm = () => {
        if (!email.trim()) {
            document.getElementById('email')?.focus();
            showToast('Correo electrónico requerido.', 'error');
            return false;
        }

        if (!password.trim()) {
            document.getElementById('password')?.focus();
            showToast('Contraseña requerida.', 'error');
            return false;
        }

        return true;
    }

    return (
        <>
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full space-y-4">
                <h2 className="text-2xl font-bold text-center">Ingresa a tu cuenta</h2>

                <div className="flex flex-col gap-3">
                    <label htmlFor="email" className="font-bold">Correo Electrónico</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Ingrese su Correo Electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 rounded input-control"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex flex-row items-center justify-between">
                        <label htmlFor="password" className="font-bold">Contraseña</label>
                        <Link href="#" className="text-violet hover:font-bold">¿Olvidaste tu contraseña?</Link>
                    </div>

                    <input
                        id="password"
                        type="password"
                        placeholder="Ingrese su Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 rounded input-control"
                    />
                </div>

                <button type="submit" className="w-full bg-violet text-white uppercase font-bold p-2 text-center rounded-4xl hover:border-amber hover:bg-ext-amber hover:text-white transition hover:cursor-pointer hover:scale-105">
                    Ingresar
                </button>

                {showLinkRegister && (
                    <p className="text-black text-center">
                        Si no tiene una cuenta <Link href="/registro" className="text-violet hover:font-bold mt-4"> Regístrate aquí </Link>
                    </p>
                )}
            </form>
        </>
    );
}
