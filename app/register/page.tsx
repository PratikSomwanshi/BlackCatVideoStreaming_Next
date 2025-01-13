"use client";
import LoginLocal from "@/components/local/login_local";
import RegisterLocal from "@/components/local/register_local";
import useGlobalContext from "@/hooks/useContext/useGlobalContext";
import React, { useEffect } from "react";

function RegisterPage() {
    const { setIsJWTExpired, setIsSearchOpen } = useGlobalContext();

    useEffect(() => {
        setIsJWTExpired(false);
        setIsSearchOpen(false);
    }, []);

    return (
        <div>
            <RegisterLocal />
        </div>
    );
}

export default RegisterPage;
