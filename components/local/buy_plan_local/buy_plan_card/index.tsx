"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { HOST } from "@/utils/enums/host";
import useGlobalContext from "@/hooks/useContext/useGlobalContext";
import LoadingSpinnerLocal from "../../loading_spinner";
import { useRouter } from "next/navigation";
import { isSessionExpired } from "@/utils/is_jwt_expired";

async function handlePayment(
    url: string,
    {
        arg,
    }: { arg: { amount: Number; name: string; email: string; token: string } }
) {
    console.log(arg.amount);

    const response = await fetch(`${HOST.BACKEND_URL}/payment/checkout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${arg.token}`,
        },
        body: JSON.stringify({
            amount: arg.amount,
            name: arg.name,
            quantity: "1",
            email: arg.email,
        }),
    });

    const data = await response.json();
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error(data.error.code || "Something went wrong");
        }
        throw new Error("Something went wrong");
    }

    return data;
}

function BuyPlanCard({ email, token }: { email: string; token: string }) {
    const [isYearly, setIsYearly] = useState(false);
    const { setIsSearchOpen, setIsUserAccountSliderOpen } = useGlobalContext();
    const router = useRouter();

    useEffect(() => {
        setIsSearchOpen(false);
        setIsUserAccountSliderOpen(false);
    }, []);

    const monthlyPrice = 99;
    const yearlyPrice = 499;
    const savings = monthlyPrice * 12 - yearlyPrice;

    const { setIsJWTExpired } = useGlobalContext();

    const { isMutating, error, trigger } = useSWRMutation(
        "buyPlan",
        handlePayment,
        {
            onSuccess: (data) => {
                console.log("data ", data.data.sessionUrl);
                window.open(data.data.sessionUrl, "_blank");
            },
            onError: (error) => {
                if (isSessionExpired(error.message)) {
                    console.log("jwt error ", error.message);
                    setIsJWTExpired(true);
                    return;
                }
                console.log("error ", error);
            },
        }
    );

    async function handleClickBuyPlan(isYearly: boolean, email: string) {
        if (isYearly) {
            trigger({
                amount: 49900,
                name: "BlackCat yearly-499",
                email,
                token,
            });
            return;
        }
        trigger({ amount: 9900, name: "BlackCat monthly-99", email, token });
    }

    return (
        <div className="w-full max-w-md">
            <Card className="w-full shadow-xl border-border">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold text-center">
                        Choose Your Plan
                    </CardTitle>
                    <CardDescription className="text-center text-base">
                        Unlock the full experience with our premium plans
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-center space-x-4 p-4 bg-muted/50 rounded-lg">
                        <span
                            className={`text-sm font-medium transition-colors ${
                                !isYearly ? "text-primary" : "text-muted-foreground"
                            }`}>
                            Monthly
                        </span>
                        <Switch
                            checked={isYearly}
                            onCheckedChange={setIsYearly}
                            aria-label="Toggle billing cycle"
                        />
                        <span
                            className={`text-sm font-medium transition-colors ${
                                isYearly ? "text-primary" : "text-muted-foreground"
                            }`}>
                            Yearly
                        </span>
                    </div>
                    
                    <div className="text-center space-y-2 py-4">
                        <div className="flex items-center justify-center gap-1">
                            <span className="text-5xl font-bold tracking-tight">
                                ${isYearly ? yearlyPrice : monthlyPrice}
                            </span>
                            <span className="text-muted-foreground self-end mb-2">
                                /{isYearly ? "year" : "month"}
                            </span>
                        </div>
                        
                        <div className="h-6 flex items-center justify-center">
                            {isYearly && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                    Save ${savings} per year
                                </span>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="pb-8">
                    {isMutating ? (
                        <Button className="w-full py-6" disabled>
                            <LoadingSpinnerLocal size={24} />
                        </Button>
                    ) : (
                        <Button
                            size="lg"
                            className="w-full text-lg font-semibold py-6 shadow-md hover:shadow-lg transition-all"
                            onClick={handleClickBuyPlan.bind(
                                null,
                                isYearly,
                                email
                            )}>
                            Subscribe Now
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}

export default BuyPlanCard;
