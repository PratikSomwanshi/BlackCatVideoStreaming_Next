import { getSession } from "@/action/auth";
import React from "react";

async function PremiumPage() {
    const session = await getSession();

    if (!session.isLoggedIn) {
        return <div>Please log in</div>;
    }

    return <div>PremiumPage</div>;
}

export default PremiumPage;
