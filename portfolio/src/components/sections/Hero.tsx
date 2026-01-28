"use client";
import { Button } from "@/components/ui/Button";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section id="about" className="min-h-screen flex flex-col justify-center px-4 pt-16 relative overflow-hidden bg-slate-950">
            {/* Background Gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10 opacity-60" />

            <div className="container mx-auto">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-blue-500 font-mono text-lg mb-4 block">Merhaba, ben</span>
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-50 mb-6 tracking-tight">
                            Muhammed Cengiz.
                        </h1>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-400 mb-8">
                            Fırat Üniversitesi Öğrencisi & <br className="hidden md:block" />
                            <span className="text-blue-500 relative inline-block">
                                Java Geliştiricisi.
                            </span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed"
                    >
                        Nesne yönelimli programlama ve modern yazılım mimarileri üzerine çalışıyorum.
                        Karmaşık problemleri <span className="text-slate-200 font-medium">Java teknolojileri</span> ile çözmeye odaklıyım.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Button size="lg" className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg shadow-blue-500/20" asChild>
                            <Link href="#" target="_blank">
                                <Github className="mr-2 w-5 h-5" /> GitHub'a Git
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" className="h-12 px-6 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white" asChild>
                            <Link href="#" target="_blank">
                                <Linkedin className="mr-2 w-5 h-5" /> LinkedIn
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
