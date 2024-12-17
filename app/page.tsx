import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { NEXT_AUTH } from "@/utils/configuration/next_auth";
import React from "react";

async function HomePage() {
    const session = await auth();

    // if (!session?.user.isLoggedIn) {
    //     return <div>Logged in</div>;
    // }

    return (
        <div>
            HomePage
            <Button>click</Button>
        </div>
    );
}

export default HomePage;
