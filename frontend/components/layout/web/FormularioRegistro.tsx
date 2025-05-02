import { useState } from 'react';
import Link from 'next/link';

interface FormProps {
    onClick: (data: { name: string; phone: string; email: string }) => void;
    showLinkLogin: boolean;
}

export default function FormularioRegistro({ onClick, showLinkLogin }: FormProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        onClick({ name, phone, email });
    };

    const validateForm = (): boolean => {
        if (!name.trim() || !phone.trim() || !email.trim() || password.length < 8) {
            alert('Completa todos los campos correctamente');
            return false;
        }
        return true;
    };

    return (
        <>
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full space-y-4">
                <h2 className="text-2xl font-bold text-center">Regístrate y crea tu cuenta</h2>

                <div className="flex flex-col gap-3">
                    <label className="font-bold">Nombre Completo</label>
                    <input
                        type="text"
                        placeholder="Ingresa tu nombre completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-control"
                        required
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                    <div className="w-full flex flex-col gap-3">
                        <label className="font-bold">Nro. de celular</label>
                        <input
                            type="text"
                            placeholder="Registra tu número"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="input-control"
                            required
                        />
                    </div>

                    <div className="w-full flex flex-col gap-3">
                        <label className="font-bold">Correo Electrónico</label>
                        <input
                            type="email"
                            placeholder="Ingresa tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-control"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <label className="font-bold">Contraseña</label>
                    <input
                        type="password"
                        placeholder="Mínimo 8 caracteres"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-control"
                        required
                    />
                </div>

                <button type="submit"
                    className="w-full bg-violet text-white uppercase font-bold p-2 text-center rounded-4xl hover:border-amber hover:bg-ext-amber hover:text-white transition hover:cursor-pointer hover:scale-105"
                >
                    Registrarse
                </button>

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
