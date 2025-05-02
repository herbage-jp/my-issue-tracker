import LatestIssues from "./issues/LatestIssues";
import IssueSammary from "./IssueSammary";
import { prisma } from "@/prisma/client";
import { Status } from "./generated/prisma";
import IssueChart from "./IssueChart";

export default async function Home() {
  const openIssuesCount = await prisma.issue.count({
    where: {
      status: Status.OPEN,
    },
  });
  const inProgressIssuesCount = await prisma.issue.count({
    where: {
      status: Status.IN_PROGRESS,
    },
  });
  const closedIssuesCount = await prisma.issue.count({
    where: {
      status: Status.CLOSED,
    },
  });
  return (
    <>
      <LatestIssues />
      <IssueSammary
        open={openIssuesCount}
        inProgress={inProgressIssuesCount}
        closed={closedIssuesCount}
      />
      <IssueChart
        open={openIssuesCount}
        inProgress={inProgressIssuesCount}
        closed={closedIssuesCount}
      />
    </>
  );
}
