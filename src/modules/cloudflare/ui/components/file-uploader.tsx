"use client";

import { useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";

const FileUploader = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles);
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
    <div
      {...getRootProps()}
      className="border border-dashed border-gray-300 p-4 cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-center duration-200 rounded-md"
    >
      <input {...getInputProps()} accept="image/*" />
      {isDragActive ? (
        <p>Drop the file here ...</p>
      ) : (
        <p>Drag &apos;n&apos; drop some file here, or click to select file</p>
      )}
    </div>
  );
};

export default FileUploader;
