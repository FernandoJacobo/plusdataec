import Image from "next/image";
import FormularioRegistro from '@/components/layout/web/FormularioRegistro';

type ClickResult = {
    success: boolean;
    message: string;
};

export default function RegistroPage() {
    const registrar = (res: ClickResult) => {
        console.log('c', res);
    }

    return (
        <div className="flex flex-col items-center justify-center bg-purple-50 p-10">
            <Image
                src="/images/logo.png"
                alt="Hero"
                width={200}
                height={200}
                className=""
            />

             <FormularioRegistro onClick={() => {registrar}} showLinkLogin={true} />
        </div>
    )
}