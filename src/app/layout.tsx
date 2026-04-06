import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ClientCanvas } from "@/components/3d/ClientCanvas";
import { TerminalWindow } from "@/components/interactive/TerminalWindow";
import { AIChatbot } from "@/components/interactive/AIChatbot";
import { BootScreen } from "@/components/ui/BootScreen";
import { TerminalBackground } from "@/components/ui/TerminalBackground";
import { NeonRobot } from "@/components/ui/NeonRobot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cybertarr-A | AI Systems Engineer",
  description: "AI Systems Developer focused on building intelligent, real-world systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col relative bg-background text-foreground">
        <BootScreen />
        <TerminalBackground />
        <ClientCanvas />
        <main className="flex-1 relative z-20 pointer-events-none *:pointer-events-auto">{children}</main>
        <TerminalWindow />
        <AIChatbot />
        <NeonRobot />
      </body>
    </html>
  );
}
