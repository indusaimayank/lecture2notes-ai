import getApiClient from "./api";
import type {
  CreateProjectRequest,
  ProjectResponse,
  Project,
} from "@/lib/types";

// ============================================================
// Project Service
// ============================================================

export const projectService = {
  /**
   * Create a new project
   * POST /projects/
   */
  async createProject(data: CreateProjectRequest): Promise<ProjectResponse> {
    const client = getApiClient();
    const response = await client.post<ProjectResponse>("/projects/", data);
    return response.data;
  },

  /**
   * Get a project by ID
   * GET /projects/{projectId}
   */
  async getProject(projectId: string): Promise<Project> {
    const client = getApiClient();
    const response = await client.get<Project>(`/projects/${projectId}`);
    return response.data;
  },

  /**
   * List all projects (mock – backend doesn't have a list endpoint yet)
   * Falls back to local storage
   */
  async listProjects(): Promise<Project[]> {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("l2n_projects");
    if (!stored) return [];
    try {
      return JSON.parse(stored) as Project[];
    } catch {
      return [];
    }
  },

  /**
   * Save project to local storage (after creation)
   */
  saveProjectLocally(project: Project): void {
    if (typeof window === "undefined") return;
    const existing = JSON.parse(
      localStorage.getItem("l2n_projects") || "[]"
    ) as Project[];
    const updated = [project, ...existing.filter((p) => p.id !== project.id)];
    localStorage.setItem("l2n_projects", JSON.stringify(updated));
  },

  /**
   * Delete project from local store
   */
  deleteProjectLocally(projectId: string): void {
    if (typeof window === "undefined") return;
    const existing = JSON.parse(
      localStorage.getItem("l2n_projects") || "[]"
    ) as Project[];
    const updated = existing.filter((p) => p.id !== projectId);
    localStorage.setItem("l2n_projects", JSON.stringify(updated));
  },
};
