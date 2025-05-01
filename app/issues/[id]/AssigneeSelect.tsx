"use client";
import { User } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React from "react";

const AssigneeSelect = () => {
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get<User[]>("/api/users");
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..."></Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
