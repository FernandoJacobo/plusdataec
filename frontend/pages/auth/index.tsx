import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AuthRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/auth/login');
    }, [router]);

    return null;
}
