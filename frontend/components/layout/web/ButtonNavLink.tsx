'use client'


import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface ButtonNavLinkProps {
    href: string
    children: React.ReactNode
}

export function ButtonNavLink({ href, children }: ButtonNavLinkProps) {
    const pathname = usePathname()

    const isActive = pathname === href

    return (
        <Link
            href={href}
            className={`px-10 py-2 rounded-full transition btn-navbar ${isActive
                    ? 'active'
                    : ''
                }`}
        >
            {children}
        </Link>
    )
}
