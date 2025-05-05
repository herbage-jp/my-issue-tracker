"use client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface PageSizeSelectorProps {
  currentPageSize: number;
  options: number[];
}

const PageSizeSelector = ({ currentPageSize, options }: PageSizeSelectorProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageSizeChange = (newSize: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageSize", newSize);
    // Reset to page 1 when changing page size to avoid being on an invalid page
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <Select.Root
      defaultValue={currentPageSize.toString()}
      onValueChange={handlePageSizeChange}
    >
      <Select.Trigger />
      <Select.Content>
        {options.map((size) => (
          <Select.Item key={size} value={size.toString()}>
            {size} per page
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default PageSizeSelector;
