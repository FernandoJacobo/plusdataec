'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

import Image from "next/image";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

import { NavLink } from './NavLink'
import { ButtonNavLink } from './ButtonNavLink'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        observerFunction();
    }, []);

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
            {
                threshold: 0.3, // 60% visible para activar
            }
        );

        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }

    const pathname = usePathname();

    return (
        <header className="bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center justify-between w-full flex-row-reverse sm:flex-row p-2">
                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-3 rounded-lg transition btn-mobile">
                        {isOpen ? <FontAwesomeIcon icon={faXmark} className="mr-2" /> : <FontAwesomeIcon icon={faBars} className="mr-2" />}
                    </button>

                    <Image
                        src="/images/logo.png"
                        alt="Hero"
                        width={130}
                        height={130}
                        className=""
                    />

                    <nav className="hidden lg:flex space-x-9">
                        <NavLink classLink={`link-navbar`} href={`${pathname === "/" ? "#inicio" : "/"}`}> Inicio </NavLink>
                        <NavLink classLink={`link-navbar`} href={`${pathname === "/" ? "#como-funciona" : "/#como-funciona"}`} > ¿Cómo funciona? </NavLink>
                        <NavLink classLink={`link-navbar`} href={`${pathname === "/" ? "#preguntas" : "/#preguntas"}`} > Preguntas </NavLink>
                        <NavLink classLink={`link-navbar`} href="/contactanos"> Contáctanos </NavLink>
                    </nav>

                    <nav className="hidden lg:flex space-x-4">
                        <ButtonNavLink href="/cotizar"> Cotiza Aquí </ButtonNavLink>
                        <ButtonNavLink href="/auth/registro"> Regístrate </ButtonNavLink>
                        <ButtonNavLink href="/auth"> Ingresar </ButtonNavLink>
                    </nav>
                </div>
            </div>

            {/* Menú móvil desplegable */}
            {isOpen && (
                <div className="lg:hidden p-4 space-y-2 bg-white shadow">
                    <NavLink classLink={`link-navbar`} href={`${pathname === "/" ? "#inicio" : "/"}`}> Inicio </NavLink>
                    <NavLink classLink={`link-navbar`} href={`${pathname === "/" ? "#como-funciona" : "/#como-funciona"}`}> ¿Cómo funciona? </NavLink>
                    <NavLink classLink={`link-navbar`} href={`${pathname === "/" ? "#preguntas" : "/#preguntas"}`}> Preguntas </NavLink>
                    <NavLink classLink={`link-navbar`} href="/contactanos"> Contáctanos </NavLink>
                    <NavLink classLink={`link-navbar`} href="/cotizar"> Cotiza Aquí </NavLink>
                    <NavLink classLink={`link-navbar`} href="/registro"> Regístrate </NavLink>
                    <NavLink classLink={`link-navbar`} href="/auth"> Ingresar </NavLink>
                </div>
            )}
        </header>
    )
}
