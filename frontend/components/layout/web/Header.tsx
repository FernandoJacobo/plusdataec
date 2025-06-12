'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

import Image from "next/image";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

import { NavLink } from './NavLink'
import { ButtonNavLink } from './ButtonNavLink'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const [activeSection, setActiveSection] = useState("");

    const pathname = usePathname();

    useEffect(() => {
        const observerFunction = () => {
            const sections = document.querySelectorAll("section[id]");

            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const id = entry.target.getAttribute("id")!;
                            setActiveSection(id);
                        }
                    });
                },
                { threshold: 0.3 }
            );

            sections.forEach(section => observer.observe(section));
            return () => observer.disconnect();
        };

        observerFunction();
    }, []);

    return (
        <header className="bg-white sticky top-0 z-50">
            <div className="max-w-screen-xl mx-auto px-1 py-1 ps-4 pe-4 flex items-center justify-between flex-row-reverse md:flex-row">
                {/* Botón menú móvil */}
                <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-md transition hover:bg-gray-100 btn-mobile cursor-pointer">
                    <FontAwesomeIcon icon={isOpen ? faXmark : faBars} className="text-xl" />
                </button>

                {/* Logo */}
                <div className="relative w-25 h-25 md:w-30 md:h-30">
                    <NavLink classLink="link-navbar" href={pathname === "/" ? "#inicio" : "/"}>
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 200px"
                        />
                    </NavLink>
                </div>

                {/* Navegación desktop */}
                <nav className="hidden lg:flex space-x-8">
                    <NavLink classLink="link-navbar" href={pathname === "/" ? "#inicio" : "/"}>Inicio</NavLink>
                    <NavLink classLink="link-navbar" href={pathname === "/" ? "#como-funciona" : "/#como-funciona"}>¿Cómo funciona?</NavLink>
                    <NavLink classLink="link-navbar" href={pathname === "/" ? "#preguntas" : "/#preguntas"}>Preguntas</NavLink>
                    <NavLink classLink="link-navbar" href="/contactanos">Contáctanos</NavLink>
                </nav>

                {/* Botones acción desktop */}
                <div className="hidden lg:flex space-x-3">
                    <ButtonNavLink href="/cotizar">Cotiza Aquí</ButtonNavLink>
                    <ButtonNavLink href="/auth/registro" target="_blank">Regístrate</ButtonNavLink>
                    <ButtonNavLink href="/auth" target="_blank">Ingresar</ButtonNavLink>
                </div>
            </div>

            {/* Menú móvil */}
            {isOpen && (
                <div className="lg:hidden bg-white px-6 py-4 space-y-3 transition-all duration-300">
                    <NavLink classLink="block link-navbar" href={pathname === "/" ? "#inicio" : "/"} click={() => setIsOpen(false)}>Inicio</NavLink>
                    <NavLink classLink="block link-navbar" href={pathname === "/" ? "#como-funciona" : "/#como-funciona"} click={() => setIsOpen(false)}>¿Cómo funciona?</NavLink>
                    <NavLink classLink="block link-navbar" href={pathname === "/" ? "#preguntas" : "/#preguntas"} click={() => setIsOpen(false)}>Preguntas</NavLink>
                    <NavLink classLink="block link-navbar" href="/contactanos" click={() => setIsOpen(false)}>Contáctanos</NavLink>
                    <NavLink classLink="block link-navbar" href="/cotizar" click={() => setIsOpen(false)}>Cotiza Aquí</NavLink>
                    <NavLink classLink="block link-navbar" href="/auth/registro" target="_blank" click={() => setIsOpen(false)}>Regístrate</NavLink>
                    <NavLink classLink="block link-navbar" href="/auth" target="_blank" click={() => setIsOpen(false)}>Ingresar</NavLink>
                </div>
            )}
        </header>
    );
}