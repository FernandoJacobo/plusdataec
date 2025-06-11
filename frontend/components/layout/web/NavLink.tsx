'use client'

import Link from 'next/link'

interface NavLinkProps {
    href: string
    target?: string
    children: React.ReactNode
    classLink: string
}

export function NavLink({ href, target = 'none', children, classLink }: NavLinkProps) {
    const linkProps = target !== 'none' ? { target } : {}

    return (
        <Link href={href} className={`${classLink} block transition`} {...linkProps}>
            {children}
        </Link>
    )
}
