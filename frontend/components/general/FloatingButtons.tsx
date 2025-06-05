"use client";

import { useWebStore } from '@/store/useWebStore';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

const message = 'Hola necesito información para reuperar mis impuestos con PLUSDATA';

export default function FloatingButtons() {
    const { informacionDeContacto } = useWebStore();

    return (
        <>
            {/* Botón WhatsApp (Esquina Derecha) */}
            <div className="fixed bottom-6 right-6 z-50">
                <a
                    href={`https://wa.me/${informacionDeContacto.numero}?text=${message}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-full shadow-lg transition transform hover:scale-110 flex items-center justify-center btn-whatsapp"
                    aria-label="WhatsApp"
                >
                    <i className="fa-brands fa-whatsapp text-2xl"></i>
                </a>
            </div>

            {/* Botón Chat (Esquina Izquierda) */}
            {/* <div className="fixed bottom-6 right-6 z-50">
                <Link href={'/contactanos'}
                    className="p-4 rounded-full shadow-lg transition transform hover:scale-110 flex items-center justify-center btn-chat"
                    aria-label="Chat"
                >
                    <FontAwesomeIcon icon={faCommentDots} className="text-2xl" />
                </Link>
            </div> */}
        </>
    );
}
