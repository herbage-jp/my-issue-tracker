import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { Status } from "./generated/prisma";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSammary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issues", value: open, status: Status.OPEN },
    {
      label: "In Progress Issues",
      value: inProgress,
      status: Status.IN_PROGRESS,
    },
    { label: "Closed Issues", value: closed, status: Status.CLOSED },
  ];

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.status}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues/list?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" weight="bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSammary;
