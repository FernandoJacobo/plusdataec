import Image from "next/image";
import FormularioIngresar from '@/components/layout/web/FormularioIngresar';

export default function LoginPage() {
    const ingresar = () => {
        return '';
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
