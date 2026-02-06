'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Terminal, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
                    <Link href="#hero" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Giriş</Link>
                    <Link href="#skills" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Yetenekler</Link>
                    <Link href="#projects" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Projeler</Link>
                </div>
                <div className="flex items-center gap-2">
                    <Button size="sm" className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 mr-2" asChild>
                        <Link href="#contact">Bana Ulaş</Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-blue-500/10 hover:text-blue-400 group" asChild>
                        <Link href="https://github.com/mhmdcngz" target="_blank" rel="noopener noreferrer"><Github className="w-5 h-5 group-hover:rotate-12 transition-transform" /></Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-[#0077b5]/10 hover:text-[#0077b5]" asChild>
                        <Link href="https://www.linkedin.com/in/mhmdcngz" target="_blank" rel="noopener noreferrer"><Linkedin className="w-5 h-5" /></Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
