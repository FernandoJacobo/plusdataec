import AuthLayout from '@/components/layout/auth/Layout'

import FormularioRegistro from '@/components/layout/auth/FormularioRegistro';

import type { NextPageWithLayout } from '../_app'

import { ReactElement } from 'react'

type ClickResult = {
    success: boolean;
    message: string;
};

const AuthRegister: NextPageWithLayout = () => {
    const registrar = (res: ClickResult) => {
        console.log('c', res);
    }

    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <FormularioRegistro onClick={() => {registrar}} showLinkLogin={true} />
        </div>
    )
}

AuthRegister.getLayout = function getLayout(page: ReactElement) {
    return <AuthLayout>{page}</AuthLayout>
}

export default AuthRegister
