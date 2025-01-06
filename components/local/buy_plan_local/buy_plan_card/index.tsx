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

    if (!response.ok) {
        throw new Error("Failed to checkout");
    }

    const data = await response.json();
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

    const { isMutating, error, trigger } = useSWRMutation(
        "buyPlan",
        handlePayment,
        {
            onSuccess: (data) => {
                console.log("data ", data.data.sessionUrl);
                window.open(data.data.sessionUrl, "_blank");
            },
            onError: (error) => {
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
        <div className="w-full max-w-sm  h-1/2">
            <Card className="w-full max-w-sm  h-full">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Buy The Plan
                    </CardTitle>
                    <CardDescription className="text-center">
                        Choose the best plan for you
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center space-x-2 mb-6">
                        <span
                            className={`text-sm transition-colors duration-200 ${
                                !isYearly
                                    ? "text-primary font-medium"
                                    : "text-muted-foreground"
                            }`}>
                            Monthly
                        </span>
                        <Switch
                            checked={isYearly}
                            onCheckedChange={setIsYearly}
                            aria-label="Toggle between monthly and yearly billing"
                        />
                        <span
                            className={`text-sm transition-colors duration-200 ${
                                isYearly
                                    ? "text-primary font-medium"
                                    : "text-muted-foreground"
                            }`}>
                            Yearly
                        </span>
                    </div>
                    <div className="text-center space-y-2">
                        <div className="text-4xl font-bold transition-all duration-200 ease-in-out">
                            ${isYearly ? yearlyPrice : monthlyPrice}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            per {isYearly ? "year" : "month"}
                        </div>
                        <div className="h-2">
                            {" "}
                            {/* Fixed height container for savings message */}
                            {isYearly && (
                                <div className="text-sm text-green-600 font-medium animate-fade-in">
                                    Save ${savings} per year
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    {isMutating ? (
                        <Button className="w-full" disabled>
                            <LoadingSpinnerLocal size={20} />
                        </Button>
                    ) : (
                        <Button
                            className="w-full"
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
