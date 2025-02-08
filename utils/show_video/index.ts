function showVideo(videoPremium: boolean, userPremium: boolean) {
    console.log("video ", videoPremium, userPremium);

    if (userPremium) {
        return true;
    }

    if (videoPremium && !userPremium) {
        return false;
    }

    return true;
}

export default showVideo;
