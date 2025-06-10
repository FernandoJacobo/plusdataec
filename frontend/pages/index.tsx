import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay } from 'swiper/modules'

import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleDot } from "@fortawesome/free-solid-svg-icons";

import Accordion from "@/components/layout/web/Accordion";
import Link from "next/link";

const comoFunciona = [
    {
        id: 1,
        title: 'Cotiza',
        content: 'Cotiza tu trámite de devolución  en linea y recupera tus impuestos con el 99% de efectividad a través del uso de la tecnología.',
        image: `/images/como-funciona/1.png`,
    },
    {
        id: 2,
        title: 'Sube tu solicitud',
        content: 'Envía tu solicitud de devolucion de impuestos para revisión y validación preliminar. Recibirás una respuesta en un plazo máximo de 24 horas antes de ingresar del trámite al SRI.',
        image: `/images/como-funciona/2.png`,
    },
    {
        id: 3,
        title: 'Monitorea el proceso en linea',
        content: 'Recibe notificaciones automáticas vía WhatsApp y correo electrónico para estar al tanto de cada avance y cambio de estado de tu trámite. Y no te preocupes, nosotros nos encargamos de todo.',
        image: `/images/como-funciona/3.png`,
    },
    {
        id: 4,
        title: 'Recibe el dinero de devolución',
        content: 'Una vez aprobada la devolución, el Servicio de Rentas Internas emitirá una nota de crédito con los valores correspondientes, la misma que podrás utilizarla o negociarla según tus necesidades.',
        image: `/images/como-funciona/4.png`,
    }
];

const logos = [
    '/images/logos/1.png',
    '/images/logos/2.png',
    '/images/logos/3.png',
    '/images/logos/4.png',
    '/images/logos/5.png',
    '/images/logos/6.png',
    '/images/logos/7.png',
    '/images/logos/8.png',
    '/images/logos/9.png',
    '/images/logos/10.png',
    '/images/logos/11.png',
    '/images/logos/12.png',
];

const grouped: any = [];

for (let i = 0; i < logos.length; i += 6) {
    grouped.push(logos.slice(i, i + 6))
}

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
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(prevIndex => (prevIndex === index ? null : index));
    };

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
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.5, // Mejor visibilidad parcial
            }
        );

        itemRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section id="inicio" className="w-full scroll-mt-36">
                <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-items-center p-10 hero">
                    <div className="text-center md:text-left p-8">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase">
                            La única plataforma tecnológica para devoluciones de impuestos.
                        </h1>

                        <p className="text-lg text-gray-500 mt-4 mb-5">
                            Transforma tu experiencia en la gestión de trámites de devoluciones de impuestos. Sube la solicitud y nosotros nos encargamos del resto.
                        </p>

                        <Link href={'/cotizar'} className="p-3 ps-10 pe-10 rounded-full transition hover:scale-110 btn-hero">
                            Cotiza aquí
                        </Link>
                    </div>

                    <div className="relative md:justify-end w-100 h-100 md:w-full md:h-full p-8">
                        <Image
                            src="/images/hero-section.png"
                            alt="Hero"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 200px"
                        />
                    </div>
                </div>

                {/* Logos */}
                <div className="w-full items-center justify-items-center bg-white overflow-hidden companies">
                    <div className="w-full md:w-5/6 p-4">
                        <h2 className="text-center text-4xl font-bold mt-10 mb-10">
                            <span>Cientos</span> de empresas han confiado en nosotros
                        </h2>

                        <Swiper
                            modules={[Autoplay]}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            loop={true}
                        >
                            {grouped.map((group: any, index: any) => (
                                <SwiperSlide key={index}>
                                    <div className="grid grid-cols-3 gap-1">
                                        {group.map((logo: any, idx: any) => (
                                            <div
                                                key={idx}
                                                className="flex justify-center items-center h-50"
                                            >
                                                <Image
                                                    src={logo}
                                                    alt={`Logo ${index * 4 + idx + 1}`}
                                                    width={200}
                                                    height={200}
                                                    className="object-contain filter grayscale"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>

            {/* Cómo Funciona */}
            <section id="como-funciona" className="w-full flex flex-col items-center scroll-mt-36">
                <div className="w-full text-center p-4 mt-4 mb-4">
                    <h1 className="text-4xl font-bold text-purple">¿Cómo funciona?</h1>
                    <p className="mt-4 mb-4">
                        Lleva el control de tus trámites en solo{" "}
                        <span className="font-bold">cuatro pasos</span>.
                    </p>
                </div>

                <div className="w-full md:w-5/6 px-10 flex flex-col md:flex-row p-4 mb-4">
                    {/* Pasos timeline */}
                    <div className="w-full">
                        {comoFunciona.map((item, index) => (
                            <div
                                key={item.id}
                                data-index={index}
                                ref={(el) => {
                                    itemRefs.current[index] = el;
                                }}
                                className="flex flex-row h-100 "
                            >
                                {/* Línea vertical e icono */}
                                <div className="flex flex-col items-center h-full timeline">
                                    <FontAwesomeIcon
                                        icon={activeIndex === index ? faCircle : faCircleDot}
                                        className="text-primary"
                                    />
                                    {index !== comoFunciona.length - 1 && (
                                        <span className="h-full"></span>
                                    )}
                                </div>

                                {/* Contenido paso */}
                                <div className="w-full flex flex-col md:flex-row">
                                    <div
                                        className={`w-full ps-4 ${activeIndex !== index ? "text-gray-500" : ""
                                            }`}
                                    >
                                        <h2 className="text-xl font-bold text-primary mb-2 uppercase">
                                            {item.title}
                                        </h2>
                                        <p>{item.content}</p>
                                    </div>

                                    {/* Imagen para móvil */}
                                    <div className="md:hidden relative w-full h-64 mt-4">
                                        <Image
                                            src={item.image}
                                            alt={`Paso ${item.id}`}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Imagen fija para desktop */}
                    <div className="hidden md:flex flex-col sticky h-100 top-40 w-full">
                        <Image
                            src={currentImage.image}
                            alt={`Imagen ${currentImage.id}`}
                            width={500}
                            height={500}
                            className="rounded-2xl object-contain"
                        />
                    </div>
                </div>
            </section>

            {/* Preguntas frecuentes */}
            <section id="preguntas" className="w-full mb-20 scroll-mt-36">
                <div className="text-center p-4 mb-4">
                    <h1 className="text-4xl font-bold text-purple mb-4">
                        ¿Tienes preguntas? Tenemos respuestas
                    </h1>
                </div>

                <div className="w-full md:w-5/6 mx-auto px-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {preguntas.map((pregunta, index) => (
                            <Accordion
                                key={pregunta.id}
                                title={pregunta.title}
                                content={pregunta.content}
                                isOpen={openIndex === index}
                                onToggle={() => handleToggle(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}