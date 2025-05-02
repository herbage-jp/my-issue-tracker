import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@/app/generated/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: { status?: string; orderBy?: string };
}

const IssuesPage = async ({ searchParams }: PageProps) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status" },
    { label: "Created", value: "createdAt" },
  ];

  const resolvedParams = await searchParams;
  const status = resolvedParams?.status;
  const orderBy = resolvedParams?.orderBy;

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

  const issues = await prisma.issue.findMany({
    where: {
      status: resolvedStatus as Status,
    },
    orderBy: {
      [resolvedOrderBy]: "asc",
    },
  });

  return (
    <div>
      <IssueActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <Link
                  href={{
                    query: { ...resolvedParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                  {resolvedOrderBy === column.value ? (
                    <ArrowUpIcon className="inline ml-1" />
                  ) : null}
                </Link>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
