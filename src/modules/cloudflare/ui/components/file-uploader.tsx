/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

const FileUploader = () => {
  const [files, setFiles] = useState<
    Array<{
      id: string;
      file: File;
      uploading: boolean;
      progress: number;
      key?: string;
      isDeleting: boolean;
      error: boolean;
      objectUrl?: string;
    }>
  >([]);
  const trpc = useTRPC();
  const createPresignedUrlMutation = useMutation(
    trpc.cloudflare.createPresignedUrl.mutationOptions({
      onSuccess: (data, variables) => {
        console.log(data, variables);
      },
      onError: (error, variables) => {
        console.log(error, variables);
        setFiles((prev) =>
          prev.map((f) =>
            f.file.name === variables.filename
              ? { ...f, uploading: false, progress: 0, error: true }
              : f
          )
        );
      },
    })
  );

  const uploadFile = (file: File) => {
    setFiles((prev) =>
      prev.map((f) => (f.file === file ? { ...f, uploading: true } : f))
    );

    createPresignedUrlMutation.mutate({
      filename: file.name,
      contentType: file.type,
      size: file.size,
    });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    if (acceptedFiles.length > 0) {
      setFiles((prev) => [
        ...prev,
        ...acceptedFiles.map((file) => ({
          id: crypto.randomUUID(),
          file,
          uploading: false,
          progress: 0,
          isDeleting: false,
          error: false,
          objectUrl: URL.createObjectURL(file),
        })),
      ]);
    }

    acceptedFiles.forEach(uploadFile);
  }, []);

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      const tooManyFiles = fileRejections.find(
        (fileRejection) => fileRejection.errors[0].code === "too-many-files"
      );

      const fileInvalidType = fileRejections.find(
        (fileRejection) => fileRejection.errors[0].code === "file-invalid-type"
      );

      if (tooManyFiles) {
        toast.error("Too many files");
      }

      if (fileInvalidType) {
        toast.error("File type is not supported");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 1,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={cn(
          "border border-dashed border-gray-300 p-4 cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-center duration-200 rounded-md",
          isDragActive && "border-gray-500"
        )}
      >
        <input {...getInputProps()} accept="image/*" />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>Drag &apos;n&apos; drop some file here, or click to select file</p>
        )}
      </div>
      {files.length > 0 && (
        <div className="mt-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between mb-2"
            >
              <div className="flex items-center">
                <img
                  src={file.objectUrl}
                  alt="Preview"
                  className="w-16 h-16 object-cover mr-2"
                />
                <div>
                  <p className="font-semibold">{file.file.name}</p>
                  <p className="text-sm text-gray-500">
                    {file.file.size} bytes
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                {file.uploading ? (
                  <div className="flex items-center">
                    <p className="mr-2">Uploading...</p>
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {}}
                    type="button"
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FileUploader;
