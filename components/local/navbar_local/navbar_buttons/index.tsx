"use client"
import {Button} from "@/components/ui/button";
import React from "react";
import {useSession} from "next-auth/react";
import Link from "next/link";
import {CgSpinner} from "react-icons/cg";


export function NavbarButtonsLocal() {


    const {data, status} = useSession();

    if (status == "loading") {
        return <div className="h-full flex items-center justify-center w-48">
            <CgSpinner className="animate-spin" size={25}/>
        </div>;
    }

    if (data?.user.isLoggedIn) {
        return <div className="w-48 flex items-center justify-center">
            <Button
                variant="link"
            >Hi, <span>{data.user.username.substring(0, 10)}...</span></Button>
        </div>
    }

    return (

        <div className="space-x-2 w-48">
            <Link href="/login"><Button variant="outline">Sign In</Button></Link>
            <Button>Buy Plan</Button>
        </div>

    );
}
