"use client"
import {Button} from "@/components/ui/button";
import React from "react";
import {useSession} from "next-auth/react";
import Link from "next/link";


export function NavbarButtonsLocal() {


    const {data} = useSession();

    if (data?.user.isLoggedIn) {
        return <Button
            variant="link"
        >Hi, <span>{data.user.username.substring(0, 10)}...</span></Button>
    }

    return (

        <div className="space-x-2">
            <Link href="/login"><Button variant="outline">Sign In</Button></Link>
            <Button>Buy Plan</Button>
        </div>

    );
}
