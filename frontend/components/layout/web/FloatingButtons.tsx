"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

export default function FloatingButtons() {
    return (
        <>
            {/* Botón WhatsApp (Esquina Derecha) */}
            <div className="fixed bottom-6 left-6 z-50">
                <a
                    href="https://wa.me/7778350114?text=Hola%20quiero%20más%20información"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-full shadow-lg transition transform hover:scale-110 flex items-center justify-center btn-whatsapp"
                    aria-label="WhatsApp"
                >
                    <i className="fa-brands fa-whatsapp text-2xl"></i>
                </a>
            </div>

            {/* Botón Chat (Esquina Izquierda) */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => alert("Abrir chat...")}
                    className="p-4 rounded-full shadow-lg transition transform hover:scale-110 flex items-center justify-center btn-chat"
                    aria-label="Chat"
                >
                    <FontAwesomeIcon icon={faCommentDots} className="text-2xl" />
                </button>
            </div>
        </>
    );
}
