"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/services/projectService";
import { youtubeService } from "@/services/youtubeService";
import { transcriptService } from "@/services/transcriptService";
import { notesService } from "@/services/notesService";
import type { CreateProjectRequest } from "@/lib/types";

// ============================================================
// Query Keys
// ============================================================

export const queryKeys = {
  projects: ["projects"] as const,
  project: (id: string) => ["projects", id] as const,
  transcript: (id: string) => ["transcript", id] as const,
  notes: (id: string) => ["notes", id] as const,
};

// ============================================================
// Projects
// ============================================================

export function useProjects() {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: () => projectService.listProjects(),
    staleTime: 1000 * 60 * 2,
  });
}

export function useProject(projectId: string) {
  return useQuery({
    queryKey: queryKeys.project(projectId),
    queryFn: () => projectService.getProject(projectId),
    enabled: Boolean(projectId),
    retry: 2,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProjectRequest) =>
      projectService.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });
    },
  });
}

// ============================================================
// YouTube Processing
// ============================================================

export function useProcessYoutube() {
  return useMutation({
    mutationFn: ({ url, speed }: { url: string; speed?: number }) =>
      youtubeService.processYoutube({ url, speed }),
    retry: 0,
  });
}

export function useYoutubeStatus(projectId: string | null) {
  return useQuery({
    queryKey: ["youtubeStatus", projectId],
    queryFn: () => youtubeService.checkStatus(projectId!),
    enabled: Boolean(projectId),
    refetchInterval: (query) => {
      const status = query.state?.data?.status;
      if (status === "completed" || status === "error") {
        return false; // Stop polling
      }
      return 3000; // Poll every 3 seconds
    },
  });
}

// ============================================================
// Transcript
// ============================================================

export function useTranscript(projectId: string) {
  return useQuery({
    queryKey: queryKeys.transcript(projectId),
    queryFn: () => transcriptService.getTranscript(projectId),
    enabled: Boolean(projectId),
    retry: 2,
    staleTime: 1000 * 60 * 10,
  });
}

// ============================================================
// Notes
// ============================================================

export function useNotes(projectId: string) {
  return useQuery({
    queryKey: queryKeys.notes(projectId),
    queryFn: () => notesService.getNotes(projectId),
    enabled: Boolean(projectId),
    retry: 2,
    staleTime: 1000 * 60 * 10,
  });
}
