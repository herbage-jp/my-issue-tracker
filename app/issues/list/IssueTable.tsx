import { IssueStatusBadge } from "@/app/components";
import { Issue, User } from "@/app/generated/prisma";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import { Avatar, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface IssueWithUser extends Issue {
  assignedToUser?: User | null;
}

export interface IssueQuery {
  status?: string;
  orderBy?: string;
  sortOrder?: string;
  page?: string;
}

interface IssueTableProps {
  issues: IssueWithUser[];
  searchParams: IssueQuery;
}

const IssueTable = ({ issues, searchParams }: IssueTableProps) => {
  return (
    <Table.Root variant="surface" className="[--table-cell-padding:var(--space-2)]">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <Link
                href={{
                  query: { 
                    ...searchParams, 
                    orderBy: column.value,
                    sortOrder: searchParams.orderBy === column.value && searchParams.sortOrder !== 'desc' ? 'desc' : 'asc'
                  },
                }}
              >
                {column.label}
                {searchParams.orderBy === column.value ? (
                  searchParams.sortOrder === 'desc' ? (
                    <ArrowDownIcon className="inline ml-1" />
                  ) : (
                    <ArrowUpIcon className="inline ml-1" />
                  )
                ) : null}
              </Link>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell className="align-middle">
              <div className="flex flex-col justify-center">
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell align-middle">
              <div className="flex items-center">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell align-middle">
              <div className="flex items-center">
                {issue.createdAt.toDateString()}
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell align-middle">
              <div className="flex items-center">
                {issue.assignedToUser ? (
                  <Avatar
                    src={issue.assignedToUser.image || undefined}
                    fallback={issue.assignedToUser.name?.[0] || '?'}
                    size="1"
                    radius="full"
                    title={issue.assignedToUser.name || 'Assigned user'}
                  />
                ) : (
                  // Empty placeholder with same dimensions
                  <div className="w-4 h-4"></div>
                )}
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  { label: "Assignee", value: "assignedToUserId", className: "hidden md:table-cell" },
];

export default IssueTable;
