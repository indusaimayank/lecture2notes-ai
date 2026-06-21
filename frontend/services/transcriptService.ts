import getApiClient from "./api";

// ============================================================
// Transcript Service
// ============================================================

export const transcriptService = {
  /**
   * Get transcript for a project
   * GET /transcript/{projectId}
   */
  async getTranscript(projectId: string): Promise<string> {
    const client = getApiClient();
    const response = await client.get<string>(`/transcript/${projectId}`);
    // Backend returns raw text or JSON string
    if (typeof response.data === "string") {
      return response.data;
    }
    return JSON.stringify(response.data, null, 2);
  },
};
