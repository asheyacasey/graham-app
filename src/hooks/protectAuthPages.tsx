
import { useAppSelector } from "@/redux/hooks";
import { useRouter, } from "next/navigation";
import React, { useEffect, useState } from "react";
const protectAuthPages = <P extends object>(
    WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
    const AuthComponent: React.FC<P> = (props) => {
        const authState = useAppSelector((s) => s.auth)
        const router = useRouter();
        useEffect(() => {
            if (authState.isLoggedIn) {
                router.push("/");
            }
        }, [authState.isLoggedIn, router]);
        if (authState.isLoggedIn) {
            return null
        }
        return <WrappedComponent {...props} />;
    };
    return AuthComponent;
};

export default protectAuthPages;
