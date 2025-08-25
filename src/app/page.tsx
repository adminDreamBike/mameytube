import VideoGrid from "@/components/VideoList/VideoGrid";
import { getVideo } from "@/lib/api/video";

async function getInitialVideos() {
  const response = await getVideo({});
  return response?.data;
}

export const revalidate = 3000;

export default async function Home() {
  const initialVideos = await getInitialVideos();

  return (
    <div className="  gap-16  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <VideoGrid videos={initialVideos} />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
