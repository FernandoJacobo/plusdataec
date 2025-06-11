import AuthLayout from '@/components/layout/auth/Layout'

import FormularioIngresar from '@/components/layout/auth/FormularioIngresar';

import { showAlert } from "@/helpers/general";

import type { NextPageWithLayout } from '../_app'

import { ReactElement } from 'react'

const AuthHome: NextPageWithLayout = () => {
    const ingresar = () => {
        showAlert({
            title: 'NOTA',
            message: 'No tiene permisos para acceder al sistema',
            icon: 'info',
        });
    };

    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <FormularioIngresar onClick={ingresar} showLinkRegister={true} />
        </div>
    )
}

AuthHome.getLayout = function getLayout(page: ReactElement) {
    return <AuthLayout>{page}</AuthLayout>
}

export default AuthHome