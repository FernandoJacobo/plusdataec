'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Toast, showToast } from "@/components/general/Toast";
import { isValidEmail, isValidPhone } from '@/helpers/validations';
import { register } from '@/lib/api/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { showAlert } from '@/helpers/general';
import { Progressbar } from '@/components/general/Progressbar';

interface FormProps {
    onClick: (data: { id: number; name: string; phone: string; email: string }) => void;
    showLinkLogin: boolean;
}

export default function FormularioRegistro({ onClick, showLinkLogin }: FormProps) {
    const [showProgressbar, setShowProgressbar] = useState(false);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Estado para un solo error, con clave y mensaje
    const [error, setError] = useState<{ field: string; message: string } | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setShowProgressbar(true);

        const res = await register({
            id: 0,
            idEstatus: 5,
            nombre: name,
            celular: phone,
            correo: email,
            contrasena: password
        });

        setShowProgressbar(false);

        if (res.error) {
            showAlert({
                title: 'ERROR',
                message: res.message,
                icon: 'error',
            });
            return;
        }

        resetForm();

        showAlert({
            title: 'ÉXITO',
            message: res.message,
            icon: 'success',
        });

        onClick(res.token);
    };

    const validateForm = (): boolean => {
        if (!name.trim()) {
            setError({ field: 'name', message: 'El nombre es requerido' });
            document.getElementById('name')?.focus();
            return false;
        }

        if (!phone.trim()) {
            setError({ field: 'phone', message: 'El número de celular es requerido' });
            document.getElementById('phone')?.focus();
            return false;
        }

        if (!isValidPhone(phone.trim())) {
            setError({ field: 'phone', message: 'Número de celular inválido' });
            document.getElementById('phone')?.focus();
            return false;
        }

        if (!email.trim()) {
            setError({ field: 'email', message: 'El correo es requerido' });
            document.getElementById('email')?.focus();
            return false;
        }

        if (!isValidEmail(email.trim())) {
            setError({ field: 'email', message: 'Correo electrónico inválido' });
            document.getElementById('email')?.focus();
            return false;
        }

        if (password.length < 8) {
            setError({ field: 'password', message: 'La contraseña debe tener al menos 8 caracteres' });
            document.getElementById('password')?.focus();
            return false;
        }

        setError(null);
        return true;
    };

    const resetForm = () => {
        setName('');
        setPhone('');
        setEmail('');
        setPassword('');
        setError(null);
        document.getElementById('name')?.focus();
    }

    return (
        <>
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full space-y-4">
                <h2 className="text-2xl font-bold text-center">Regístrate y crea tu cuenta</h2>

                <div className="flex flex-col gap-3">
                    <label className="font-bold">Nombre Completo</label>
                    <input
                        autoComplete='off'
                        id='name'
                        type="text"
                        placeholder="Ingresa tu nombre completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`input-control ${error?.field === 'name' ? 'border-red-500' : ''}`}
                    />
                    {error?.field === 'name' && <p className="text-red-600 text-[12px]">{error.message}</p>}
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                    <div className="w-full flex flex-col gap-3">
                        <label className="font-bold">Nro. de celular</label>
                        <input
                            autoComplete='off'
                            id='phone'
                            type="text"
                            placeholder="Registra tu número"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={`input-control ${error?.field === 'phone' ? 'border-red-500' : ''}`}
                        />
                        {error?.field === 'phone' && <p className="text-red-600 text-[12px]">{error.message}</p>}
                    </div>

                    <div className="w-full flex flex-col gap-3">
                        <label className="font-bold">Correo Electrónico</label>
                        <input
                            autoComplete='off'
                            id='email'
                            type="email"
                            placeholder="Ingresa tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`input-control ${error?.field === 'email' ? 'border-red-500' : ''}`}
                        />
                        {error?.field === 'email' && <p className="text-red-600 text-[12px]">{error.message}</p>}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <label className="font-bold">Contraseña</label>

                    <div className="relative">
                        <input
                            autoComplete='off'
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Mínimo 8 caracteres"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`input-control w-full pr-10 ${error?.field === 'password' ? 'border-red-500' : ''}`}
                            id="password"
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
                    {error?.field === 'password' && <p className="text-red-600 text-[12px]">{error.message}</p>}
                </div>

                { showProgressbar ?  <Progressbar/> : <></> }

                <div className='flex d-flex flex-col md:flex-row gap-5'>
                    <button type="submit"
                        className="w-full md:w-1/2 bg-violet text-white uppercase font-bold p-2 text-center rounded-full hover:border-amber hover:bg-ext-amber hover:text-white transition hover:cursor-pointer hover:scale-105"
                    >
                        Registrarse
                    </button>

                    <button type="reset"
                        className="w-full md:w-1/2 btn-ouline text-violet uppercase font-bold p-2 text-center rounded-full hover:border-amber hover:bg-ext-amber hover:text-violet transition hover:cursor-pointer hover:scale-105"
                        onClick={resetForm}
                    >
                        Limpiar Campos
                    </button>
                </div>

                {showLinkLogin && (
                    <p className="text-black text-center">
                        ¿Ya tienes una cuenta?{' '}
                        <Link href="/auth" className="text-violet hover:font-bold">
                            Inicia Sesión
                        </Link>
                    </p>
                )}
            </form>
        </>
    );
}
