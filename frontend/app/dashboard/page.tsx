"use client";

import { motion } from "framer-motion";
import {
  FolderOpen,
  Youtube,
  FileText,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const quickActions = [
  {
    icon: Youtube,
    label: "Process YouTube",
    description: "Convert a YouTube lecture to notes",
    href: "/upload/youtube",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  {
    icon: FolderOpen,
    label: "View Projects",
    description: "Browse all your lecture projects",
    href: "/projects",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    icon: FileText,
    label: "View Notes",
    description: "Access generated study notes",
    href: "/notes",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
];

export default function DashboardPage() {
  const { localProjects } = useAppStore();

  const totalProjects = localProjects.length;
  const completedProjects = localProjects.filter(
    (p) => p.status === "completed"
  ).length;
  const processingProjects = localProjects.filter(
    (p) => p.status === "processing"
  ).length;

  const stats = [
    {
      label: "Total Projects",
      value: totalProjects,
      icon: FolderOpen,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Completed",
      value: completedProjects,
      icon: CheckCircle,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      label: "Processing",
      value: processingProjects,
      icon: Clock,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      label: "This Week",
      value: localProjects.filter((p) => {
        if (!p.created_at) return false;
        const week = new Date();
        week.setDate(week.getDate() - 7);
        return new Date(p.created_at) > week;
      }).length,
      icon: TrendingUp,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
  ];

  return (
    <DashboardLayout title="Dashboard">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Welcome */}
        <motion.div variants={fadeUp}>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening with your lectures today.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="glass-card p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-3xl font-black text-foreground">
                  {stat.value}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={fadeUp} className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="glass-card-hover p-5 flex items-center gap-4 group"
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${action.bg} border ${action.border} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground">
                      {action.label}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200 shrink-0" />
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Projects */}
        <motion.div variants={fadeUp} className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
              Recent Projects
            </h2>
            <Link href="/projects">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View all <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>

          {localProjects.length === 0 ? (
            <div className="glass-card p-10 text-center">
              <div className="w-12 h-12 rounded-2xl bg-muted mx-auto flex items-center justify-center mb-3">
                <FolderOpen className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">
                No projects yet
              </p>
              <p className="text-xs text-muted-foreground mt-1 mb-4">
                Process your first lecture to get started
              </p>
              <Link href="/upload/youtube">
                <Button variant="default" size="sm" className="gap-2">
                  <Youtube className="w-3.5 h-3.5" />
                  Process YouTube Lecture
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {localProjects.slice(0, 5).map((project) => (
                <div
                  key={project.id}
                  className="glass-card p-4 flex items-center gap-4"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Youtube className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {project.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {project.source_type} · {project.id}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      project.status === "completed"
                        ? "bg-primary/20 text-primary"
                        : project.status === "failed"
                        ? "bg-destructive/20 text-destructive"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {project.status}
                  </span>
                  <div className="flex gap-1.5">
                    <Link href={`/transcript/${project.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <FileText className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                    <Link href={`/notes/${project.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
