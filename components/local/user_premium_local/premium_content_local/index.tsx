import { auth } from "@/auth";
import UserPremiumLocal from "..";
import VideoPlayerLocal from "../../video_local";

export async function PremiumContentLocal({
    premiumContent,
    premiumUser,
}: {
    premiumContent: boolean;
    premiumUser: boolean;
}) {
    const session = await auth();

    if (!premiumContent) {
        return <VideoPlayerLocal id="123" session={session} />;
    }

    if (premiumUser) {
        return <VideoPlayerLocal id="123" session={session} />;
    }

    return <UserPremiumLocal />;
}
