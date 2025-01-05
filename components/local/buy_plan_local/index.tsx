"use client";
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
import useGlobalContext from "@/hooks/useContext/useGlobalContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function BuyPlanLocal() {
    const { setIsSearchOpen, setIsUserAccountSliderOpen } = useGlobalContext();

    useEffect(() => {
        setIsSearchOpen(false);
        setIsUserAccountSliderOpen(false);
    }, []);

    const [isYearly, setIsYearly] = useState(false);

    const monthlyPrice = 199;
    const yearlyPrice = 1999;
    const savings = yearlyPrice - monthlyPrice * 12;

    return (
        <div
            style={{
                height: "calc(100vh - 4rem)",
            }}
            className="flex justify-center  items-center gap-1">
            <div className="w-full 400:w-1/2 flex justify-center items-center m-1">
                <Card className="w-full max-w-sm  h-1/2">
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
                        <Button className="w-full">Subscribe Now</Button>
                    </CardFooter>
                </Card>
            </div>
            <div
                className="hidden w-1/2 800:flex justify-center items-center bg-black"
                style={{
                    height: "calc(100vh - 4rem)",
                }}>
                <Image
                    src="/buy_plan.jpeg"
                    alt="Buy Plan"
                    width={100}
                    height={100}
                    className="h-full w-1/2"
                />
            </div>
        </div>
    );
}

export default BuyPlanLocal;
