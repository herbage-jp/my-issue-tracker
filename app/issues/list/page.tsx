import { prisma } from "@/prisma/client";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@/app/generated/prisma";
import Pagination from "@/app/components/Pagination";
import IssueTable, { columns } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const IssuesPage = async ({ searchParams }: PageProps) => {
  const resolvedParams = await searchParams;
  const status = resolvedParams?.status;
  const orderBy = resolvedParams?.orderBy;
  const sortOrder = resolvedParams?.sortOrder;
  const pageValue = resolvedParams?.page;
  const pageSizeValue = resolvedParams?.pageSize;
  
  const page = parseInt(Array.isArray(pageValue) ? pageValue[0] : (pageValue || "1"));
  
  // Parse page size from URL or use default
  const pageSizeOptions = [10, 25, 50, 100];
  let pageSize = 10; // Default
  
  if (pageSizeValue) {
    const parsedSize = parseInt(Array.isArray(pageSizeValue) ? pageSizeValue[0] : pageSizeValue);
    if (!isNaN(parsedSize) && pageSizeOptions.includes(parsedSize)) {
      pageSize = parsedSize;
    }
  }

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
    
  // validate sortOrder - ensure it's either asc or desc
  const resolvedSortOrder = sortOrder === "desc" ? "desc" : "asc";

  const whereClause = {
    status: resolvedStatus as Status,
  };

  const issues = await prisma.issue.findMany({
    where: whereClause,
    orderBy: {
      [resolvedOrderBy]: resolvedSortOrder,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      assignedToUser: true,
    },
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
        pageSizeOptions={[10, 25, 50, 100]}
      />
    </Flex>
  );
};

export default IssuesPage;
export const metadata: Metadata = {
  title: "Issue Tracker - Issue",
  description: "View all project issues",
};
