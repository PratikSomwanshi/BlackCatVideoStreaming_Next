import { IRON_SESSION } from "@/utils/enums/iron_session";
import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
    password: IRON_SESSION.IRON_SESSION_PASSWORD,
    cookieName: IRON_SESSION.IRON_SESSION_COOKIE_NAME,
    cookieOptions: {
        httpOnly: IRON_SESSION.IRON_SESSION_COOKIE_OPTIONS_HTTP_ONLY,
        secure: IRON_SESSION.IRON_SESSION_COOKIE_OPTIONS_SECURE,
    },
};
