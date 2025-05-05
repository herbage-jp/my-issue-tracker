"use client";
import { Issue } from "@/app/generated/prisma";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import IssueDetails from "./IssueDetails";
import AssigneeSelect from "./AssigneeSelect";
import StatusSelect from "./StatusSelect";
import EditIssueButton from "./EditIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";
import Skeleton from "@/app/components/Skeleton";

interface IssueDetailClientProps {
  initialIssue: Issue;
  showEditOptions: boolean;
}

const IssueDetailClient = ({ initialIssue, showEditOptions }: IssueDetailClientProps) => {
  // Use React Query to fetch the latest issue data
  const { data: issue, isLoading } = useQuery({
    queryKey: [`issue-${initialIssue.id}`],
    queryFn: () => axios.get<Issue>(`/api/issues/${initialIssue.id}`).then(res => res.data),
    initialData: initialIssue,
    staleTime: 0, // Always refetch when invalidated
  });

  if (isLoading) return <Skeleton />;

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="4">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        {showEditOptions && (
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <StatusSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        )}
      </Box>
    </Grid>
  );
};

export default IssueDetailClient;
