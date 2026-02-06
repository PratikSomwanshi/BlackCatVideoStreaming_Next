"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import { Card } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function UsernameLocal({ register }: { register: any }) {
    return (
        <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
                {...register("username", { required: "Username is required" })}
                id="username"
                type="text"
                placeholder="Enter your username"
            />
        </div>
    );
}

function EmailLocal({ register }: { register: any }) {
    return (
        <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                    },
                })}
                id="email"
                type="email"
                placeholder="Enter your email"
            />
        </div>
    );
}

function PasswordLocal({ register }: { register: any }) {
    return (
        <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
                {...register("password", {
                    required: "Password is required",
                })}
                id="password"
                type="password"
                placeholder="Enter your password"
            />
        </div>
    );
}

function ConfirmPasswordLocal({
    register,
    watch,
}: {
    register: any;
    watch: any;
}) {
    return (
        <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
                {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value: string) =>
                        value === watch("password") || "Passwords do not match",
                })}
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
            />
        </div>
    );
}

export const register_function = async (
    key: string,
    { arg }: { arg: { username: string; email: string; password: string } }
) => {
    const response = await fetch(`/api/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: arg.username,
            email: arg.email,
            password: arg.password,
        }),
    });

    const res = await response.json();

    if (response.ok) {
        return res.data;
    }

    if (res.error?.explanation?.code) {
        throw new Error(res.error.explanation.code);
    }

    throw new Error(res.error?.explanation || "Something went wrong");
};

function RegisterLocal() {
    const [apiError, setApiError] = useState<string | null>(null);
    const router = useRouter();

    const { isMutating, trigger } = useSWRMutation(
        "register",
        register_function,
        {
            onSuccess: async () => {
                router.push("/login");
            },
            onError: (error) => {
                setApiError(error.message);
            },
        }
    );

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<{
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
    }>();
    const onSubmit: SubmitHandler<{
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
    }> = async (data) => {
        const { username, email, password } = data;
        console.log(data);
        trigger({ username, email, password });
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] w-full">
            {/* Left side: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-background">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
                    <Card className="p-8 shadow-xl border-border space-y-6">
                        <div className="space-y-2 text-center">
                            <h1 className="text-3xl font-bold tracking-tight">Register</h1>
                            <p className="text-muted-foreground">
                                Create your account to get started
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            <UsernameLocal register={register} />
                            <EmailLocal register={register} />
                            <PasswordLocal register={register} />
                            <ConfirmPasswordLocal
                                register={register}
                                watch={watch}
                            />
                        </div>

                        <div>
                            {(errors.username || errors.email || errors.password || errors.confirmPassword || apiError) && (
                                <div className="text-destructive text-sm font-medium text-center">
                                    {errors.username?.message || 
                                     errors.email?.message || 
                                     errors.password?.message || 
                                     errors.confirmPassword?.message || 
                                     apiError}
                                </div>
                            )}
                        </div>

                        <div className="pt-2">
                            <Button
                                disabled={isMutating}
                                type="submit"
                                className="w-full relative">
                                <span className={isMutating ? "invisible" : ""}>
                                    Register
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
                                Already have an account?{" "}
                                <Link href="/login" className="text-primary hover:underline font-medium">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </Card>
                </form>
            </div>

            {/* Right side: Image (Hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 bg-muted items-center justify-center relative overflow-hidden">
                <Image
                    src="/register.jpg"
                    alt="Register Hero"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                     <div className="text-center text-white p-6">
                        <h2 className="text-4xl font-bold mb-4">Join Us Today</h2>
                        <p className="text-lg text-gray-200">Unlock a world of premium video entertainment.</p>
                     </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterLocal;
