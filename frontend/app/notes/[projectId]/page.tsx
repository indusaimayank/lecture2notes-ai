"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Download,
  RefreshCw,
  ChevronLeft,
  CheckCircle,
  Eye,
  Code2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotes } from "@/hooks/useApi";
import { useToast } from "@/hooks/useToast";
import { NotesSkeleton } from "@/components/shared/Skeleton";
import { ErrorState, OfflineState } from "@/components/shared/ErrorState";
import { copyToClipboard, downloadMarkdownFile } from "@/lib/utils";

export default function NotesPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const {
    data: notes,
    isLoading,
    isError,
    error,
    refetch,
  } = useNotes(projectId);

  const isOffline = (error as Error)?.message?.includes("Cannot connect");

  const handleCopy = async () => {
    if (!notes) return;
    await copyToClipboard(notes);
    setCopied(true);
    toast({ title: "Notes copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!notes) return;
    downloadMarkdownFile(notes, `notes-${projectId}.md`);
    toast({ title: "Download started!" });
  };

  return (
    <DashboardLayout title="Notes">
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
              <h1 className="text-xl font-bold text-foreground">
                Generated Notes
              </h1>
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
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              disabled={!notes}
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
              disabled={!notes}
              className="gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              Download .md
            </Button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {isLoading ? (
            <div className="glass-card p-6">
              <NotesSkeleton />
            </div>
          ) : isError ? (
            isOffline ? (
              <OfflineState />
            ) : (
              <ErrorState
                title="Notes not found"
                message={
                  (error as Error)?.message ||
                  "Notes for this project have not been generated yet."
                }
                onRetry={() => refetch()}
              />
            )
          ) : !notes ? (
            <div className="glass-card p-12 text-center">
              <p className="text-muted-foreground text-sm">No notes yet</p>
            </div>
          ) : (
            <Tabs defaultValue="preview" className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="preview" className="gap-2">
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="raw" className="gap-2">
                    <Code2 className="w-3.5 h-3.5" />
                    Raw Markdown
                  </TabsTrigger>
                </TabsList>
                {/* Word count */}
                <span className="text-xs text-muted-foreground">
                  {notes.split(/\s+/).length.toLocaleString()} words
                </span>
              </div>

              {/* Preview Tab */}
              <TabsContent value="preview">
                <div className="glass-card p-6 md:p-8">
                  <div className="prose-dark max-w-none space-y-4">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight, rehypeRaw]}
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-2xl font-black text-foreground mt-0 mb-4 pb-2 border-b border-border">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-xl font-bold text-foreground mt-6 mb-3">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="text-sm text-foreground/90 leading-7 mb-3">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside space-y-1.5 mb-3 text-sm text-foreground/90">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside space-y-1.5 mb-3 text-sm text-foreground/90">
                            {children}
                          </ol>
                        ),
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        code: ({ inline, className, children, ...props }: any) =>
                          inline ? (
                            <code className="bg-muted text-primary px-1.5 py-0.5 rounded text-xs font-mono">
                              {children}
                            </code>
                          ) : (
                            <code
                              className={`${className ?? ""} block text-xs font-mono`}
                              {...props}
                            >
                              {children}
                            </code>
                          ),
                        pre: ({ children }) => (
                          <pre className="bg-background border border-border rounded-xl p-4 overflow-x-auto mb-3 text-xs">
                            {children}
                          </pre>
                        ),
                        table: ({ children }) => (
                          <div className="overflow-x-auto mb-3">
                            <table className="w-full text-sm border-collapse">
                              {children}
                            </table>
                          </div>
                        ),
                        th: ({ children }) => (
                          <th className="border border-border bg-muted px-3 py-2 text-left font-semibold text-xs">
                            {children}
                          </th>
                        ),
                        td: ({ children }) => (
                          <td className="border border-border px-3 py-2 text-xs text-foreground/90">
                            {children}
                          </td>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-primary pl-4 py-1 italic text-muted-foreground text-sm mb-3">
                            {children}
                          </blockquote>
                        ),
                      }}
                    >
                      {notes}
                    </ReactMarkdown>
                  </div>
                </div>
              </TabsContent>

              {/* Raw Markdown Tab */}
              <TabsContent value="raw">
                <div className="glass-card">
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-mono">
                      notes-{projectId}.md
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className="gap-1.5 text-xs"
                    >
                      <Copy className="w-3 h-3" />
                      Copy
                    </Button>
                  </div>
                  <pre className="p-6 text-xs font-mono text-foreground/80 leading-6 overflow-auto max-h-[600px] whitespace-pre-wrap">
                    {notes}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
