
import { useAppSelector } from "@/redux/hooks";
import { useRouter, } from "next/navigation";
import React, { useEffect, useState } from "react";
import { URLS } from '@/utils/URLS'
import LoadingScreen from "@/ui/LoadingScreen";
const withAuth = <P extends object>(
    WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
    const AuthComponent: React.FC<P> = (props) => {
        const authState = useAppSelector((s) => s.auth)
        const router = useRouter();
        useEffect(() => {
            if (!authState.isLoggedIn) {
                router.replace(URLS.LOGIN);
            }
        }, [authState.isLoggedIn, router]);
        if (!authState.isLoggedIn) {
            return <LoadingScreen className="h-screen" />
        }
        return <WrappedComponent {...props} />;
    };
    return AuthComponent;
};

export default withAuth;
