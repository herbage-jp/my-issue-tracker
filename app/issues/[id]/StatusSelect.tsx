"use client";
import { Issue, Status } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (status: Status) => {
      return axios.patch(`/api/issues/${issue.id}`, { status });
    },
    onSuccess: () => {
      // Invalidate and refetch any queries that depend on this issue
      queryClient.invalidateQueries({ queryKey: [`issue-${issue.id}`] });
      // Also invalidate the issues list if it exists
      queryClient.invalidateQueries({ queryKey: ['issues'] });
      toast.success("Status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update status");
    }
  });

  const onStatusChange = (value: string) => {
    mutation.mutate(value as Status);
  };

  return (
    <>
      <Select.Root
        onValueChange={onStatusChange}
        defaultValue={issue.status}
        disabled={mutation.isPending}
      >
        <Select.Trigger placeholder="Status..."></Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Status</Select.Label>
            <Select.Item value="OPEN">Open</Select.Item>
            <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
            <Select.Item value="CLOSED">Closed</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
