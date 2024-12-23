import { auth } from "@/auth";
import UserPremiumLocal from "..";
import VideoPlayerLocal from "../../video_local";

export async function PremiumContentLocal({
    premiumContent,
    premiumUser,
    tittle,
    description,
}: {
    premiumContent: boolean;
    premiumUser: boolean;
    tittle: string;
    description: string;
}) {
    const session = await auth();

    if (!premiumContent) {
        return (
            <VideoPlayerLocal
                id="123"
                session={session}
                tittle={tittle}
                description={description}
            />
        );
    }

    if (premiumUser) {
        return (
            <VideoPlayerLocal
                id="123"
                session={session}
                tittle={tittle}
                description={description}
            />
        );
    }

    return <UserPremiumLocal />;
}
