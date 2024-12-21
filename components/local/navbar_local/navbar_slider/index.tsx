"use client";

import * as React from "react";

import {Button} from "@/components/ui/button";
import {Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger,} from "@/components/ui/drawer";
import {useTheme} from "next-themes";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import NavbarSliderUser from "./navbar_slider_user";
import NavbarSliderUserUtility from "./navbar_slider_user_utility";

export function NavbarSlider() {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        console.log("Drawer opened!");
        setIsOpen(true);
    };

    const handleDrawerClose = () => {
        console.log("Drawer closed!");
        setIsOpen(false);
        // Perform any cleanup or state adjustments here
    };

    const {theme} = useTheme();

    const color = theme === "dark" ? "dark" : "white";

    return (
        <Drawer
            open={isOpen}
            onOpenChange={(open: any) =>
                open ? handleDrawerOpen() : handleDrawerClose()
            }>
            <DrawerTrigger asChild>
                <Button
                    className={`group hover:bg-${color} bg-${color}`}
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen((prevState) => !prevState)}
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
                <div
                    className="mx-auto w-full  justify-center items-center 550:items-end p-8 gap-10 550:gap-40 flex 550:flex-row flex-col">
                    <VisuallyHidden className="hidden">
                        <DrawerHeader>
                            <DrawerTitle></DrawerTitle>
                        </DrawerHeader>
                    </VisuallyHidden>
                    <div className="">
                        <NavbarSliderUser/>
                    </div>
                    <div className="">
                        <NavbarSliderUserUtility/>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
