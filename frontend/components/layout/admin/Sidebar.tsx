'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SidebarDropdown from './SidebarDropdown'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGears, faGear, faCircleInfo, faHouse, faBoxesStacked } from '@fortawesome/free-solid-svg-icons'

interface SidebarProps {
    isOpen: boolean
}

export default function Sidebar({ isOpen }: SidebarProps) {
    const pathname = usePathname()

    const navItems = [
        { label: (<> <FontAwesomeIcon icon={faHouse} className="mr-2" /> Inicio </>), href: '/admin' },
        { label: (<> <FontAwesomeIcon icon={faBoxesStacked} className="mr-2" /> Productos </>), href: '/admin/products' },
    ]

    const navItemsSettings = [
        { label: (<> <FontAwesomeIcon icon={faGear} className="mr-2" /> General </>), href: '/admin/settings/general' },
        { label: (<> <FontAwesomeIcon icon={faCircleInfo} className="mr-2" /> Usuarios </>), href: '/admin/settings/users' }
    ];

    return (
        <aside
            className={`bg-gray-800 text-white p-4 space-y-4 h-screen w-64 z-40 fixed transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
        >
            <h2 className="text-2xl font-bold mb-6">Admin</h2>

            <nav className="flex flex-col space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`px-2 py-1 rounded hover:text--gray-900 ${isActive ? 'bg-white text-gray-900 font-bold' : 'text-white'
                                }`}
                        >
                            {item.label}
                        </Link>
                    )
                })}

                {/* Dropdown genérico */}
                <SidebarDropdown
                    label={(<> <FontAwesomeIcon icon={faGears} className="mr-2" /> Configuración </>)}
                    basePath="/admin/settings"
                    items={navItemsSettings}
                />
            </nav>
        </aside>
    )
}
