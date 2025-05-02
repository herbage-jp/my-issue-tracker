import Pagination from "@/app/components/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1");
  return <Pagination itemCount={100} pageSize={10} currentPage={page} />;
}
