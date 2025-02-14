import { trpc } from "@/trpc/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ postSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = (await params).postSlug;

  console.log({ slug });

  // fetch data
  const post = await trpc.posts.getOne({ slug });

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function Page({ params }: Props) {
  const slug = (await params).postSlug;

  return <div>{slug}</div>;
}
