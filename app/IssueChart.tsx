"use client";
import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import React from "react";

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

const IssueChart = ({ open, inProgress, closed, openLabel, inProgressLabel, closedLabel }: Props & LabelProps) => {
  const data = [
    { label: openLabel, value: open },
    { label: inProgressLabel, value: inProgress },
    { label: closedLabel, value: closed },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" barSize={60} fill="var(--accent-9)" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
