"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import NavbarSliderUser from "./navbar_slider_user";
import NavbarSliderUserUtility from "./navbar_slider_user_utility";
import useGlobalContext from "@/hooks/useContext/useGlobalContext";

export function NavbarSlider({
    username,
    isPremiumUser,
    isLoggedIn,
}: {
    username: string | undefined;
    isPremiumUser: boolean;
    isLoggedIn: boolean;
}) {
    const {
        isUserAccountSliderOpen: isOpen,
        setIsUserAccountSliderOpen: setIsOpen,
    } = useGlobalContext();

    const handleDrawerOpen = () => {
        console.log("Drawer opened!");
        setIsOpen(true);
    };

    const handleDrawerClose = () => {
        console.log("Drawer closed!");
        setIsOpen(false);
    };

    return (
        <Drawer
            open={isOpen}
            onOpenChange={(open: any) =>
                open ? handleDrawerOpen() : handleDrawerClose()
            }>
            <DrawerTrigger asChild>
                <Button
                    className={`group bg-transparent text-foreground`}
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-label={isOpen ? "Close menu" : "Open menu"}>
                    <svg
                        className="pointer-events-none p-0 m-0"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4 12L20 12"
                            className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                        />
                        <path
                            d="M4 12H20"
                            className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                        />
                        <path
                            d="M4 12H20"
                            className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                        />
                    </svg>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[75%] 550:h-1/2">
                <div className="mx-auto w-full  justify-center items-center 550:items-end p-8 gap-10 550:gap-40 flex 550:flex-row flex-col">
                    <VisuallyHidden className="hidden">
                        <DrawerHeader>
                            <DrawerTitle></DrawerTitle>
                        </DrawerHeader>
                    </VisuallyHidden>
                    <div className="">
                        <NavbarSliderUser
                            username={username}
                            isPremiumUser={isPremiumUser}
                            isLoggedIn={isLoggedIn}
                        />
                    </div>
                    <div className="">
                        <NavbarSliderUserUtility />
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
