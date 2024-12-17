// export const NEXT_AUTH {
//     GOOGLE_CLIENT_ID: process.env.AUTH_GOOGLE_ID?
// }

export class NEXT_AUTH {
    public static GOOGLE_CLIENT_ID: string = process.env
        .AUTH_GOOGLE_ID as string;

    public static GOOGLE_CLIENT_SECRET: string = process.env
        .AUTH_GOOGLE_SECRET as string;

    public static AUTH_SECRET: string = process.env.AUTH_SECRET as string;
}
