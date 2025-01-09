"use client";
import LoginLocal from "@/components/local/login_local";
import useGlobalContext from "@/hooks/useContext/useGlobalContext";
import React, { useEffect } from "react";

function LoginPage() {
    const { setIsJWTExpired, setIsSearchOpen } = useGlobalContext();

    useEffect(() => {
        setIsJWTExpired(false);
        setIsSearchOpen(false);
    }, []);

    return (
        <div>
            <LoginLocal />
        </div>
    );
}

export default LoginPage;
