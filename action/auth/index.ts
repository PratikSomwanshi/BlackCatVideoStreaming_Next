"use server";
import { sessionOptions } from "@/utils/configuration/iron_session_config";
import { SessionData } from "@/utils/interface/iron_session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export const getSession = async () => {
    const session = await getIronSession<SessionData>(
        await cookies(),
        sessionOptions
    );

    if (!session.isLoggedIn) {
        session.isLoggedIn = false;
        session.isPremiumUser = false;
    }

    return session;
};

export const saveSession = async (data: SessionData) => {
    const session = await getSession();

    session.username = data.username;
    session.token = data.token;
    session.email = data.email;
    session.isPremiumUser = data.isPremiumUser;
    session.isLoggedIn = true;
    await session.save();

    return true;
};

export const makeSessionPremium = async () => {
    const session = await getSession();
    session.isPremiumUser = true;
    await session.save();
};

import { redirect } from "next/navigation";

export const logout = async () => {
    const session = await getIronSession<SessionData>(
        await cookies(),
        sessionOptions
    );
    session.destroy();
    redirect("/");
};
