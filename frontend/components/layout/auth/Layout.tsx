import { useState } from 'react';

import Head from 'next/head'

import FloatingButtons from '../../general/FloatingButtons'
import Image from 'next/image';

import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </Head>

            <div className="min-h-screen flex flex-col relative items-center justify-center">
                <div className='w-full flex items-center justify-center'>
                    <Image
                        src="/images/logo.png"
                        alt="Hero"
                        width={200}
                        height={200}
                        className=""
                    />
                </div>
                
                {children}
            </div>

            <FloatingButtons />
        </>
    )
}