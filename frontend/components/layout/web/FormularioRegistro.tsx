'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Toast, showToast } from "@/components/general/Toast";

import { isValidEmail, isValidPhone } from '@/helpers/validations';

import { register } from '@/lib/api/auth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface FormProps {
    onClick: (data: { id: number; name: string; phone: string; email: string }) => void;
    showLinkLogin: boolean;
}

export default function FormularioRegistro({ onClick, showLinkLogin }: FormProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const res = await register({
            id: 0,
            idEstatus: 5,
            nombre: name,
            celular: phone,
            correo: email,
            contrasena: password
        });

        if (res.error) {
            showToast(res.message, 'error');
            return;
        }

        showToast(res.message, 'success');

        onClick(res.token);
    };

    const validateForm = (): boolean => {
        if (!name.trim()) {
            document.getElementById('name')?.focus();
            showToast('Completa todos los campos correctamente', 'error');
            return false;
        }

        if (!phone.trim()) {
            document.getElementById('phone')?.focus();
            showToast('Completa todos los campos correctamente', 'error');
            return false;
        }

        if (!isValidPhone(phone.trim())) {
            document.getElementById('phone')?.focus();
            showToast('Número de celular invlido', 'error');
            return false;
        }

        if (!email.trim()) {
            document.getElementById('email')?.focus();
            showToast('Completa todos los campos correctamente', 'error');
            return false;
        }

        if (!isValidEmail(email.trim())) {
            document.getElementById('email')?.focus();
            showToast('Correo electrónico invlido', 'error');
            return false;
        }

        if (password.length < 8) {
            document.getElementById('password')?.focus();
            showToast('Completa todos los campos correctamente', 'error');
            return false;
        }

        return true;
    };

    const resetForm = () => {
        setName('');
        setPhone('');
        setEmail('');
        setPassword('');
        document.getElementById('name')?.focus();
    }

    return (
        <>
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full space-y-4">
                <h2 className="text-2xl font-bold text-center">Regístrate y crea tu cuenta</h2>

                <div className="flex flex-col gap-3">
                    <label className="font-bold">Nombre Completo</label>
                    <input
                        id='name'
                        type="text"
                        placeholder="Ingresa tu nombre completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-control"
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                    <div className="w-full flex flex-col gap-3">
                        <label className="font-bold">Nro. de celular</label>
                        <input
                            id='phone'
                            type="text"
                            placeholder="Registra tu número"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="input-control"
                        />
                    </div>

                    <div className="w-full flex flex-col gap-3">
                        <label className="font-bold">Correo Electrónico</label>
                        <input
                            id='id'
                            type="email"
                            placeholder="Ingresa tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-control"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <label className="font-bold">Contraseña</label>
                    <div className='flex flex-row align-middle'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Mínimo 8 caracteres"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-control w-full"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className=" text-gray-500 hover:text-gray-700 w-auto text-[14px] p-2 cursor-pointer"
                            aria-label="Mostrar/Ocultar contraseña"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                </div>

                <div className='flex d-flex flex-col md:flex-row gap-5'>
                    <button type="submit"
                        className="w-full md:w-1/2 bg-violet text-white uppercase font-bold p-2 text-center rounded-full hover:border-amber hover:bg-ext-amber hover:text-white transition hover:cursor-pointer hover:scale-105"
                    >
                        Registrarse
                    </button>

                    <button type="reset"
                        className="w-full md:w-1/2 btn-ouline text-violet uppercase font-bold p-2 text-center rounded-full hover:border-amber hover:bg-ext-amber hover:text-violet transition hover:cursor-pointer hover:scale-105" onClick={() => { resetForm() }}>
                        Limpiar Campos
                    </button>
                </div>

                {showLinkLogin && (
                    <p className="text-black text-center">
                        ¿Ya tienes una cuenta?{' '}
                        <Link href="/login" className="text-violet hover:font-bold">
                            Inicia Sesión
                        </Link>
                    </p>
                )}
            </form>
        </>
    );
}
