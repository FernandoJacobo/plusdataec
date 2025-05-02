'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, ReactNode } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons'

interface SubItem {
    label: ReactNode
    href: string
}

interface SidebarDropdownProps {
    label: ReactNode
    basePath: string
    items: SubItem[]
}

export default function SidebarDropdown({ label, basePath, items }: SidebarDropdownProps) {
    const pathname = usePathname()
    const isInSection = pathname.startsWith(basePath)
    const [open, setOpen] = useState(isInSection)

    useEffect(() => {
        if (isInSection) setOpen(true)
    }, [pathname])

    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className="w-full text-left p-2 rounded flex items-center justify-between hover:text-white"
            >
                <span>{label}</span>
                {open ? <FontAwesomeIcon icon={faCircleChevronUp} className="mr-2" /> : <FontAwesomeIcon icon={faChevronCircleDown} className="mr-2" />}
            </button>

            {open && (
                <div className="ml-4 mt-1 space-y-1">
                    {items.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`block p-2 rounde ${isActive ? 'bg-white text-gray-900 font-bold' : 'text-white hover:text-white'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
