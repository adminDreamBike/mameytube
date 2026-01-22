import axios, { AxiosError } from "axios";

const apiClient = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 403) {
      const errorData = error.response.data as { error?: { message?: string } } | undefined;
      const errorMessage = errorData?.error?.message || 'Access forbidden';

      console.error('YouTube API 403 Error:', {
        message: errorMessage,
        status: error.response.status,
        url: error.config?.url,
        possibleCauses: [
          '1. API key restrictions (HTTP referrer not allowed)',
          '2. YouTube Data API v3 not enabled',
          '3. API key quota exceeded',
          '4. Invalid API key',
        ],
        apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY ? 'Set' : 'Missing',
        environment: process.env.NODE_ENV,
      });

      // Create enhanced error with helpful message
      const enhancedError = Object.assign(
        new Error(
          `YouTube API 403 Error: ${errorMessage}\n\n` +
          'Possible causes:\n' +
          '- API key restrictions: Check Google Cloud Console to allow your domain\n' +
          '- YouTube Data API v3 not enabled for this key\n' +
          '- Daily quota exceeded (default: 10,000 units/day)\n' +
          '- API key not set in environment variables\n\n' +
          'Check console for more details.'
        ),
        {
          response: error.response,
          status: 403,
          originalError: error,
        }
      );

      throw enhancedError;
    }

    if (error.response?.status === 400) {
      console.error('YouTube API 400 Error:', {
        message: 'Bad request - check API parameters',
        url: error.config?.url,
        params: error.config?.params,
      });
    }

    throw error;
  }
);

export default apiClient;
