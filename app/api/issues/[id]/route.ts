import { issueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }) {

    const body = await request.json();
    const { id } = await props.params;
    const result = issueSchema.safeParse(body);

    if (!result.success) {
        return NextResponse.json({ error: result.error.format }, { status: 400 });
    }

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if (!issue) {
        return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    const updatedIssue = await prisma.issue.update({
        where: {
            id: issue.id,
        },
        data: {
            title: body.title,
            description: body.description,
        }
    });

    return NextResponse.json(updatedIssue);
}
    
