/* eslint-disable @next/next/no-img-element */
"use client";

import { useTRPC } from "@/trpc/client";
import { usePostsFilters } from "../../hooks/use-posts-filters";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import { keyToImage } from "@/lib/keyToImage";

export const PostsView = () => {
  const trpc = useTRPC();
  const [filters] = usePostsFilters();

  const { data } = useSuspenseQuery(
    trpc.posts.getMany.queryOptions({ ...filters })
  );

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-8 max-w-7xl mx-auto">
      {data.items.map((post) => (
        <div
          key={post.id}
          className="group overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {/* Cover Image Section */}

          <img
            src={keyToImage(post.coverImageKey)}
            alt={post.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Content Section */}
          <div className="p-6">
            {/* Category Tag */}
            <div className="mb-3">
              <span className="inline-block px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full uppercase tracking-wide">
                BLOG
              </span>
            </div>

            {/* Title */}
            <h2 className="mb-3 text-xl font-bold leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
              <Link href={`/posts/${post.slug}`} className="block">
                {post.title}
              </Link>
            </h2>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed line-clamp-3">
              {post.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
