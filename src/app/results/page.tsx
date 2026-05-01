"use client";

import VideoGridSkeleton from "@/components/VideoList/VideoGridSkeleton";
import SearchPageContent from "@components/SearchPage/SearchPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<VideoGridSkeleton count={6} />}>
      <SearchPageContent />
    </Suspense>
  );
}
