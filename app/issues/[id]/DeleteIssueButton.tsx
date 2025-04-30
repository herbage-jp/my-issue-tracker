"use client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red"> Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Delete Issue</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue?
        </AlertDialog.Description>
        <Flex className="mt-4" gap="2">
          <AlertDialog.Cancel>
            <Button variant="soft">Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red">Delete</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
