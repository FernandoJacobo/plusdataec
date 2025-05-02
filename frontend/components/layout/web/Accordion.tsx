'use client';

import { useState } from "react";

interface AccordionProps {
    title: string;
    content: string;
}

const Accordion = ({ title, content }: AccordionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-accordion border overflow-hidden border-accordion">
            {/* Header del acordeón */}
            <button className="w-full flex justify-between items-center p-4 hover:bg-gray-200 transition btn-accordion" onClick={() => setIsOpen(!isOpen)} >
                <span className="title-accordion"> {title} </span>
                {isOpen ? <i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-down"></i>}
            </button>

            {/* Contenido del acordeón */}
            <div className={`transition-all duration-300 overflow-hidden ${ isOpen ? "max-h-40 p-4" : "max-h-0 p-0" }`} >
                <p className="text-accordion"> {content} </p>
            </div>
        </div>
    );
};

export default Accordion;