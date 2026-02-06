"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Github, Linkedin, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={cn(
            "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
            scrolled ? "bg-slate-900/80 backdrop-blur-md border-slate-800" : "bg-transparent"
        )}>
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-1 rounded bg-blue-500/10 border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
                        <Terminal className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="font-mono font-bold text-lg tracking-tight text-white">muhammed_cengiz</span>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    <Link href="#about" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Hakkımda</Link>
                    <Link href="#projects" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Projeler</Link>
                    <Link href="#contact" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">İletişim</Link>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="hover:bg-blue-500/10 hover:text-blue-400" asChild>
                        <Link href="#" target="_blank" aria-label="GitHub Profili">
                            <Github className="w-5 h-5" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-blue-500/10 hover:text-blue-400" asChild>
                        <Link href="#" target="_blank" aria-label="LinkedIn Profili">
                            <Linkedin className="w-5 h-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
