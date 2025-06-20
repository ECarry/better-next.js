"use client";

import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { usePostsFilters } from "../../hooks/use-posts-filters";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { DataPagination } from "@/components/data-pagination";

export const DashboardPostsView = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const [filters, setFilters] = usePostsFilters();

  const { data } = useSuspenseQuery(
    trpc.posts.getMany.queryOptions({ ...filters })
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        columns={columns}
        data={data.items}
        onRowClick={(row) => {
          router.push(`/dashboard/posts/${row.slug}`);
        }}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => {
          setFilters({ page });
        }}
      />
    </div>
  );
};
