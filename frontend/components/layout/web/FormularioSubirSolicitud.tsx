import { useRef, useState } from 'react';

import { useStore } from '@/store/useStore';

import { Toast, showToast } from "@/components/general/Toast";

import { isValidEmail, isValidPhone, isValidRuc } from '@/helpers/validations'

type ClickResult = {
    success: boolean;
    message: string;
};

interface FormProps {
    onClickCancel: (data: {}) => ClickResult;
    onClickContinue: (data: {}) => ClickResult;
}

export default function FormularioSubirSolicitud({onClickCancel, onClickContinue}: FormProps) {
    const { subirSolicitud, setSubirSolicitud } = useStore();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState("Ningún archivo seleccionado");

    const validateForm = () => {
        if (!subirSolicitud.ruc.trim()) {
            document.getElementById('ruc')?.focus();
            showToast('El campo Nro. de RUC es requerido', 'error');
            return false;
        }

        if (!isValidRuc(subirSolicitud.ruc.trim())) {
            document.getElementById('ruc')?.focus();
            showToast('El campo Nro. de RUC es inválido', 'error');
            return false;
        }

        if (!subirSolicitud.name.trim()) {
            document.getElementById('name')?.focus();
            showToast('El campo Nombre o Razón Social es requerido.', 'error');
            return false;
        }

        if (!subirSolicitud.email.trim()) {
            document.getElementById('email')?.focus();
            showToast('El campo Correo Electrónico es requerido.', 'error');
            return false;
        }

        if (!isValidEmail(subirSolicitud.email.trim())) {
            document.getElementById('email')?.focus();
            showToast('El campo Correo Electrónic es inválido', 'error');
            return false;
        }

        if (!subirSolicitud.phone.trim()) {
            document.getElementById('phone')?.focus();
            showToast('El campo Nro. de celular es requerido.', 'error');
            return false;
        }

        if (!isValidPhone(subirSolicitud.phone.trim())) {
            document.getElementById('phone')?.focus();
            showToast('El campo Nro. de celular es inválido', 'error');
            return false;
        }

        if (subirSolicitud.file == null) {
            document.getElementById('phone')?.focus();
            showToast('Es requerido cargar el formulario 101 en formato PDF', 'error');
            return false;
        }

        return true;
    }

    const send = () => {
        if (!validateForm()) return;

        onClickContinue({});
    }

    const cancel = () => {
        onClickCancel(true);
    }

    const handleFileButtonClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if(!selectedFile) {
            setSubirSolicitud({file: null})
            setFileName('Ningún archivo seleccionado');
            return;
        }
    
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFileName(selectedFile.name);
            setSubirSolicitud({file: selectedFile})
        } else {
            showToast('Archivo inválido. Solo se permite PDF.', 'error');
            setSubirSolicitud({file: null})
            setFileName('Ningún archivo seleccionado');
        }
    };

    const truncateFileName = (name: string, maxLength = 30):string => {
        if (name.length <= maxLength) return name;
      
        const parts = name.split('.');
        const extension = parts.pop();
        const baseName = parts.join('.');
        const shortened = baseName.slice(0, maxLength - 6);
      
        return `${shortened}...${extension}`;
    }

    const formatBytes = (bytes: number): string => {
        if (bytes === 0) return "0 KB";
        const kb = bytes / 1024;
        return `${kb.toFixed(1)} KB`;
    }

    return (
        <>
            <form autoComplete="off" className="">
                <div className="w-full md:w-1/2 flex flex-col gap-3 mb-3">
                    <label htmlFor="ruc" className='font-bold'> Nro. de RUC </label>
                    <input
                        id='ruc'
                        type="text"
                        placeholder=""
                        value={subirSolicitud.ruc}
                        onChange={(e) => setSubirSolicitud({ruc: e.target.value})}
                        className="w-full p-2 rounded input-control"
                    />
                </div>

                <div className="flex flex-col gap-3 mb-3">
                    <label htmlFor="name" className='font-bold'> Nombre o Razón Social </label>
                    <input
                        id="name"
                        type="text"
                        placeholder=""
                        value={subirSolicitud.name}
                        onChange={(e) => setSubirSolicitud({name: e.target.value})}
                        className="w-full p-2 rounded input-control"
                    />
                </div>

                <div className='flex flex-col md:flex-row gap-2 mb-3'>
                    <div className="w-full flex flex-col gap-3">
                        <label htmlFor="email" className='font-bold'> Correo Electrónico </label>
                        <input
                            id="email"
                            type="text"
                            placeholder=""
                            value={subirSolicitud.email}
                            onChange={(e) => setSubirSolicitud({email: e.target.value})}
                            className="w-full p-2 rounded input-control"
                        />
                    </div>

                    <div className="w-full flex flex-col gap-3">
                        <label htmlFor="phone" className='font-bold'> Nro. de celular </label>
                        <input
                            id="phone"
                            type="text"
                            placeholder=""
                            value={subirSolicitud.phone}
                            onChange={(e) => setSubirSolicitud({phone: e.target.value})}
                            className="w-full p-2 rounded input-control"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-3 mb-3">
                    <label htmlFor="name" className=''> Cargar formulario 101 donde se mantiene el saldo a favor </label>

                    <input
                        id="file"
                        type="file"
                        placeholder=""
                        accept="application/pdf"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="w-full p-2 rounded input-control"
                        hidden
                    />

                    <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                        <button type="button" className="w-full md:w-1/2 text-purple bg-purple-100 uppercase font-bold p-2 text-center rounded-xl hover:text-white transition hover:cursor-pointer" onClick={() => { handleFileButtonClick(); }}>
                            Examinar
                        </button>

                        <span className="text-violet truncate"> {subirSolicitud.file ? `${truncateFileName(subirSolicitud.file.name)} (${formatBytes(subirSolicitud.file.size)})` : fileName} </span>
                    </div>
                </div>

                <div className="flex flex-row gap-3 mt-7">
                    <button type='button' className="w-full md:w-1/2 btn-ouline text-violet uppercase font-bold p-2 text-center rounded-4xl hover:border-amber hover:bg-ext-amber hover:text-white transition hover:cursor-pointer hover:scale-105" onClick={() => { cancel(); }}>
                        Cancelar
                    </button>

                    <button type='button' className="w-full md:w-1/2 bg-yellow text-white uppercase font-bold p-2 text-center rounded-4xl hover:border-amber hover:bg-ext-amber hover:text-white transition hover:cursor-pointer hover:scale-105" onClick={() => { send(); }}>
                        Continuar
                    </button>
                </div>
            </form>
        </>
    );
}
