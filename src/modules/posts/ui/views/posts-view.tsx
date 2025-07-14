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
          className="group overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          {/* Cover Image Section */}
          <div className="relative overflow-hidden">
            <img
              src={keyToImage(post.coverImageKey)}
              alt={post.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Status Badge */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
              <svg
                className="w-4 h-4 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

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

            {/* Read More Link */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link
                href={`/posts/${post.slug}`}
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Read more
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
