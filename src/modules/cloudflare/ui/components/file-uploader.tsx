/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

interface FileUploaderProps {
  onUploadSuccess?: (key: string) => void;
}

const FileUploader = ({ onUploadSuccess }: FileUploaderProps) => {
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
      onSuccess: async (data, variables) => {
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const progressCompleted = (event.loaded / event.total) * 100;
              setFiles((prev) =>
                prev.map((f) =>
                  f.file.name === variables.filename
                    ? {
                        ...f,
                        progress: Math.round(progressCompleted),
                        key: data.key,
                      }
                    : f
                )
              );
            }
          };

          xhr.onload = () => {
            if (xhr.status === 200 || xhr.status === 204) {
              setFiles((prev) =>
                prev.map((f) =>
                  f.file.name === variables.filename
                    ? {
                        ...f,
                        uploading: false,
                        progress: 100,
                        error: false,
                      }
                    : f
                )
              );

              toast.success("File uploaded successfully");
              resolve();
              onUploadSuccess?.(data.key);
            } else {
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          };

          xhr.onerror = () => {
            setFiles((prev) =>
              prev.map((f) =>
                f.file.name === variables.filename
                  ? {
                      ...f,
                      uploading: false,
                      error: true,
                      progress: 0,
                    }
                  : f
              )
            );
            toast.error("Upload failed");
            reject(new Error("Upload failed"));
          };

          xhr.open("PUT", data.presignedUrl);
          xhr.setRequestHeader("Content-Type", variables.contentType);
          xhr.send(files[0].file);
        });
      },
      onError: (_error, variables) => {
        setFiles((prev) =>
          prev.map((f) =>
            f.file.name === variables.filename
              ? { ...f, uploading: false, progress: 0, error: true }
              : f
          )
        );
        toast.error("Failed to generate presigned URL");
      },
    })
  );

  const deleteFileMutation = useMutation(
    trpc.cloudflare.deleteFile.mutationOptions({
      onSuccess: () => {
        toast.success("File deleted successfully");
        setFiles((prev) => prev.filter((f) => !f.isDeleting));
      },
      onError: () => {
        toast.error("Failed to delete file");
      },
    })
  );

  const uploadFile = useCallback(
    (file: File) => {
      setFiles((prev) =>
        prev.map((f) => (f.file === file ? { ...f, uploading: true } : f))
      );

      createPresignedUrlMutation.mutate({
        filename: file.name,
        contentType: file.type,
        size: file.size,
      });
    },
    [createPresignedUrlMutation]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
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
    },
    [uploadFile]
  );

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

  const handleDeleteFile = useCallback(
    (key: string | undefined) => {
      if (!key) {
        return;
      }
      setFiles((prev) => {
        const fileToDelete = prev.find((f) => f.key === key);
        if (fileToDelete?.objectUrl) {
          URL.revokeObjectURL(fileToDelete.objectUrl);
        }
        return prev.map((f) =>
          f.key === key ? { ...f, isDeleting: true, objectUrl: undefined } : f
        );
      });
      deleteFileMutation.mutate({ key });
    },
    [deleteFileMutation]
  );

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
                    onClick={() => handleDeleteFile(file.key)}
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
