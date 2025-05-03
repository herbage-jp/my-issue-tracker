import { prisma } from "@/prisma/client";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@/app/generated/prisma";
import Pagination from "@/app/components/Pagination";
import IssueTable, { columns } from "./IssueTable";
import { IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: PageProps) => {
  const resolvedParams = await searchParams;
  const status = resolvedParams?.status;
  const orderBy = resolvedParams?.orderBy;
  const page = parseInt(resolvedParams?.page || "1");
  const pageSize = 10;

  // validate status
  const resolvedStatus = Object.values(Status).includes(status as Status)
    ? status
    : undefined;

  // validate orderBy - ensure it's a valid key of Issue
  const resolvedOrderBy: keyof Issue = columns.some(
    (column) => column.value === (orderBy as keyof Issue)
  )
    ? (orderBy as keyof Issue)
    : "createdAt";

  const whereClause = {
    status: resolvedStatus as Status,
  };

  const issues = await prisma.issue.findMany({
    where: whereClause,
    orderBy: {
      [resolvedOrderBy]: "asc",
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalIssues = await prisma.issue.count({
    where: whereClause,
  });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable issues={issues} searchParams={resolvedParams} />
      <Pagination
        itemCount={totalIssues}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export default IssuesPage;
export const metadata: Metadata = {
  title: "Issue Tracker - Issue",
  description: "View all project issues",
};
