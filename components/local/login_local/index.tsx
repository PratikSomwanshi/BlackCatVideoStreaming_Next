"use client";
import React, { useState } from "react";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { set, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthError } from "next-auth";
import { resolveSoa } from "dns";
import { ILoginInputs } from "@/utils/interface/login_interface";
import EmailLocal from "../email_local";
import PasswordLocal from "../password_local";
import Image from "next/image";

const errorMessages = {
    CredentialsSignin: "Invalid email or password",
    default: "An unknown error occurred. Please try again.",
};

function LoginLocal() {
    const [apiError, setApiError] = useState<string | null>(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginInputs>();
    const onSubmit: SubmitHandler<ILoginInputs> = async (data) => {
        console.log("done");
        const { email, password } = data;

        setIsLoading(true);

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            console.log("error occured", res);
            if (res.error === "CredentialsSignin") {
                setApiError("Invalid Password");
                setIsLoading(false);
                return;
            }

            setApiError(errorMessages.default);
            setIsLoading(false);
        }

        router.push("/");
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <div className="flex h-screen w-screen justify-around items-center">
            <div className="h-full w-1/2 flex justify-center items-center">
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
                                disabled={isLoading}
                                data-loading={isLoading}
                                type="submit"
                                className="group relative disabled:opacity-100 w-[80%]">
                                <span className="group-data-[loading=true]:text-transparent ">
                                    Login
                                </span>
                                {isLoading && (
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
            <div className="h-full w-1/2 bg-[#3b3439] flex justify-center items-center">
                <Image
                    src="/login_hero_image.jpeg"
                    alt="hero"
                    height={100}
                    width={100}
                    className="h-1/2 w-1/2"
                />
            </div>
        </div>
    );
}

export default LoginLocal;
