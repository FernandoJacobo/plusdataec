import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleDot } from "@fortawesome/free-solid-svg-icons";

const items = [
    { id: 1, image: "/images/como-funciona/01.png" },
    { id: 2, image: "/images/como-funciona/02.png" },
    { id: 3, image: "/images/como-funciona/03.png" },
    { id: 4, image: "/images/como-funciona/04.png" },
    { id: 5, image: "/images/como-funciona/05.png" },
    { id: 6, image: "/images/como-funciona/06.png" },
    { id: 7, image: "/images/como-funciona/07.png" },
];

export default function ComoFuncionaPage() {
    const itemRefs = useRef([]);
    const [currentImage, setCurrentImage] = useState(items[0]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute("data-index"));
                        setCurrentImage(items[index]);
                        setActiveIndex(index);
                    }
                });
            },
            {
                threshold: 0.9,
            }
        );

        itemRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="content-center bg-purple-50 py-5">
            <div className="w-full md:w-1/2 mx-auto px-4">
                <div className="w-full text-center p-4 mb-4">
                    <h1 className='text-xl md:text-4xl font-bold text-purple mb-4'> ¡Cómo funciona? </h1>

                    <p> Lleva el control de tus trámites de devoluciones de impuestos en solo <span className='font-bold'> cuatro pasos </span> </p>
                </div>

                <div className="w-full flex flex-col md:flex-row">
                    <div className="w-full">
                        {items.map((item, index) => (
                            <div key={item.id} data-index={index} ref={(el) => itemRefs.current[index] = el} className='h-100 w-full flex flex-row'>
                                <div className="flex flex-col items-center justify-center timeline">
                                    <FontAwesomeIcon icon={activeIndex === index ? faCircle : faCircleDot} />
                                    <span></span>
                                </div>

                                <div className="w-full flex flex-col md:flex-row items-center content-center h-full">
                                    <div className="w-full flex p-5">
                                        <div className="flex flex-col">
                                            <h2 className="text-xl font-bold text-primary mb-2">Cálculo automático de incidencias en la nómina</h2>
                                            <p> Lleva el control de tus tràmites de devoluciones de impuestos en solo <span className='font-bold'> cuatro pasos </span> </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="w-full flex flex-col items-center justify-center h-100 sticky top-0 z-0">
                        <div className="animate__animated animate__bounce">
                            <img src={currentImage.image} alt={`Imagen de ${currentImage.id}`} className="w-full h-100" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}