"use client"; // Error boundaries must be Client Components

import Image from "next/image";

export default function Error() {
  return (
    <div className="flex items-center justify-center">
      <Image src="/error-loading.gif" alt="Error" width={480} height={360} />
    </div>
  );
}
