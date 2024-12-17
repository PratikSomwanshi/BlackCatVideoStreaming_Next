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
                {children}
            </ThemeProvider>
        </div>
    );
}

export default GlobalProvider;
