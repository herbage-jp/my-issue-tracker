"use client";
import Skeleton from "@/app/components/Skeleton";
import { Issue, User } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  const onSelectUserChanged = (value: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: value === "null" ? null : value,
      })
      .catch(() => {
        toast.error("Failed to assign issue");
      });
  };

  return (
    <>
      <Select.Root
        onValueChange={onSelectUserChanged}
        defaultValue={issue.assignedToUserId || "null"}
      >
        <Select.Trigger placeholder="Assign..."></Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="null">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });
};

export default AssigneeSelect;
