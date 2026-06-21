import getApiClient from "./api";

// ============================================================
// Notes Service
// ============================================================

export const notesService = {
  /**
   * Get generated notes for a project
   * GET /notes/{projectId}
   */
  async getNotes(projectId: string): Promise<string> {
    const client = getApiClient();
    const response = await client.get<string>(`/notes/${projectId}`);
    // Backend returns raw markdown text
    if (typeof response.data === "string") {
      return response.data;
    }
    return JSON.stringify(response.data, null, 2);
  },
};
