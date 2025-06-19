"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircle } from "lucide-react";
import { NewPostDialog } from "./new-post-dialog";
import { usePostsFilters } from "../../hooks/use-posts-filters";
import { DEFAULT_PAGE } from "@/constants";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PostsSearchFilter } from "./posts-search-filter";

export const PostsListHeader = () => {
  const [filters, setFilters] = usePostsFilters();
  const [open, setOpen] = useState(false);

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <>
      <NewPostDialog open={open} onOpenChange={setOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl">Posts</h1>
          <Button onClick={() => setOpen(true)}>
            <PlusIcon />
            New Post
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <PostsSearchFilter />
            {isAnyFilterModified && (
              <Button onClick={onClearFilters} variant="outline" size="sm">
                <XCircle />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};
