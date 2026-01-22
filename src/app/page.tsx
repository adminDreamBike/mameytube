import VideoGrid from "@/components/VideoList/VideoGrid";
import ErrorDisplay from "@/components/ErrorDisplay";
import { getVideo } from "@/lib/api/video";

async function getInitialVideos() {
  try {
    const response = await getVideo({});
    return { data: response?.data, error: null };
  } catch (error) {
    const err = error as { message?: string; response?: { status?: number; data?: unknown }; status?: number };
    console.error('Failed to fetch initial videos:', error);
    return {
      data: null,
      error: {
        message: err?.message || 'Failed to load videos',
        status: err?.response?.status || err?.status,
        details: err?.response?.data || err,
      }
    };
  }
}

export const revalidate = 3000;

export default async function Home() {
  const { data: initialVideos, error } = await getInitialVideos();

  if (error) {
    return (
      <div className="gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <ErrorDisplay
            error={error}
            title="Unable to Load Videos"
          />
        </main>
      </div>
    );
  }

  return (
    <div className="  gap-16  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <VideoGrid videos={initialVideos} />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
