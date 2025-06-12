'use client'

import Link from 'next/link'

interface NavLinkProps {
    href: string
    target?: string
    children: React.ReactNode
    classLink: string
    click?: () => void
}

export function NavLink({ href, target = 'none', children, classLink, click }: NavLinkProps) {
    const linkProps: Record<string, any> = {
        ...(target !== 'none' && { target }),
        ...(click && { onClick: click }),
    }

    return (
        <Link href={href} className={`${classLink} block transition`} {...linkProps}>
            {children}
        </Link>
    )
}
