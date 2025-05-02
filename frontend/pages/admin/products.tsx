import AdminLayout from '@/components/layout/admin/Layout'
import type { NextPageWithLayout } from '../_app'
import { ReactElement } from 'react'

const AdminProductos: NextPageWithLayout = () => {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
            <p className="text-gray-600">Aquí aparecerá el listado de productos, botones para editar, crear, etc.</p>
        </>
    )
}

AdminProductos.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>
}

export default AdminProductos
