'use client'


import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface ButtonNavLinkProps {
    href: string
    children: React.ReactNode,
    target?: string | '',
}

export function ButtonNavLink({ href, children, target }: ButtonNavLinkProps) {
    const pathname = usePathname()

    const isActive = pathname === href

    return (
        <Link
            href={href}
            target={target}
            className={`px-10 py-2 rounded-full transition btn-navbar ${isActive
                    ? 'active'
                    : ''
                }`}
        >
            {children}
        </Link>
    )
}
