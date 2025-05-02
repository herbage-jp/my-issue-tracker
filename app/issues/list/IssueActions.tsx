import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { Flex } from "@radix-ui/themes";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = () => {
  return (
    <Flex mb="5" justify="between">
      <IssueStatusFilter />
      <Button>
        <Link href={"/issues/new"}>New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
