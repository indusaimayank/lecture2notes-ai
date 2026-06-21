"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/useToast";
import { resetApiClient } from "@/services/api";
import { motion } from "framer-motion";
import {
  Settings,
  Server,
  Palette,
  Globe,
  Trash2,
  Save,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.07 } },
};

export default function SettingsPage() {
  const { settings, updateSettings, clearLocalProjects, localProjects } =
    useAppStore();
  const { toast } = useToast();
  const [backendUrl, setBackendUrl] = useState(settings.backendUrl);

  const handleSaveBackendUrl = () => {
    updateSettings({ backendUrl });
    if (typeof window !== "undefined") {
      localStorage.setItem("l2n_backend_url", backendUrl);
    }
    resetApiClient();
    toast({
      title: "Backend URL saved",
      description: `Now connecting to ${backendUrl}`,
    });
  };

  const handleClearProjects = () => {
    if (
      window.confirm(
        `Are you sure you want to delete all ${localProjects.length} local projects? This cannot be undone.`
      )
    ) {
      clearLocalProjects();
      toast({
        title: "Projects cleared",
        description: "All local project data has been removed.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-2xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Header */}
          <motion.div variants={fadeUp}>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Configure your Lecture2Notes AI preferences
            </p>
          </motion.div>

          {/* Backend URL */}
          <motion.div variants={fadeUp} className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Server className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Backend Server</h2>
                <p className="text-xs text-muted-foreground">
                  FastAPI backend connection settings
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="backend-url">Backend URL</Label>
              <div className="flex gap-2">
                <Input
                  id="backend-url"
                  value={backendUrl}
                  onChange={(e) => setBackendUrl(e.target.value)}
                  placeholder="http://localhost:8000"
                  className="flex-1"
                />
                <Button onClick={handleSaveBackendUrl} className="gap-2 shrink-0">
                  <Save className="w-3.5 h-3.5" />
                  Save
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Current: <code className="text-primary">{settings.backendUrl}</code>
              </p>
            </div>

            <div className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <p className="text-xs text-yellow-400/90">
                Make sure the FastAPI server is running before using the app.
                Run <code className="bg-yellow-500/10 px-1 rounded">uvicorn backend.main:app --reload</code> to start it.
              </p>
            </div>
          </motion.div>

          {/* Appearance */}
          <motion.div variants={fadeUp} className="glass-card p-6 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Palette className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Appearance</h2>
                <p className="text-xs text-muted-foreground">
                  Customize the look and feel
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Toggle between dark and light theme
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={settings.theme !== "light"}
                onCheckedChange={(checked) =>
                  updateSettings({ theme: checked ? "dark" : "light" })
                }
              />
            </div>
          </motion.div>

          {/* Language */}
          <motion.div variants={fadeUp} className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Globe className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Language</h2>
                <p className="text-xs text-muted-foreground">
                  Preferred transcription language
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="language">Transcription Language</Label>
              <Select
                value={settings.language}
                onValueChange={(val) => updateSettings({ language: val })}
              >
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                  <SelectItem value="ar">Arabic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Data Management */}
          <motion.div variants={fadeUp} className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                <Trash2 className="w-4 h-4 text-destructive" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Data</h2>
                <p className="text-xs text-muted-foreground">
                  Manage your local data
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/20">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Clear Local Projects
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Delete all {localProjects.length} locally stored project records
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClearProjects}
                disabled={localProjects.length === 0}
                className="gap-2 shrink-0 ml-4"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </Button>
            </div>
          </motion.div>

          {/* About */}
          <motion.div variants={fadeUp} className="glass-card p-6 space-y-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-muted border border-border flex items-center justify-center">
                <Settings className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">About</h2>
                <p className="text-xs text-muted-foreground">
                  Application information
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <InfoRow label="Version" value="1.0.0" />
              <InfoRow label="Framework" value="Next.js 15 App Router" />
              <InfoRow label="Backend" value="FastAPI (Python)" />
              <InfoRow label="AI" value="Whisper + GPT" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="text-foreground font-mono text-xs">{value}</span>
    </div>
  );
}
