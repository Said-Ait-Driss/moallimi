import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const Auth = ({ children }: any) => {
    const { data: sessionData }: any = useSession();
    const router = useRouter();

    useEffect(() => {
        // check if the error has occurred
        if (sessionData?.user.error === 'invalid-version') {
            // Sign out here
            signOut();
        }
    }, [sessionData?.user.error, router]);

    return <>{children}</>;
};
