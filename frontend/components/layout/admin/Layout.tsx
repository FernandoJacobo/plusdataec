import { useState } from 'react'

import Sidebar from './Sidebar'
import Footer from './Footer'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className="min-h-screen flex relative">
            <Sidebar isOpen={sidebarOpen} />

            <div className={`flex-1 bg-gray-100 min-h-screen transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`} >
                <div className="bg-white shadow p-4 flex items-center sticky top-0 z-50">
                    <button type="button" onClick={() => setSidebarOpen(!sidebarOpen)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" >
                        {sidebarOpen ? 'Ocultar' : 'Mostrar'} Menú
                    </button>
                    <span className="ml-4 font-bold">Panel Admin</span>
                </div>

                <main className="min-h-screen p-4">{children}</main>

                <Footer />
            </div>
        </div>
    )
}