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

function UsernameLocal({ register }: { register: any }) {
    return (
        <div>
            <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
            </label>
            <input
                {...register("username", { required: "Username is required" })}
                id="username"
                type="text"
                className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition duration-300 ease-in-out focus:outline-none px-2 py-1"
                placeholder="Enter your username"
            />
        </div>
    );
}

function EmailLocal({ register }: { register: any }) {
    return (
        <div>
            <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
            </label>
            <input
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                    },
                })}
                id="email"
                type="email"
                className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition duration-300 ease-in-out focus:outline-none px-2 py-1"
                placeholder="Enter your email"
            />
        </div>
    );
}

function PasswordLocal({ register }: { register: any }) {
    return (
        <div>
            <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
            </label>
            <input
                {...register("password", {
                    required: "Password is required",
                })}
                id="password"
                type="password"
                className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition duration-300 ease-in-out focus:outline-none px-2 py-1"
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
        <div>
            <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
            </label>
            <input
                {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value: string) =>
                        value === watch("password") || "Passwords do not match",
                })}
                id="confirmPassword"
                type="password"
                className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition duration-300 ease-in-out focus:outline-none px-2 py-1"
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
        <div className="flex h-full w-full justify-center items-center bg-gray-100 dark:bg-gray-800">
            <div
                style={{
                    height: "calc(100vh - 4rem)",
                }}
                className="flex flex-col lg:flex-row h-full w-full justify-center items-center bg-gray-100 dark:bg-gray-800">
                {/* Left side: Form */}
                <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center items-center max-w-md mx-auto min-w-[300px]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Card className="w-full p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg space-y-6 min-w-[300px] max-w-[500px]">
                            <div>
                                <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center">
                                    Register
                                </h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                                    Create your account
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
                                {!apiError && errors && (
                                    <div className="text-red-500 dark:text-red-400 h-10">
                                        {(errors.username &&
                                            errors.username.message) ||
                                            (errors.email &&
                                                errors.email.message) ||
                                            (errors.password &&
                                                errors.password.message) ||
                                            (errors.confirmPassword &&
                                                errors.confirmPassword.message)}
                                    </div>
                                )}
                                {apiError && (
                                    <div className="text-red-500 dark:text-red-400 h-10">
                                        {apiError}
                                    </div>
                                )}
                            </div>
                            <div className="w-full flex justify-center pt-4">
                                <Button
                                    disabled={isMutating}
                                    data-loading={isMutating}
                                    type="submit"
                                    className="group relative disabled:opacity-100 w-full py-2 px-4 bg-black text-white rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-black">
                                    <span className="group-data-[loading=true]:text-transparent">
                                        Register
                                    </span>
                                    {isMutating && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <LoaderCircle
                                                className="animate-spin"
                                                size={16}
                                                strokeWidth={2}
                                                aria-hidden="true"
                                            />
                                        </div>
                                    )}
                                </Button>
                            </div>
                            <Separator className="my-4" />
                            <p className="text-center text-gray-600 dark:text-gray-300">
                                Already have an account?{" "}
                                <Link href="/login" className="text-indigo-500">
                                    Login
                                </Link>
                            </p>
                        </Card>
                    </form>
                </div>

                {/* Right side: Image */}
                <div className="w-full h-full lg:w-1/2 bg-[#3b3439] justify-center items-center hidden lg:flex">
                    <Image
                        src="/register.jpg"
                        alt="hero"
                        height={500}
                        width={800}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute hidden lg:block text-center p-4">
                        <h1 className="text-2xl font-semibold text-white">
                            Welcome to our platform
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Create your account
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterLocal;
