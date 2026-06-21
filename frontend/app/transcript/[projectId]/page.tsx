"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Copy,
  Download,
  RefreshCw,
  FileText,
  ChevronLeft,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranscript } from "@/hooks/useApi";
import { useToast } from "@/hooks/useToast";
import { TranscriptSkeleton } from "@/components/shared/Skeleton";
import { ErrorState, OfflineState } from "@/components/shared/ErrorState";
import { copyToClipboard, downloadTextFile } from "@/lib/utils";

export default function TranscriptPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const {
    data: transcript,
    isLoading,
    isError,
    error,
    refetch,
  } = useTranscript(projectId);

  const isOffline = (error as Error)?.message?.includes("Cannot connect");

  const highlightedContent = useMemo(() => {
    if (!transcript) return "";
    if (!searchQuery.trim()) return transcript;
    const escaped = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return transcript.replace(
      new RegExp(`(${escaped})`, "gi"),
      '<mark class="bg-primary/30 text-primary rounded px-0.5">$1</mark>'
    );
  }, [transcript, searchQuery]);

  const matchCount = useMemo(() => {
    if (!transcript || !searchQuery.trim()) return 0;
    const escaped = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return (transcript.match(new RegExp(escaped, "gi")) || []).length;
  }, [transcript, searchQuery]);

  const handleCopy = async () => {
    if (!transcript) return;
    await copyToClipboard(transcript);
    setCopied(true);
    toast({ title: "Transcript copied!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!transcript) return;
    downloadTextFile(transcript, `transcript-${projectId}.txt`);
    toast({ title: "Download started!" });
  };

  return (
    <DashboardLayout title="Transcript">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/projects">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-foreground">Transcript</h1>
              <p className="text-xs text-muted-foreground font-mono truncate">
                {projectId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => refetch()}
              disabled={isLoading}
              aria-label="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              disabled={!transcript}
              className="gap-2"
            >
              {copied ? (
                <CheckCircle className="w-3.5 h-3.5 text-primary" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDownload}
              disabled={!transcript}
              className="gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </Button>
          </div>
        </motion.div>

        {/* Search Bar */}
        {!isLoading && !isError && transcript && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search transcript..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-24"
            />
            {searchQuery && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                {matchCount} match{matchCount !== 1 ? "es" : ""}
              </span>
            )}
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card"
        >
          {isLoading ? (
            <div className="p-6">
              <TranscriptSkeleton />
            </div>
          ) : isError ? (
            isOffline ? (
              <OfflineState />
            ) : (
              <ErrorState
                title="Transcript not found"
                message={
                  (error as Error)?.message ||
                  "The transcript for this project could not be loaded."
                }
                onRetry={() => refetch()}
              />
            )
          ) : !transcript ? (
            <div className="p-12 text-center">
              <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No transcript yet</p>
            </div>
          ) : (
            <div className="p-6">
              {/* Stats Bar */}
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
                <span className="text-xs text-muted-foreground">
                  {transcript.split(/\s+/).length.toLocaleString()} words
                </span>
                <span className="text-xs text-muted-foreground">
                  {transcript.length.toLocaleString()} characters
                </span>
                <span className="text-xs text-muted-foreground">
                  ~{Math.ceil(transcript.split(/\s+/).length / 200)} min read
                </span>
              </div>

              {/* Transcript Text */}
              <div
                className="text-sm text-foreground/90 leading-7 whitespace-pre-wrap max-h-[600px] overflow-y-auto font-mono text-xs pr-2"
                dangerouslySetInnerHTML={{ __html: highlightedContent }}
              />
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
