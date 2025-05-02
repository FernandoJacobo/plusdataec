'use client'

import Link from 'next/link'

interface NavLinkProps {
    href: string
    children: React.ReactNode
    classLink: string
}

export function NavLink({ href, children, classLink }: NavLinkProps) {
    return (
        <Link href={href} className={`${classLink} block transition`} >
            {children}
        </Link>
    )
}