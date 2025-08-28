"use client";

import SearchPageContent from "@/components/SearchPage/SearchPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
