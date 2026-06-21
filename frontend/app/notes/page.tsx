"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  ArrowRight,
  Plus,
  Clock,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";
import { formatDate } from "@/lib/utils";

export default function NotesIndexPage() {
  const { localProjects } = useAppStore();
  const completedProjects = localProjects.filter(
    (p) => p.status === "completed" || p.status === "created"
  );

  return (
    <DashboardLayout title="Notes">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Notes</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Browse generated notes from your projects
            </p>
          </div>
          <Link href="/upload/youtube">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New
            </Button>
          </Link>
        </div>

        {localProjects.length === 0 ? (
          <div className="glass-card p-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-muted mx-auto flex items-center justify-center mb-4">
              <FileText className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="font-semibold text-foreground">No notes yet</p>
            <p className="text-sm text-muted-foreground mt-1 mb-5">
              Process a lecture to generate notes
            </p>
            <Link href="/upload/youtube">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Process Lecture
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {localProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card-hover p-4 flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">
                    {project.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground font-mono truncate">
                      {project.id}
                    </span>
                    {project.created_at && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatDate(project.created_at)}
                      </span>
                    )}
                  </div>
                </div>
                <Link href={`/notes/${project.id}`}>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Open
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
