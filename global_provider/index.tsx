import { SidebarProvider } from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React from "react";

function GlobalProvider({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem={false}
                disableTransitionOnChange>
                <SessionProvider>{children}</SessionProvider>
            </ThemeProvider>
        </div>
    );
}

export default GlobalProvider;
