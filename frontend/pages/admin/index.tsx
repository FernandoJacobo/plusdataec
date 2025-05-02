import AdminLayout from '@/components/layout/admin/Layout'

import type { NextPageWithLayout } from '../_app'

import { ReactElement } from 'react'

const AdminHome: NextPageWithLayout = () => {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Bienvenido al Panel Admin</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow">
                    <h2 className="text-lg font-semibold mb-2">Resumen de Productos</h2>
                    <p>Productos totales: 0</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow">
                    <h2 className="text-lg font-semibold mb-2">Pedidos recientes</h2>
                    <p>Pedidos nuevos: 0</p>
                </div>
            </div>
        </>
    )
}

AdminHome.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>
}

export default AdminHome
