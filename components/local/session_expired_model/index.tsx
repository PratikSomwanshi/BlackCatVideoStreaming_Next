import React from "react";

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function SessionExpiredModel() {
    return (
        <Drawer open>
            <DrawerContent className="h-1/2 w-full">
                <div className="mx-auto w-1/2">
                    <DrawerHeader>
                        <DrawerTitle className="text-3xl">
                            Session Expired
                        </DrawerTitle>
                        <DrawerDescription className="text-xl space-y-4">
                            <span>
                                Your session has expired. Please login again
                            </span>
                            <span className="block w-1/2">
                                <Link href="/login">
                                    <Button className="w-1/2">Login</Button>
                                </Link>
                            </span>
                        </DrawerDescription>
                    </DrawerHeader>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default SessionExpiredModel;
