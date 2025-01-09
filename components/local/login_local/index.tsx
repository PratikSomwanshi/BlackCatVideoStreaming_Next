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
        <div
            style={{
                height: "calc(100vh - 4rem)",
            }}
            className="flex justify-around items-center">
            <div className="h-full w-1/2 min-w-[500px] flex justify-center items-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card className="px-6 py-4 w-[26rem] space-y-4 ">
                        <div>
                            <h1 className="text-2xl font-semibold">Login</h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                Login to your account
                            </p>
                        </div>
                        <div>
                            <div>
                                <div className="space-y-2">
                                    {/* COMPONENT: Email */}

                                    <EmailLocal register={register} />

                                    {/* COMPONENT: Password */}
                                    <div>
                                        <PasswordLocal register={register} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {!apiError && errors && (
                                <div className="text-red-500 dark:text-red-400 h-10">
                                    {(errors.email && errors.email.message) ||
                                        (errors.password &&
                                            errors.password.message)}
                                </div>
                            )}
                            {apiError && (
                                <div className="text-red-500 dark:text-red-400 h-10">
                                    {apiError}
                                </div>
                            )}
                        </div>
                        {/* COMPONENT: Login Button */}
                        <div className="w-full flex justify-center pt-4 ">
                            <Button
                                disabled={isMutating}
                                data-loading={isMutating}
                                type="submit"
                                className="group relative disabled:opacity-100 w-[80%]">
                                <span className="group-data-[loading=true]:text-transparent ">
                                    Login
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
                        {/* COMPONENT: Seperator */}
                        <div>
                            <Separator className="my-8" />
                        </div>
                        <div className="flex flex-col gap-2">
                            {/* COMPONENT: GOOGLE BUTTON */}
                            {/* <GoogleLoginButton /> */}
                            {/* COMPONENT: GITHUB BUTTON */}
                            {/* <GithubLoginButton /> */}
                        </div>
                    </Card>
                </form>
            </div>
            <div className="h-full w-1/2 bg-[#3b3439]  justify-center items-center hidden 700:flex">
                <Image
                    src="/login_hero_image.jpeg"
                    alt="hero"
                    height={100}
                    width={100}
                    className="h-1/2 w-1/2 hidden 1000:block"
                />
                <div className="hidden 700:block 1000:hidden">
                    <h1 className="text-2xl font-semibold text-white">
                        Welcome back
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Login to your account
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginLocal;
