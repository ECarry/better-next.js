"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PostGetMany } from "../../types";

export const columns: ColumnDef<PostGetMany[number]>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
];
