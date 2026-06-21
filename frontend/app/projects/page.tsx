"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Youtube,
  Mic,
  Video,
  FileText,
  ArrowRight,
  Trash2,
  ExternalLink,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateProject } from "@/hooks/useApi";
import { useAppStore } from "@/store/useAppStore";
import { useToast } from "@/hooks/useToast";
import { ProjectCardSkeleton } from "@/components/shared/Skeleton";
import type { Project } from "@/lib/types";
import { formatDate } from "@/lib/utils";

// ============================================================
// Source type icons helper
// ============================================================

function SourceIcon({ type }: { type: string }) {
  switch (type?.toLowerCase()) {
    case "youtube":
      return <Youtube className="w-4 h-4 text-red-400" />;
    case "audio":
      return <Mic className="w-4 h-4 text-cyan-400" />;
    case "video":
      return <Video className="w-4 h-4 text-blue-400" />;
    default:
      return <FileText className="w-4 h-4 text-muted-foreground" />;
  }
}

// ============================================================
// Project Card
// ============================================================

function ProjectCard({
  project,
  onDelete,
}: {
  project: Project;
  onDelete: (id: string) => void;
}) {
  const statusVariant =
    project.status === "completed"
      ? "success"
      : project.status === "failed"
      ? "destructive"
      : project.status === "processing"
      ? "processing"
      : "default";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="glass-card-hover p-5 flex flex-col gap-4 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0">
            <SourceIcon type={project.source_type} />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-sm text-foreground truncate">
              {project.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate font-mono">
              {project.id}
            </p>
          </div>
        </div>
        <Badge variant={statusVariant as "default" | "success" | "destructive" | "processing"} className="shrink-0">
          {project.status}
        </Badge>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <SourceIcon type={project.source_type} />
          {project.source_type}
        </span>
        {project.created_at && (
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(project.created_at)}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1 border-t border-border/50">
        <Link href={`/transcript/${project.id}`} className="flex-1">
          <Button variant="secondary" size="sm" className="w-full gap-1.5 text-xs">
            <FileText className="w-3.5 h-3.5" />
            Transcript
          </Button>
        </Link>
        <Link href={`/notes/${project.id}`} className="flex-1">
          <Button variant="default" size="sm" className="w-full gap-1.5 text-xs">
            Notes
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
          onClick={() => onDelete(project.id)}
          aria-label="Delete project"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </motion.div>
  );
}

// ============================================================
// Create Project Modal
// ============================================================

function CreateProjectModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [sourceType, setSourceType] = useState("youtube");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const { mutateAsync: createProject, isPending } = useCreateProject();
  const { addLocalProject } = useAppStore();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const result = await createProject({
        title: title.trim(),
        source_type: sourceType,
        youtube_url: sourceType === "youtube" ? youtubeUrl : undefined,
      });

      const newProject: Project = {
        id: result.id,
        title: result.title,
        source_type: result.source_type,
        status: result.status,
        youtube_url: youtubeUrl || undefined,
        created_at: new Date().toISOString(),
      };
      addLocalProject(newProject);

      toast({
        title: "Project created!",
        description: `"${result.title}" has been created successfully.`,
        variant: "success" as "default",
      });

      setTitle("");
      setSourceType("youtube");
      setYoutubeUrl("");
      onClose();
    } catch (error) {
      toast({
        title: "Failed to create project",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Start a new lecture processing project.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              placeholder="e.g., Machine Learning Lecture 4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="source-type">Source Type</Label>
            <Select value={sourceType} onValueChange={setSourceType}>
              <SelectTrigger id="source-type">
                <SelectValue placeholder="Select source type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="youtube">YouTube Video</SelectItem>
                <SelectItem value="audio">Audio Recording</SelectItem>
                <SelectItem value="video">Video File</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {sourceType === "youtube" && (
            <div className="space-y-1.5">
              <Label htmlFor="youtube-url">YouTube URL</Label>
              <Input
                id="youtube-url"
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
            </div>
          )}

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !title.trim()}>
              {isPending ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================
// Projects Page
// ============================================================

const filterOptions = ["All", "youtube", "audio", "video"];
const statusOptions = ["All", "created", "processing", "completed", "failed"];

export default function ProjectsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const { localProjects, removeLocalProject } = useAppStore();

  const filtered = localProjects.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchType =
      filterType === "All" || p.source_type === filterType;
    const matchStatus =
      filterStatus === "All" || p.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <DashboardLayout title="Projects">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Projects</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {localProjects.length} project
              {localProjects.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button
            onClick={() => setShowCreate(true)}
            className="gap-2 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-36">
                <Filter className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card p-16 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-muted mx-auto flex items-center justify-center mb-4">
                <FolderEmpty />
              </div>
              <p className="font-semibold text-foreground">No projects found</p>
              <p className="text-sm text-muted-foreground mt-1 mb-5">
                {localProjects.length === 0
                  ? "Create your first project to get started"
                  : "Try adjusting your search or filters"}
              </p>
              {localProjects.length === 0 && (
                <Button onClick={() => setShowCreate(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Project
                </Button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <AnimatePresence>
                {filtered.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onDelete={removeLocalProject}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <CreateProjectModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
      />
    </DashboardLayout>
  );
}

function FolderEmpty() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-muted-foreground"
    >
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    </svg>
  );
}
