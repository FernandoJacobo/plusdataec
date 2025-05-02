import '@/styles/globals.css';

import type { AppProps } from 'next/app'
import type { NextPage } from 'next'

import { ReactElement, ReactNode } from 'react'

import Layout from '@/components/layout/web/Layout'

import { config } from "@fortawesome/fontawesome-svg-core"

import "@fortawesome/fontawesome-svg-core/styles.css"

import 'animate.css';

import { Toaster } from "react-hot-toast";

config.autoAddCss = false

// Soporte para layouts personalizados por página
export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)
    return getLayout(<Component {...pageProps} />)
}