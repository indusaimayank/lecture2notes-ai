"use client";

import Link from "next/link";
import { Bell, Search, Moon, Sun } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";

interface TopNavbarProps {
  title?: string;
}

export function TopNavbar({ title = "Dashboard" }: TopNavbarProps) {
  const { settings, updateSettings } = useAppStore();
  const isDark = settings.theme !== "light";

  const toggleTheme = () => {
    updateSettings({ theme: isDark ? "light" : "dark" });
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm">
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Lecture2Notes AI</span>
        <span className="text-muted-foreground">/</span>
        <span className="text-sm font-semibold text-foreground">{title}</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <Button variant="ghost" size="icon" aria-label="Search" className="hidden sm:flex">
          <Search className="w-4 h-4" />
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="w-4 h-4" />
        </Button>

        {/* Avatar */}
        <Link
          href="/settings"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold hover:bg-primary/30 transition-colors"
          aria-label="Go to settings"
        >
          AI
        </Link>
      </div>
    </header>
  );
}
