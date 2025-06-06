import Header from './Header'
import Footer from './Footer'
import FloatingButtons from '../../general/FloatingButtons'

import { ReactNode } from 'react'
import Head from 'next/head'

import { Toast } from "@/components/general/Toast";

export default function Layout({ children }: { children: ReactNode }) {
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

            <Header />

            <main className="">{children}</main>

            <Footer />

            <FloatingButtons />

            <Toast />
        </>
    )
}
