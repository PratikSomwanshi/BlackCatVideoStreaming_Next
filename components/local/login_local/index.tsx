"use client";
import React, { useState } from "react";

import { set, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ILoginInputs } from "@/utils/interface/login_interface";
import EmailLocal from "../email_local";
import PasswordLocal from "../password_local";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import { Card } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { saveSession } from "@/action/auth";

export const login = async (
    key: string,
    { arg }: { arg: { email: string; password: string } }
) => {
    const response = await fetch(`/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: arg.email,
            password: arg.password,
        }),
    });

    const res = await response.json();

    console.log("res", res);

    if (response.ok) {
        return res.data;
    }

    if (res.error.explanation.code) {
        throw new Error(res.error.explanation.code);
    }

    throw new Error(res.error.explanation || "Something went wrong");
};

function LoginLocal() {
    const [apiError, setApiError] = useState<string | null>(null);
    const router = useRouter();

    const { isMutating, trigger } = useSWRMutation("login", login, {
        onSuccess: async (data) => {
            // console.log("data local ", data);
            await saveSession(data);
            router.push("/");
        },
        onError: (error) => {
            console.log("error", error);

            setApiError(error.message);
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginInputs>();
    const onSubmit: SubmitHandler<ILoginInputs> = async (data) => {
        console.log("done");
        const { email, password } = data;

        trigger({ email, password });
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] w-full">
            {/* Left side: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-background">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
                    <Card className="p-8 shadow-xl border-border space-y-6">
                        <div className="space-y-2 text-center">
                            <h1 className="text-3xl font-bold tracking-tight">Login</h1>
                            <p className="text-muted-foreground">
                                Enter your credentials to access your account
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            <EmailLocal register={register} />
                            <PasswordLocal register={register} />
                        </div>

                        <div>
                            {(errors.email || errors.password || apiError) && (
                                <div className="text-destructive text-sm font-medium text-center">
                                    {errors.email?.message || errors.password?.message || apiError}
                                </div>
                            )}
                        </div>

                        <div className="pt-2">
                            <Button
                                disabled={isMutating}
                                type="submit"
                                className="w-full relative">
                                <span className={isMutating ? "invisible" : ""}>
                                    Login
                                </span>
                                {isMutating && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <LoaderCircle
                                            className="animate-spin"
                                            size={16}
                                            strokeWidth={2}
                                        />
                                    </div>
                                )}
                            </Button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="w-full" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                    Or
                                </span>
                            </div>
                        </div>

                        <div className="text-center text-sm">
                            <p className="text-muted-foreground">
                                Don't have an account?{" "}
                                <Link
                                    href="/register"
                                    className="text-primary hover:underline font-medium">
                                    Register
                                </Link>
                            </p>
                        </div>
                    </Card>
                </form>
            </div>

            {/* Right side: Image (Hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 bg-muted items-center justify-center relative overflow-hidden">
                <Image
                    src="/login_hero_image.jpeg"
                    alt="Login Hero"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                     <div className="text-center text-white p-6">
                        <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
                        <p className="text-lg text-gray-200">Stream your favorite content anytime, anywhere.</p>
                     </div>
                </div>
            </div>
        </div>
    );
}

export default LoginLocal;
