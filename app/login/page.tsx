"use client";
import { saveSession } from "@/action/auth";
import LoginLocal from "@/components/local/login_local";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function LoginPage() {
    const router = useRouter();

    return (
        <div>
            {/* <Button
                onClick={async () => {
                    await saveSession({
                        token: "123",
                        username: "admin",
                        isLoggedIn: true,
                        isPremiumUser: true,
                        email: "jetha@gadda.com",
                    });

                    router.push("/");
                }}>
                login
            </Button> */}
            <LoginLocal />
        </div>
    );
}

export default LoginPage;
