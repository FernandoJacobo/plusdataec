import AdminLayout from "@/components/layout/admin/Layout";
import type { NextPageWithLayout } from "../../_app";
import { ReactElement } from "react";

const AdminConfiguracionGeneral: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4"> Configuración General </h1>
    </>
  );
};

AdminConfiguracionGeneral.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminConfiguracionGeneral;
