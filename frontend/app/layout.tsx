import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "highlight.js/styles/github-dark.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Lecture2Notes AI – Turn Any Lecture into Structured Notes",
  description:
    "Lecture2Notes AI converts YouTube lectures, audio recordings, and educational videos into structured notes, flashcards, question banks, and formula sheets using AI.",
  keywords: [
    "lecture notes",
    "AI notes",
    "YouTube to notes",
    "study material",
    "flashcards",
    "AI education",
  ],
  openGraph: {
    title: "Lecture2Notes AI",
    description: "Turn any lecture into structured notes with AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
