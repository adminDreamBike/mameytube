import VideoGrid from "@components/VideoList/VideoGrid";
import ErrorDisplay from "@components/ErrorDisplay";
import { getVideo } from "@lib/api/video";
import { Metadata } from "next";

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

export async function generateMetadata(): Promise<Metadata> {
  const videos = await getVideo({})
  const firstVideo = videos.data.items[0];
  const totalCount = videos.data.items.length ?? 0;

  return {
    title: firstVideo.snippet.title ?  `${firstVideo.snippet.title} - MammeyTube` : 'MammeyTube Videos',
    description: `Explore ${totalCount} videos on our platform`,
    openGraph: {
      title: firstVideo?.snippet.title ?? 'MammeyTube',
      description: `Browse ${totalCount} videos`,
      images: firstVideo?.snippet.thumbnails ? [{url: firstVideo.snippet.thumbnails?.high?.url, width: '100%', height: '100%' }] : []
    },
    twitter: {
      card: 'summary_large_image',
      title: firstVideo?.snippet.title ?? 'MammeyTube',
      images: firstVideo?.snippet.thumbnails ? [{url: firstVideo.snippet.thumbnails?.high?.url, width: '100%', height: '100%' }] : []
    }
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
    </div>
  );
}
