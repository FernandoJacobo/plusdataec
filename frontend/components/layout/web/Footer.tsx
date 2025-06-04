import Link from 'next/link';

import { useWebStore } from '@/store/useWebStore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faCopyright } from '@fortawesome/free-solid-svg-icons'

const year = new Date().getFullYear();
const message = 'Hola%necesito%información%para%reuperar%mis%impuestos%con%PLUSDATA';

export default function Footer() {
    const { informacionDeContacto } = useWebStore();

    return (
        <footer className="flex justify-center p-10 footer-web">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-rounded-full max-w-7xl">

                <div className="md:col-span-1">
                    <h1 className="text-lg text-white font-bold mb-3 uppercase">¡Habla con nosotros!</h1>

                    <p className="text-lg text-white font-bold mb-3 uppercase">{informacionDeContacto.numero}</p>

                    <Link href={`https://wa.me/${informacionDeContacto.numero}?text=${message}`} target='_blank' className="px-7 py-2 rounded-full transition hover:scale-110  btn-footer">
                        <FontAwesomeIcon icon={faCommentDots} className='me-2' />
                        ¡Chatea con ahora!
                    </Link>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">

                    <div>
                        <h1 className="text-md text-white font-bold mb-2">Productos</h1>
                        <ul>
                            <li className="p-1 text-white cursor-pointer hover:font-bold">
                                <Link href={'/cotizar'} className="p-1 text-white cursor-pointer hover:font-bold">
                                    Cotizador
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h1 className="text-md text-white font-bold mb-2">Recursos</h1>
                        <ul>
                            <li className="p-1 text-white cursor-pointer hover:font-bold">
                                Centro de Recursos
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h1 className="text-md text-white font-bold mb-2">Sobre Nosotros</h1>
                        <ul>
                            <li className="p-1 text-white cursor-pointer hover:font-bold">
                                Términos de Servicio
                            </li>
                            <li className="p-1 text-white cursor-pointer hover:font-bold">
                                Aviso de Privacidad
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="md:col-span-1">
                    <h1 className="text-lg text-white font-bold mb-3 uppercase">¿Qué es plusdata.ec?</h1>

                    <p className="text-md text-white mb-4">
                        Una plataforma en la nube que te ayuda a realizar el seguimiento de tus trámites de devoluciones de impuestos en Ecuador.
                    </p>

                    <p className="text-sm text-white flex items-center gap-2">
                        <FontAwesomeIcon icon={faCopyright} />
                        Copyright { year } Plusdata Ecuador S.A.
                    </p>

                    <span className='footer-divider'></span>

                    <div className='mt-4 flex flex-wrap content-center gap-2'>
                        <Link href="" className='rounded-full transition bg-white p-3 footer-social'>
                            <i className="fa-brands fa-linkedin text-2xl"></i>
                        </Link>

                        <Link href="" className='rounded-full transition bg-white p-3 footer-social'>
                            <i className="fa-brands fa-facebook text-2xl"></i>
                        </Link>

                        <Link href="" className='rounded-full transition bg-white p-3 footer-social'>
                            <i className="fa-brands fa-instagram text-2xl"></i>
                        </Link>

                        <Link href="" className='rounded-full transition bg-white p-3 footer-social'>
                            <i className="fa-brands fa-youtube text-2xl"></i>
                        </Link>

                        <Link href="" className='rounded-full transition bg-white p-3 footer-social'>
                            <i className="fa-brands fa-x-twitter text-2xl"></i>
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
