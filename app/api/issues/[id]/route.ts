import authOptions from "@/app/auth/AuthOption";
import { patchIssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { Status } from "@/app/generated/prisma";
import { getServerSession, AuthOptions } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }) {
        const session = await getServerSession(authOptions as AuthOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

    const body = await request.json();
    const { id } = await props.params;
    const result = patchIssueSchema.safeParse(body);

    if (!result.success) {
        return NextResponse.json({ error: result.error.format }, { status: 400 });
    }

    const { title, description, assignedToUserId, status } = body;
    if (assignedToUserId) {
        const user = await prisma.user.findUnique({
            where: {
                id: assignedToUserId,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }
    }

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(id)
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
            title,
            description,
            assignedToUserId,
            status: status as Status,
        }
    });

    return NextResponse.json(updatedIssue);
}
    
export async function GET(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }) {
    
    const { id } = await props.params;
    const issueId = parseInt(id);
    
    if (isNaN(issueId)) {
        return NextResponse.json({ error: "Invalid issue ID" }, { status: 400 });
    }
    
    const issue = await prisma.issue.findUnique({
        where: {
            id: issueId,
        },
        include: {
            assignedToUser: true,
        }
    });
    
    if (!issue) {
        return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }
    
    return NextResponse.json(issue);
}

export async function DELETE(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }) {
  
    const session = await getServerSession(authOptions as AuthOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await props.params;

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if (!issue) {
        return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    await prisma.issue.delete({
        where: {
            id: issue.id,
        }
    });

    return NextResponse.json({ message: "Issue deleted" });
}