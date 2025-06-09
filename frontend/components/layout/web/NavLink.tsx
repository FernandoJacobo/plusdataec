'use client'

import Link from 'next/link'

interface NavLinkProps {
    href: string
    target?: string
    children: React.ReactNode
    classLink: string
}

export function NavLink({ href, target, children, classLink }: NavLinkProps) {
    return (
        <Link href={href} className={`${classLink} block transition`} target={`${target}`} >
            {children}
        </Link>
    )
}