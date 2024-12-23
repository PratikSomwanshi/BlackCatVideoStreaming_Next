"use server"
import {HOST} from "@/utils/configuration/host";
import {auth} from "@/auth";


async function getToken() {
    const session = await auth();

    return session?.user.token;
}

export async function fetch_video_card() {
    try {

        const token = await getToken();

        console.log(`${HOST.BACKEND_URL}/api/v1/video`, token)

        const res = await fetch(`${HOST.BACKEND_URL}/api/v1/video`
        )

        const data = await res.json();

        if (!res.ok) {
            console.log(data)
            throw new Error(data.error.code || "Failed to fetch video");
        }


        return data;

    } catch (err: any) {
        return {
            error: err.message
        }
    }
}