import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { issueSchema } from "@/app/validationSchemas";
import authOptions from "@/app/auth/AuthOption";
import { getServerSession, AuthOptions } from "next-auth";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions as AuthOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const result = issueSchema.safeParse(body);
    if (!result.success) {
        return NextResponse.json({ error: result.error.format }, { status: 400 });
    }

    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description,
        }
    });


    return NextResponse.json(newIssue, { status: 201 });
}