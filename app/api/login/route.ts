import { HOST } from "@/utils/enums/host";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    const res = await fetch(`${HOST.BACKEND_URL}/api/v1/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });

    const data = await res.json();
    if (!res.ok) {
        return NextResponse.json({ error: data.error }, { status: 400 });
    }

    return NextResponse.json({ data: data.data });
}
