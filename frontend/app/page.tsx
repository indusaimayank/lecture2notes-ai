"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Youtube,
  Mic,
  FileText,
  Zap,
  BookOpen,
  Brain,
  LayoutGrid,
  CheckCircle2,
  Star,
  ChevronDown,
  Sparkles,
  Play,
  Shield,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ============================================================
// Animation Variants
// ============================================================

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// ============================================================
// Landing Page
// ============================================================

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 cyber-grid-bg opacity-100 pointer-events-none" />
      {/* Glow Orbs */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/3 rounded-full blur-3xl pointer-events-none" />

      {/* ── Navbar ──────────────────────────────── */}
      <LandingNav />

      {/* ── Hero ─────────────────────────────────── */}
      <HeroSection />

      {/* ── Features ─────────────────────────────── */}
      <FeaturesSection />

      {/* ── How It Works ────────────────────────── */}
      <HowItWorksSection />

      {/* ── Supported Subjects ─────────────────── */}
      <SubjectsSection />

      {/* ── Testimonials ────────────────────────── */}
      <TestimonialsSection />

      {/* ── FAQ ─────────────────────────────────── */}
      <FAQSection />

      {/* ── Footer ──────────────────────────────── */}
      <Footer />
    </div>
  );
}

// ============================================================
// Navbar
// ============================================================

function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <Link href="/" className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 border border-primary/30">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <span className="font-bold text-sm text-foreground">Lecture2Notes</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {["Features", "How it works", "Subjects", "FAQ"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            className="nav-link"
          >
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">
            Dashboard
          </Button>
        </Link>
        <Link href="/upload/youtube">
          <Button variant="glow" size="sm" className="gap-2">
            Generate Notes
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    </nav>
  );
}

// ============================================================
// Hero
// ============================================================

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-6 md:px-12 flex flex-col items-center text-center min-h-screen justify-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-8"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        New — Audio uploads in beta
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-5xl md:text-7xl font-black tracking-tight text-foreground max-w-4xl leading-[1.05]"
      >
        Turn any lecture into{" "}
        <span className="gradient-text">structured</span> notes.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
      >
        Paste a YouTube link or upload audio. Get clean notes, flashcards,
        formula sheets and question banks — in minutes.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-3 mt-10"
      >
        <Link href="/upload/youtube">
          <Button variant="glow" size="lg" className="gap-2">
            Generate Notes
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="secondary" size="lg" className="gap-2">
            Open Dashboard
          </Button>
        </Link>
      </motion.div>

      {/* Terminal preview */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative mt-16 w-full max-w-2xl"
      >
        <div className="glass-card gradient-border rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-primary/80" />
            <span className="ml-3 text-xs text-muted-foreground font-mono">
              lecture2notes — youtube › process
            </span>
          </div>
          {/* Terminal Body */}
          <div className="p-5 font-mono text-sm space-y-2 text-left">
            <p className="text-muted-foreground">
              <span className="text-primary">$</span> POST /youtube/process
            </p>
            <p className="text-muted-foreground">
              {"{ "}
              <span className="text-cyan-400">&quot;url&quot;</span>:{" "}
              <span className="text-yellow-400">
                &quot;https://youtube.com/watch?v=...&quot;
              </span>{" "}
              {"}"}
            </p>
            <div className="mt-3 space-y-1">
              <p>
                <span className="text-primary">+</span>{" "}
                <span className="text-muted-foreground">project_id:</span>{" "}
                <span className="text-cyan-400">prj_98a2</span>
              </p>
              <p>
                <span className="text-primary">+</span>{" "}
                <span className="text-muted-foreground">audio_status:</span>{" "}
                <span className="text-primary">queued</span>
              </p>
              <p>
                <span className="text-primary">+</span>{" "}
                <span className="text-muted-foreground">transcript:</span>{" "}
                <span className="text-primary">processing...</span>
              </p>
              <p>
                <span className="text-primary">+</span>{" "}
                <span className="text-muted-foreground">notes:</span>{" "}
                <span className="text-yellow-400">generating</span>
              </p>
            </div>
          </div>
        </div>
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-primary/10 rounded-2xl blur-2xl -z-10" />
      </motion.div>
    </section>
  );
}

// ============================================================
// Features
// ============================================================

const features = [
  {
    icon: Youtube,
    title: "YouTube Processing",
    description:
      "Paste any YouTube lecture URL. We extract audio, transcribe, and generate comprehensive notes automatically.",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  {
    icon: FileText,
    title: "Structured Notes",
    description:
      "AI generates well-organized markdown notes with headings, bullet points, code blocks, and tables.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    icon: Brain,
    title: "Flashcards & Q&A",
    description:
      "Automatically generate flashcards and question banks for active recall and exam preparation.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: Zap,
    title: "Formula Sheets",
    description:
      "Extract and organize all mathematical formulas and equations from STEM lectures into clean sheets.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  {
    icon: Mic,
    title: "Audio Upload",
    description:
      "Upload your own audio recordings from lectures and seminars for instant transcription and notes.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    icon: LayoutGrid,
    title: "Project Management",
    description:
      "Organize all your lecture notes by subject and project. Search, filter, and access everything instantly.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 md:px-12">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        <motion.div variants={fadeUp} className="text-center mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Features
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Everything you need to study{" "}
            <span className="gradient-text">smarter</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            From raw lecture video to polished study material in one seamless
            workflow
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                custom={i}
                className="glass-card-hover p-6 group"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${feature.bg} border ${feature.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================
// How It Works
// ============================================================

const steps = [
  {
    step: "01",
    title: "Paste your YouTube URL",
    description:
      "Copy any YouTube lecture link and paste it into Lecture2Notes. We support all formats including playlists.",
    icon: Youtube,
  },
  {
    step: "02",
    title: "AI processes the lecture",
    description:
      "Our AI pipeline extracts audio, generates a transcript, and identifies key concepts automatically.",
    icon: Zap,
  },
  {
    step: "03",
    title: "Get structured study material",
    description:
      "Receive organized notes, flashcards, formula sheets, and question banks ready to download.",
    icon: BookOpen,
  },
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-6 md:px-12 bg-card/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Three steps to{" "}
            <span className="gradient-text">better notes</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center shadow-lg shadow-primary/10">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-black flex items-center justify-center shadow-lg shadow-primary/30">
                      {step.step.slice(-1)}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Subjects
// ============================================================

const subjects = [
  { emoji: "⚛️", label: "Physics" },
  { emoji: "🧮", label: "Mathematics" },
  { emoji: "💻", label: "Computer Science" },
  { emoji: "🧬", label: "Biology" },
  { emoji: "⚗️", label: "Chemistry" },
  { emoji: "📊", label: "Statistics" },
  { emoji: "🏛️", label: "History" },
  { emoji: "📐", label: "Engineering" },
  { emoji: "💰", label: "Economics" },
  { emoji: "🧠", label: "Psychology" },
  { emoji: "⚖️", label: "Law" },
  { emoji: "🌍", label: "Geography" },
];

function SubjectsSection() {
  return (
    <section id="subjects" className="py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Supported subjects
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Works across{" "}
            <span className="gradient-text">every discipline</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Our AI understands domain-specific terminology, formulas, and
            concepts across all academic fields.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3"
        >
          {subjects.map((subject) => (
            <motion.div
              key={subject.label}
              variants={fadeUp}
              className="glass-card-hover p-3 flex flex-col items-center gap-2 cursor-default"
            >
              <span className="text-2xl">{subject.emoji}</span>
              <span className="text-xs font-medium text-muted-foreground text-center">
                {subject.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// Testimonials
// ============================================================

const testimonials = [
  {
    quote:
      "Lecture2Notes saves me hours every week. I just paste a YouTube link and get complete study notes instantly. It's like having a personal AI study assistant.",
    name: "Arjun Patel",
    role: "3rd Year CS Student, IIT Delhi",
    avatar: "AP",
  },
  {
    quote:
      "The formula sheets feature is incredible for STEM subjects. All equations from a 2-hour lecture organized perfectly. My exam prep has completely transformed.",
    name: "Sarah Kim",
    role: "Physics PhD Candidate, MIT",
    avatar: "SK",
  },
  {
    quote:
      "I record my professors' lectures and upload them. The AI-generated notes are more comprehensive than my own handwritten ones. Absolutely game-changing.",
    name: "Marcus Johnson",
    role: "Medical Student, Johns Hopkins",
    avatar: "MJ",
  },
];

function TestimonialsSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-card/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Loved by <span className="gradient-text">students</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-6 flex flex-col gap-4"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ
// ============================================================

const faqs = [
  {
    q: "What types of content can I process?",
    a: "You can process YouTube lecture videos by URL, or upload your own audio recordings (MP3, WAV, M4A). Support for direct video upload is coming soon.",
  },
  {
    q: "How accurate is the transcription?",
    a: "Our AI achieves 95%+ accuracy on clear audio in English. Accuracy may vary for accents, technical terminology, or poor audio quality.",
  },
  {
    q: "How long does processing take?",
    a: "A typical 1-hour lecture takes 3-5 minutes to process end-to-end — transcription, analysis, and note generation included.",
  },
  {
    q: "Can I download my notes?",
    a: "Yes! Notes are downloadable as Markdown files. Transcripts can be copied or downloaded as plain text.",
  },
  {
    q: "Is my data private?",
    a: "Your lecture content is processed securely and not shared. You own all generated content. We do not train on your data.",
  },
  {
    q: "Do I need a backend to use this?",
    a: "The frontend connects to a local FastAPI backend running at http://localhost:8000. Make sure it's running before using the app.",
  },
];

function FAQSection() {
  return (
    <section id="faq" className="py-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Common <span className="gradient-text">questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.details
              key={faq.q}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="glass-card group"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-semibold text-foreground text-sm hover:text-primary transition-colors">
                {faq.q}
                <ChevronDown className="w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform duration-200 shrink-0 ml-4" />
              </summary>
              <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                {faq.a}
              </p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Footer
// ============================================================

function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 border border-primary/30">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold text-sm text-foreground">
              Lecture2Notes AI
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/projects" className="hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/upload/youtube" className="hover:text-foreground transition-colors">
              Upload
            </Link>
            <Link href="/settings" className="hover:text-foreground transition-colors">
              Settings
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Privacy First
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              Open Source
            </span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Lecture2Notes AI. Built with FastAPI +
          Next.js.
        </div>
      </div>
    </footer>
  );
}
