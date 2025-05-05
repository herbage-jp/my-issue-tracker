import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { Status } from "./generated/prisma";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

interface LabelProps {
  openLabel: string;
  inProgressLabel: string;
  closedLabel: string;
}

const IssueSammary = ({ open, inProgress, closed, openLabel, inProgressLabel, closedLabel }: Props & LabelProps) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: openLabel, value: open, status: Status.OPEN },
    { label: inProgressLabel, value: inProgress, status: Status.IN_PROGRESS },
    { label: closedLabel, value: closed, status: Status.CLOSED },
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
