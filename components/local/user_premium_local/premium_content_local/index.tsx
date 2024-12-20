import UserPremiumLocal from "..";
import VideoPlayerLocal from "../../video_local";

export function PremiumContentLocal({
    premiumContent,
    premiumUser,
}: {
    premiumContent: boolean;
    premiumUser: boolean;
}) {
    if (!premiumContent) {
        return <VideoPlayerLocal id="123" />;
    }

    if (premiumUser) {
        return <VideoPlayerLocal id="123" />;
    }

    return <UserPremiumLocal />;
}
