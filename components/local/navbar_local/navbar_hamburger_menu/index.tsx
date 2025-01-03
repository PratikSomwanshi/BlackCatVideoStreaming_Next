import { getSession } from "@/action/auth";
import { NavbarSlider } from "../navbar_slider";

export default async function NavbarHamburgerMenu() {
    const { isLoggedIn, isPremiumUser, username } = await getSession();

    return (
        <NavbarSlider
            username={username}
            isPremiumUser={isPremiumUser}
            isLoggedIn={isLoggedIn}
        />
    );
}
