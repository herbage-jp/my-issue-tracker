import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import { AuthOptions, getServerSession } from "next-auth";
import authOptions from "@/app/auth/AuthOption";
import { cache } from "react";
import IssueDetailClient from "./IssueDetailClient";

export interface Props {
  params: Promise<{ id: string }>;
}

const fetchUser = cache((issueId: number) => {
  return prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  });
});

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions as AuthOptions);

  // In Next.js 15, params is a Promise that needs to be awaited
  const { id } = await params;

  // Check if ID is valid - note that params.id is a string, not a number
  const issueId = parseInt(id);
  if (isNaN(issueId)) notFound();

  const issue = await fetchUser(issueId);

  if (!issue) notFound();

  return <IssueDetailClient initialIssue={issue} showEditOptions={!!session} />;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await fetchUser(parseInt(id));

  return {
    title: issue?.title,
    description: "Details of issue " + issue?.title,
  };
}

export default IssueDetailPage;
