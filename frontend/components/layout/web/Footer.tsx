import Link from 'next/link';

import { useWebStore } from '@/store/useWebStore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faCopyright } from '@fortawesome/free-solid-svg-icons'

const year = new Date().getFullYear();
const message = 'Hola necesito información para reuperar mis impuestos con PLUSDATA';

export default function Footer() {
    const { informacionDeContacto } = useWebStore();

    return (
        <footer className="flex justify-center py-10 footer-web">
            <div className="w-full md:w-5/6 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row lg:justify-between gap-8">

                    <div className="w-full">
                        <h1 className="text-lg text-white font-bold mb-3 uppercase">¡Habla con nosotros!</h1>

                        <p className="text-lg text-white font-bold mb-3 uppercase">{informacionDeContacto.numero}</p>

                        <Link href={`https://wa.me/${informacionDeContacto.numero}?text=${message}`} target='_blank' className="p-2  md:ps-10 md:pe-10 rounded-full transition hover:scale-110  btn-footer">
                            <FontAwesomeIcon icon={faCommentDots} className='me-2' />
                            ¡Chatea con ahora!
                        </Link>
                    </div>

                    <div className="w-full flex flex-col md:flex-row">

                        <div className='w-full'>
                            <h1 className="text-md text-white font-bold mb-2">Productos</h1>
                            <ul>
                                <li className="text-white cursor-pointer hover:font-bold mb-4">
                                    <Link href={'/cotizar'} className="text-white cursor-pointer hover:font-bold">
                                        Cotizador
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className='w-full'>
                            <h1 className="text-md text-white font-bold mb-2">Recursos</h1>
                            <ul>
                                <li className="text-white cursor-pointer hover:font-bold mb-4">
                                    Centro de Recursos
                                </li>
                            </ul>
                        </div>

                        <div className='w-full'>
                            <h1 className="text-md text-white font-bold mb-2">Sobre Nosotros</h1>
                            <ul>
                                <li className="text-white cursor-pointer hover:font-bold mb-4">
                                    Términos de Servicio
                                </li>

                                <li className="text-white cursor-pointer hover:font-bold mb-4">
                                    Aviso de Privacidad
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className="w-full">
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
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}
