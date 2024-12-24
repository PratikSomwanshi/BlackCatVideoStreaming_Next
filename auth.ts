import Google from "next-auth/providers/google";
import { HOST } from "./utils/configuration/host";
import { NEXT_AUTH } from "./utils/configuration/next_auth";
import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            username: string;
            email: string;
            token: string;
            isLoggedIn: boolean;
            isPremium: boolean;
        };
    }

    interface User {
        username: string;
        token: string;
        isLoggedIn: boolean;
        isPremium: boolean;
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        username: string;
        email: string;
        token: string;
        isLoggedIn: boolean;
        isPremium: boolean;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    const res = await fetch(
                        `${HOST.BACKEND_URL}/api/v1/login`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ email, password }),
                        }
                    );

                    const data = (await res.json()).data;

                    console.log("data ", data);
                    if (!res.ok) {
                        throw new CredentialsSignin("Invalid credentials");
                    }

                    const user = {
                        username: data.username as string,
                        email: data.email as string,
                        token: data.token as string,
                        isLoggedIn: true,
                        isPremium: data.isPremiumUser as boolean,
                    };

                    return user;
                } catch (error) {
                    if (error instanceof CredentialsSignin) {
                        throw error;
                    }
                    throw new AuthError("An error occurred");
                }
            },
        }),
        Google,
    ],
    callbacks: {
        async signIn({ user, account }) {
            try {
                if (account?.provider === "google") {
                    const res = await fetch(
                        `${HOST.BACKEND_URL}/google/login`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                accessToken: account.id_token,
                            }),
                        }
                    );

                    if (!res.ok) {
                        return "/error?error=OAuthCallback";
                    }

                    const data = (await res.json()).data[0];

                    console.log("data auth ", data);

                    user.username = data.username;
                    user.email = data.email;
                    user.token = data.token;
                    user.isLoggedIn = true;
                    user.isPremium = data.isPremiumUser;
                    return true;
                }

                if (account?.provider === "credentials") {
                    return true;
                }

                return "/error?error=OAuthCallback";
            } catch (error: any) {
                return `/error?error=${error.message}`;
            }
        },
        async session({ session, user, token }) {
            // console.log("session user ", user);

            if (token) {
                session.user.username = token.username as string;
                session.user.email = token.email as string;
                session.user.token = token.token as string;
                session.user.isLoggedIn = token.isLoggedIn as boolean; // Set to true if the user is logged in
                session.user.isPremium = token.isPremium as boolean;
            }
            return session;
        },

        async jwt({ token, user, account }) {
            // console.log("jwt user ", user);
            // console.log("jwt account ", account);

            if (user) {
                token.username = user.username;
                token.email = user.email as string;
                token.token = user.token;
                token.isLoggedIn = true;
                token.isPremium = user.isPremium;
            }
            return token;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: NEXT_AUTH.AUTH_SECRET,
    pages: {
        signIn: "/login",
        signOut: "/login",
        error: "/error",
    },
    trustHost: true,
});
