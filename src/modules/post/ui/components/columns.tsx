"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { PostGetMany } from "../../types";

import { EyeIcon, MoreHorizontal, PencilIcon, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<PostGetMany[number]>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/posts/${row.original.slug}`}>
                <EyeIcon />
                View post
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PencilIcon />
              Edit post
            </DropdownMenuItem>
            <DropdownMenuItem>
              <TrashIcon />
              Delete post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
