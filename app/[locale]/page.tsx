import LatestIssues from "../issues/LatestIssues";
import IssueSammary from "../IssueSammary";
import { prisma } from "@/prisma/client";
import { Status } from "../generated/prisma";
import IssueChart from "../IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

import { getTranslation } from "../i18n/useTranslation";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslation(locale);

  const openIssuesCount = await prisma.issue.count({
    where: { status: Status.OPEN },
  });
  const inProgressIssuesCount = await prisma.issue.count({
    where: { status: Status.IN_PROGRESS },
  });
  const closedIssuesCount = await prisma.issue.count({
    where: { status: Status.CLOSED },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
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
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslation(locale);
  return {
    title: t('title'),
    description: t('description'),
  };
}
