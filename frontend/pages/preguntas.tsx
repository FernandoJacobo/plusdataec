'use client';

import Accordion from '@/components/layout/web/Accordion';

import { useState } from "react";

export default function PreguntasPage() {
    const [preguntas, setPreguntas] = useState([
        { id: '1', title: '¿Con qué compañia de seguros trabaja Runa?', content: '' },
        { id: '2', title: '¿Se puede extender la póliza a los familiares de mi empleados?', content: '' },
        { id: '3', title: '¿La póliza cubre cirugía estética ocular?', content: '' },
        { id: '4', title: '¿Que restricciones tiene la póliza?', content: 'Como requisito, tienes que tener una relación vigente con tus empleado. Los trábajadores no contribuyen con el pago de la prima. La cantidad mínima de empleados para activa el seguro es de 10 hasta 400 colaboradores máximo' },
        { id: '5', title: '¿Qué no cubre la póliza?', content: '' },
    ]);

    return (
        <section className="content-center bg-purple-50 py-5">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center justify-center">
                    <div className="w-full text-center p-4 mb-4">
                        <h1 className='text-xl md:text-4xl font-bold text-purple'> ¿Tienes preguntas? Tenemos respuestas </h1>
                    </div>

                    <div className="w-full flex flex-wrap items-center justify-center p-4">
                        {preguntas.map((pregunta) => (
                            <div key={pregunta.id} className="w-full md:w-1/2 p-4">
                                <Accordion title={pregunta.title} content={pregunta.content} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}