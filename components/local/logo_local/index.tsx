import { getSession } from "@/action/auth";
import { Crown } from "lucide-react";
import React from "react";

async function LogoLocal({ size = 20 }: { size: number }) {
    const session = await getSession();

    return (
        <div className="hidden 210:flex items-center gap-2">
            <svg
                width={size}
                height="41"
                viewBox="0 0 67 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M45.035 4.663C45.833 3.777 46.72 3.045 47.628 2.469C49.224 1.472 50.908 0.94 52.636 0.94V15.411C51.373 11.023 48.648 7.256 45.035 4.663ZM66.553 40.94H15.296C6.875 40.94 0.071 34.115 0.071 25.716C0.071 17.671 6.321 11.068 14.232 10.514V0.94C16.005 0.94 17.756 1.45 19.395 2.469C20.304 3.023 21.19 3.755 21.988 4.597C25.246 2.314 29.19 0.984 33.467 0.984C33.467 10.225 30.143 20.973 19.329 20.996H33.357C32.958 19.2 31.318 17.871 29.368 17.849H37.523C35.573 17.849 33.933 19.2 33.534 21.018H46.609C49.224 21.018 51.816 21.527 54.254 22.547C56.67 23.544 58.886 25.029 60.725 26.868C62.587 28.73 64.049 30.924 65.046 33.339C66.044 35.732 66.553 38.325 66.553 40.94ZM22.853 10.78C23.185 11.644 24.071 12.619 25.312 13.328C26.553 14.037 27.839 14.325 28.747 14.192C28.415 13.328 27.528 12.353 26.287 11.644C25.046 10.935 23.761 10.647 22.853 10.78ZM41.512 13.328C40.271 14.037 38.986 14.325 38.077 14.192C38.409 13.328 39.296 12.353 40.537 11.644C41.778 10.935 43.063 10.647 43.972 10.78C43.661 11.644 42.753 12.619 41.512 13.328Z"
                    fill="black"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"></path>
            </svg>
            <div className="flex items-center">
                {session.isPremiumUser && (
                    <Crown
                        className="-ms-1 me-2 mb-[0.10rem] opacity-60"
                        size={24}
                        strokeWidth={2}
                        aria-hidden="true"
                        style={{
                            color: "golden",
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default LogoLocal;
