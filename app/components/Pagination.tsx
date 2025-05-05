"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageSizeSelector from "./PageSizeSelector";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
  pageSizeOptions?: number[];
}

const Pagination = ({ itemCount, pageSize, currentPage, pageSizeOptions = [10, 25, 50, 100] }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(itemCount / pageSize);

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Flex align="center" gap="2" justify="between" width="100%">
      {pageCount > 1 ? (
        <Flex align="center" gap="2">
          <Text size="2">
            Page {currentPage} of {pageCount}
          </Text>
          <Button
            color="gray"
            variant="soft"
            disabled={currentPage === 1}
            onClick={() => changePage(1)}
          >
            <DoubleArrowLeftIcon />
          </Button>
          <Button
            color="gray"
            variant="soft"
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            color="gray"
            variant="soft"
            disabled={currentPage === pageCount}
            onClick={() => changePage(currentPage + 1)}
          >
            <ChevronRightIcon />
          </Button>
          <Button
            color="gray"
            variant="soft"
            disabled={currentPage === pageCount}
            onClick={() => changePage(pageCount)}
          >
            <DoubleArrowRightIcon />
          </Button>
        </Flex>
      ) : (
        <div>{/* Empty div to maintain flex layout when pagination is hidden */}</div>
      )}
      <PageSizeSelector currentPageSize={pageSize} options={pageSizeOptions} />
    </Flex>
  );
};

export default Pagination;
