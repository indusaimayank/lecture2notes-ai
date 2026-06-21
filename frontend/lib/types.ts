// ============================================================
// Core Project Types
// ============================================================

export interface Project {
  id: string;
  title: string;
  source_type: "youtube" | "audio" | "video" | string;
  status: "created" | "processing" | "completed" | "failed" | string;
  youtube_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProjectRequest {
  title: string;
  source_type: string;
  youtube_url?: string;
}

export interface ProjectResponse {
  id: string;
  title: string;
  source_type: string;
  status: string;
}

// ============================================================
// YouTube Types
// ============================================================

export interface YouTubeRequest {
  url: string;
  speed?: number;
}

export interface YouTubeProcessResponse {
  status: string;
  data: {
    project_id: string;
    audio_status: string;
    title?: string;
    duration?: number;
  };
}

// ============================================================
// Transcript Types
// ============================================================

export interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
  speaker?: string;
}

export interface TranscriptData {
  project_id: string;
  segments?: TranscriptSegment[];
  text?: string;
  language?: string;
  duration?: number;
}

// ============================================================
// Notes Types
// ============================================================

export interface NotesData {
  project_id: string;
  content: string;
  generated_at?: string;
}

// ============================================================
// API Response Wrappers
// ============================================================

export interface ApiError {
  detail: string;
  status_code?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
}

// ============================================================
// Settings Types
// ============================================================

export interface AppSettings {
  backendUrl: string;
  theme: "dark" | "light" | "system";
  language: string;
}
