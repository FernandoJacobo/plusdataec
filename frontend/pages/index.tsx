import "@/styles/globals.css";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleDot } from "@fortawesome/free-solid-svg-icons";

import Accordion from "@/components/layout/web/Accordion";

const comoFunciona = [
    {
        id: 1,
        title: 'Cotiza',
        content: 'Cotiza tu trámite de devolución  en linea y recupera tus impuestos con el 99% de efectividad a través del uso de la tecnología.',
        image: `/images/como-funciona/01.png`,
    },
    {
        id: 2,
        title: 'Sube tu solicitud',
        content: 'Envía tu solicitud de devolucion de impuestos para revisión y validación preliminar. Recibirás una respuesta en un plazo máximo de 24 horas antes de ingresar del trámite al SRI.',
        image: `/images/como-funciona/03.png`,
    },
    {
        id: 3,
        title: 'Monitorea el proceso en linea',
        content: 'Recibe notificaciones automáticas vía WhatsApp y correo electrónico para estar al tanto de cada avance y cambio de estado de tu trámite. Y no te preocupes, nosotros nos encargamos de todo.',
        image: `/images/como-funciona/04.png`,
    },
    {
        id: 4,
        title: 'Recibe el dinero de devolución',
        content: 'Una vez aprobada la devolución, el Servicio de Rentas Internas emitirá una nota de crédito con los valores correspondientes, la misma que podrás utilizarla o negociarla según tus necesidades.',
        image: `/images/como-funciona/04.png`,
    }
];

const logos = [
    "/images/logos/boitas.png",
    "/images/logos/canasta-rosa.png",
    "/images/logos/impegno.png",
    "/images/logos/vopero.png",
];

const preguntas = [
    {
        id: "1",
        title: "¿Cuánto tiempo toma resolver un trámite de devolución de impuestos?",
        content:
            "Nuestro promedio es de 3 meses para devoluciones de IVA y 4 meses para devoluciones de Renta. Sin embargo, muchos trámites se resuelven en menos tiempo gracias a nuestra experiencia y eficiencia.",
    },
    {
        id: "2",
        title: "¿Cuáles son las tarifas de honorarios?",
        content:
            'Nuestros honorarios dependen del monto a recuperar. Puedes cotizar 100% en línea haciendo clic en el botón "Cotiza aquí". Trabajamos mediante resultados sin solicitar anticipos.',
    },
    {
        id: "3",
        title: "¿Cómo puedo hacer seguimiento de mi trámite?",
        content:
            "Puedes monitorear el trámite en nuestra plataforma web, habilitada para clientes una vez que acepten la cotización. También recibirás notificaciones automáticas por correo electrónico y WhatsApp.",
    },
    {
        id: "4",
        title: "¿De qué periodos se pueden solicitar devoluciones de impuestos?",
        content:
            "Para Impuesto a la Renta, se pueden solicitar hasta 3 años atrás. Para IVA, se puede solicitar hasta 5 años atrás.",
    },
    {
        id: "5",
        title: "¿Qué documentación se requiere para iniciar un trámite?",
        content:
            "La documentación solicitada varía según el tipo de trámite, pero generalmente incluye libros mayores de cuentas contables de retenciones y balances. Nosotros nos encargamos del resto, incluyendo la descarga de comprobantes del SRI.",
    },
    {
        id: "6",
        title: "¿Dónde puedo negociar las Notas de Crédito obtenidas del SRI?",
        content:
            "Nuestro equipo te brindará asesoramiento para negociar las Notas de Crédito en el Mercado de Valores de manera segura y con las mejores tarifas.",
    },
];

export default function HomePage() {
    const itemRefs = useRef<HTMLDivElement[]>([]);
    const [currentImage, setCurrentImage] = useState(comoFunciona[0]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute("data-index"));
                        setCurrentImage(comoFunciona[index]);
                        setActiveIndex(index);
                    }
                });
            },
            { threshold: 0.6 }
        );

        itemRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section id="inicio" className="w-full mb-4">
                <div className="w-full md:w-3/4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center mb-4 p-8 md:p-16">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold mb-6 uppercase">
                            La única plataforma tecnológica para devoluciones de impuestos.
                        </h1>
                        <p className="text-lg text-gray-500 mb-6">
                            Transforma tu experiencia en la gestión del trámite de devoluciones de impuestos. Sube la solicitud y nosotros nos encargamos del resto.
                        </p>
                        <button className="px-6 py-3 rounded-full transition hover:scale-110 btn-hero">
                            Cotiza aquí
                        </button>
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <Image
                            src="/images/hero-section.png"
                            alt="Hero"
                            width={500}
                            height={500}
                            className="w-full object-contain"
                        />
                    </div>
                </div>

                {/* Logos */}
                <div className="w-full p-10 overflow-hidden companies">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-center text-4xl font-bold mb-10">
                            <span>Cientos</span> de empresas han confiado en nosotros
                        </h2>
                        <div className="flex flex-wrap justify-center gap-8">
                            {logos.map((logo, index) => (
                                <div key={index} className="w-1/2 sm:w-1/4 flex justify-center">
                                    <Image
                                        src={logo}
                                        alt={`Logo ${index + 1}`}
                                        width={200}
                                        height={200}
                                        className="object-contain filter grayscale"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Cómo Funciona */}
            <section id="como-funciona" className="w-full flex flex-col items-center">
                <div className="text-center p-4 mb-4">
                    <h1 className="text-4xl font-bold text-purple mb-4">¿Cómo funciona?</h1>
                    <p>
                        Lleva el control de tus trámites de devoluciones de impuestos en solo <span className="font-bold">cuatro pasos</span>.
                    </p>
                </div>

                <div className="w-full md:w-3/4 flex flex-col md:flex-row p-4 mb-4 timeline">
                    <div className="w-full">
                        {comoFunciona.map((item, index) => (
                            <div key={item.id} data-index={index} ref={(el) => (itemRefs.current[index] = el!)} className="flex flex-row h-50">
                                <div className="flex flex-col items-center h-full">
                                    <FontAwesomeIcon
                                        icon={activeIndex === index ? faCircle : faCircleDot}
                                        className="text-primary"
                                    />
                                    <span className="h-full"></span>
                                </div>

                                <div className="w-full flex flex-col md:flex-row items-center">
                                    <div className="w-full p-4">
                                        <h2 className="text-xl font-bold text-primary mb-2 uppercase">{ item.title }</h2>
                                        <p className="">
                                            { item.content }
                                        </p>
                                    </div>

                                    <div className="w-full md:hidden p-4">
                                        <Image
                                            src={item.image}
                                            alt={`Paso ${item.id}`}
                                            width={400}
                                            height={300}
                                            className="rounded-2xl shadow-lg object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Imagen fija a la derecha */}
                    <div className="hidden w-full md:flex flex-col items-center justify-center h-100 sticky top-25">
                        <Image
                            src={currentImage.image}
                            alt={`Imagen ${currentImage.id}`}
                            width={400}
                            height={300}
                            className="rounded-2xl shadow-lg h-100 w-150"
                        />
                    </div>
                </div>
            </section>

            {/* Preguntas frecuentes */}
            <section id="preguntas" className="w-full mb-6">
                <div className="text-center p-4 mb-4">
                    <h1 className="text-4xl font-bold text-purple mb-4">¿Tienes preguntas? Tenemos respuestas</h1>
                </div>

                <div className="w-full md:w-3/4 mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {preguntas.map((pregunta) => (
                            <div key={pregunta.id} className="p-4">
                                <Accordion title={pregunta.title} content={pregunta.content} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
