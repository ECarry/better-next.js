import { s3Client } from "@/lib/s3";
import { adminProcedure, createTRPCRouter } from "@/trpc/init";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { TRPCError } from "@trpc/server";
import { cache } from "react";
import { z } from "zod";

/**
 * Generate a public URL for accessing uploaded photos
 * Uses React cache to memoize results and improve performance
 * @param filename - The name of the uploaded file
 * @param folder - The folder where the file is stored
 * @returns The complete public URL for accessing the file
 * @throws Error if CLOUDFLARE_R2_PUBLIC_URL is not configured
 */
const getPublicUrl = cache((filename: string, folder: string) => {
  const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;
  if (!publicUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "CLOUDFLARE_R2_PUBLIC_URL is not configured",
    });
  }
  return `${publicUrl}/${folder}/${filename}`;
});

export const cloudflareRouter = createTRPCRouter({
  createPresignedUrl: adminProcedure
    .input(
      z.object({
        filename: z.string(),
        folder: z.string().default("photos"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { filename, folder } = input;
        const key = `${folder}/${filename}`;

        const command = new PutObjectCommand({
          Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
          Key: key,
        });

        const signedUrl = await getSignedUrl(s3Client, command, {
          expiresIn: 60 * 60,
        });
        const publicUrl = getPublicUrl(filename, folder);

        return {
          signedUrl,
          publicUrl,
          key,
        };
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate upload URL",
        });
      }
    }),
});
