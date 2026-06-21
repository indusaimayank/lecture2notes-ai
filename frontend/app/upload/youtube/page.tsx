"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Youtube,
  ArrowRight,
  CheckCircle,
  Loader2,
  AlertTriangle,
  ExternalLink,
  Copy,
} from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProcessYoutube, useYoutubeStatus } from "@/hooks/useApi";
import { useAppStore } from "@/store/useAppStore";
import { useToast } from "@/hooks/useToast";
import { copyToClipboard } from "@/lib/utils";
import type { YouTubeProcessResponse } from "@/lib/types";

export default function YouTubeUploadPage() {
  const [url, setUrl] = useState("");
  const [speed, setSpeed] = useState<number>(1.0);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  
  const { mutateAsync: processYoutube, isPending } = useProcessYoutube();
  const { data: statusData } = useYoutubeStatus(projectId);
  
  const { addLocalProject } = useAppStore();
  const { toast } = useToast();

  useEffect(() => {
    if (statusData) {
      if (statusData.status === "completed" && statusData.result) {
        setResult({ data: statusData.result, status: "success" });
        
        addLocalProject({
          id: statusData.result.project_id,
          title: statusData.result.title || `YouTube Lecture (${statusData.result.project_id})`,
          source_type: "youtube",
          status: "completed",
          youtube_url: url,
          created_at: new Date().toISOString(),
        });

        toast({
          title: "Processing completed!",
          description: "Your notes are ready.",
          variant: "default",
        });
      } else if (statusData.status === "error") {
        toast({
          title: "Processing failed",
          description: statusData.message || "An error occurred during background processing",
          variant: "destructive",
        });
        setProjectId(null); // Reset polling
      }
    }
  }, [statusData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    try {
      const response = await processYoutube({ url: url.trim(), speed });
      if (response.project_id) {
        setProjectId(response.project_id);
        toast({
          title: "Processing started!",
          description: "Your lecture is being processed in the background. Please wait...",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to start",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setResult(null);
    setProjectId(null);
    setUrl("");
  };

  return (
    <DashboardLayout title="YouTube Processing">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <Youtube className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Process YouTube Lecture
                </h1>
                <p className="text-sm text-muted-foreground">
                  Paste a YouTube URL to extract and generate notes
                </p>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Form Card */}
                <div className="glass-card gradient-border p-6 space-y-5">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="youtube-url">YouTube URL</Label>
                      <div className="relative">
                        <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
                        <Input
                          id="youtube-url"
                          type="url"
                          placeholder="https://youtube.com/watch?v=..."
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          className="pl-9"
                          disabled={isPending}
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Supports all YouTube video formats and URLs
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="playback-speed">Audio Processing Speed</Label>
                      <select
                        id="playback-speed"
                        value={speed}
                        onChange={(e) => setSpeed(parseFloat(e.target.value))}
                        disabled={isPending}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value={1.0}>1x (Normal)</option>
                        <option value={1.5}>1.5x (Faster)</option>
                        <option value={2.0}>2x (Double Speed)</option>
                      </select>
                      <p className="text-xs text-muted-foreground">
                        Speeds up the lecture audio to process faster and shorten the transcript
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isPending || !url.trim()}
                      className="w-full gap-2"
                      size="lg"
                      variant="glow"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing Lecture...
                        </>
                      ) : (
                        <>
                          Process Lecture
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>

                {/* Loading Animation */}
                <AnimatePresence>
                  {(isPending || projectId) && !result && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="glass-card p-6 mt-4"
                    >
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-foreground">
                          Processing pipeline
                        </p>
                        
                        {/* Status Message from Polling */}
                        <div className="flex items-center gap-3">
                            <Loader2 className="w-4 h-4 text-primary animate-spin shrink-0" />
                            <span className="text-sm text-primary">
                              {statusData?.message || "Initializing background task..."}
                            </span>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tips */}
                <div className="glass-card p-5 mt-4 space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    Tips
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      Best results with lectures that have clear audio
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      Processing a 1-hour lecture takes ~3-5 minutes
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      Works with English, Hindi, and other major languages
                    </li>
                  </ul>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Success Banner */}
                <div className="glass-card border-primary/30 p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        Processing initiated!
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Your lecture is being processed in the background
                      </p>
                    </div>
                  </div>

                  {/* Result Details */}
                  <div className="space-y-3 font-mono text-sm">
                    <ResultRow
                      label="project_id"
                      value={result.data?.project_id || "—"}
                      canCopy
                    />
                    <ResultRow
                      label="audio_status"
                      value={result.data?.audio_status || result.status || "—"}
                    />
                    {result.data?.title && (
                      <ResultRow label="title" value={result.data.title} />
                    )}
                    {result.data?.duration && (
                      <ResultRow
                        label="duration"
                        value={`${Math.floor(result.data.duration / 60)}m ${result.data.duration % 60}s`}
                      />
                    )}
                  </div>
                </div>

                {/* Actions */}
                {result.data?.project_id && (
                  <div className="grid grid-cols-2 gap-3">
                    <Link href={`/transcript/${result.data.project_id}`}>
                      <Button variant="secondary" className="w-full gap-2">
                        <ExternalLink className="w-4 h-4" />
                        View Transcript
                      </Button>
                    </Link>
                    <Link href={`/notes/${result.data.project_id}`}>
                      <Button className="w-full gap-2">
                        View Notes
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                )}

                <Button
                  variant="ghost"
                  onClick={handleReset}
                  className="w-full text-muted-foreground"
                >
                  Process another lecture
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

function ResultRow({
  label,
  value,
  canCopy,
}: {
  label: string;
  value: string;
  canCopy?: boolean;
}) {
  const { toast } = useToast();

  const handleCopy = async () => {
    await copyToClipboard(value);
    toast({ title: "Copied!", variant: "default" });
  };

  return (
    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50">
      <span className="text-muted-foreground min-w-[120px]">{label}:</span>
      <span className="text-primary flex-1 truncate">{value}</span>
      {canCopy && (
        <button
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
          aria-label="Copy value"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
