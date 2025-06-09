import { useState } from 'react';

import Link from 'next/link';

import { Toast, showToast } from "@/components/general/Toast";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface FormProps {
    onClick: () => void;
    showLinkRegister: boolean;
}

export default function FormularioIngresar({ onClick, showLinkRegister }: FormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Estado para un solo error a la vez
    const [error, setError] = useState<{ field: string; message: string } | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setError(null);
        onClick();
    };

    const validateForm = () => {
        if (!email.trim()) {
            setError({ field: 'email', message: 'Correo electrónico requerido.' });
            document.getElementById('email')?.focus();
            return false;
        }

        if (!password.trim()) {
            setError({ field: 'password', message: 'Contraseña requerida.' });
            document.getElementById('password')?.focus();
            return false;
        }

        setError(null);
        return true;
    };

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
                        className={`w-full p-2 rounded input-control ${error?.field === 'email' ? 'border-red-500' : ''}`}
                    />
                    {error?.field === 'email' && (
                        <p className="text-red-600 text-[12px]">{error.message}</p>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <label className="font-bold">Contraseña</label>

                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            placeholder="Ingrese su Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`input-control w-full pr-10 rounded ${error?.field === 'password' ? 'border-red-500' : ''}`}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            aria-label="Mostrar/Ocultar contraseña"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    {error?.field === 'password' && (
                        <p className="text-red-600 text-[12px]">{error.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-violet text-white uppercase font-bold p-2 text-center rounded-4xl hover:border-amber hover:bg-ext-amber hover:text-white transition hover:cursor-pointer hover:scale-105"
                >
                    Ingresar
                </button>

                {showLinkRegister && (
                    <p className="text-black text-center">
                        Si no tiene una cuenta{' '}
                        <Link href="/auth/registro" className="text-violet hover:font-bold mt-4">
                            Regístrate aquí
                        </Link>
                    </p>
                )}
            </form>
        </>
    );
}
