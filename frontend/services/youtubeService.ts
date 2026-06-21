import getApiClient from "./api";
import type { YouTubeRequest, YouTubeProcessResponse } from "@/lib/types";

// ============================================================
// YouTube Service
// ============================================================

export const youtubeService = {
  /**
   * Process a YouTube URL (Starts background task)
   * POST /youtube/process
   */
  async processYoutube(
    data: YouTubeRequest
  ): Promise<{ status: string; message: string; project_id: string }> {
    const client = getApiClient();
    const response = await client.post<{ status: string; message: string; project_id: string }>(
      "/youtube/process",
      data
    );
    return response.data;
  },

  /**
   * Check status of a background task
   * GET /youtube/status/{project_id}
   */
  async checkStatus(
    projectId: string
  ): Promise<{ status: string; message: string; result?: any }> {
    const client = getApiClient();
    const response = await client.get<{ status: string; message: string; result?: any }>(
      `/youtube/status/${projectId}`
    );
    return response.data;
  },
};
