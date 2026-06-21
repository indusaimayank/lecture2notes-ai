import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Project, AppSettings } from "@/lib/types";

// ============================================================
// App Store – Global State
// ============================================================

interface AppStore {
  // Currently selected/active project
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;

  // Current transcript content
  currentTranscript: string | null;
  setCurrentTranscript: (transcript: string | null) => void;

  // Current notes content
  currentNotes: string | null;
  setCurrentNotes: (notes: string | null) => void;

  // Sidebar collapsed state
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;

  // App settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;

  // Local projects cache
  localProjects: Project[];
  addLocalProject: (project: Project) => void;
  removeLocalProject: (projectId: string) => void;
  clearLocalProjects: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      selectedProject: null,
      setSelectedProject: (project) => set({ selectedProject: project }),

      currentTranscript: null,
      setCurrentTranscript: (transcript) =>
        set({ currentTranscript: transcript }),

      currentNotes: null,
      setCurrentNotes: (notes) => set({ currentNotes: notes }),

      sidebarCollapsed: false,
      setSidebarCollapsed: (collapsed) =>
        set({ sidebarCollapsed: collapsed }),
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      settings: {
        backendUrl: "http://localhost:8000",
        theme: "dark",
        language: "en",
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      localProjects: [],
      addLocalProject: (project) =>
        set((state) => ({
          localProjects: [
            project,
            ...state.localProjects.filter((p) => p.id !== project.id),
          ],
        })),
      removeLocalProject: (projectId) =>
        set((state) => ({
          localProjects: state.localProjects.filter((p) => p.id !== projectId),
        })),
      clearLocalProjects: () => set({ localProjects: [] }),
    }),
    {
      name: "lecture2notes-store",
      partialize: (state) => ({
        selectedProject: state.selectedProject,
        sidebarCollapsed: state.sidebarCollapsed,
        settings: state.settings,
        localProjects: state.localProjects,
      }),
    }
  )
);
