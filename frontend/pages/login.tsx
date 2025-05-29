import Image from "next/image";
import FormularioIngresar from '@/components/layout/web/FormularioIngresar';
import { showToast } from "@/components/general/Toast";

export default function LoginPage() {
    const ingresar = () => {
        showToast('Plataforma en construcción.', 'error');
    };

    return (
        <div className="w-full flex flex-col items-center justify-center bg-purple-50 p-10">
            <Image
                src="/images/logo.png"
                alt="Hero"
                width={200}
                height={200}
            />

            <FormularioIngresar onClick={ingresar} showLinkRegister={true} />
        </div>
    );
}
