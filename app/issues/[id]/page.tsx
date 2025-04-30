import React from "react";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";

export interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  // In Next.js 15, we need to await the params object before using its properties
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // Check if ID is valid - note that params.id is a string, not a number
  const issueId = parseInt(id);
  if (isNaN(issueId)) notFound();

  const issue = await prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap="3" my="2">
          <IssueStatusBadge status={issue.status} />

          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose mt-4">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button asChild>
          <Link href={`/issues/${issue.id}/edit`}>
            <Pencil2Icon />
            <span>Edit Issue</span>
          </Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
