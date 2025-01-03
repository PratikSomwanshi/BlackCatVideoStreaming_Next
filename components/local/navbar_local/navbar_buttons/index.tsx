import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { getSession } from "@/action/auth";

export async function NavbarButtonsLocal() {
    const session = await getSession();

    if (session.isLoggedIn) {
        return (
            <div className="max-w-48 flex items-center justify-center">
                <Button variant="link">
                    Hi, <span>{session.username!.substring(0, 10)}...</span>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-x-2 max-w-48">
            <Link href="/login">
                <Button variant="outline">Sign In</Button>
            </Link>
            <Button>Buy Plan</Button>
        </div>
    );
}
