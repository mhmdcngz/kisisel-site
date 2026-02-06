'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FolderGit2, Github } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function Projects() {
    const [dbProjects, setDbProjects] = useState<any[]>([]);

    useEffect(() => {
        // Veritabanındaki projeleri çeken API isteği
        fetch('/api/projects') // Public API yolunu kullan (Sadece aktif olanlar gelir)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setDbProjects(data);
                }
            })
            .catch(err => console.error("Projeler yüklenemedi:", err));
    }, []);

    return (
        <section id="projects" className="py-24 bg-slate-900/30 border-y border-slate-800/50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <FolderGit2 className="w-8 h-8 text-blue-500" />
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-50">Seçili Projeler</h2>
                    </div>
                    <div className="h-1 w-20 bg-blue-500 rounded-full mb-6" />
                    <p className="text-slate-400 max-w-2xl">Admin panelinden eklediğim projelerim.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {dbProjects.length > 0 ? (
                        dbProjects.map((project, index) => (
                            <motion.div
                                key={project.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="h-full flex flex-col bg-slate-900/60 border-slate-800 hover:border-blue-500/40 transition-all duration-300 group">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                                            {project.title}
                                        </CardTitle>
                                        <CardDescription className="pt-4 text-base leading-relaxed text-slate-400">
                                            {project.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="mt-auto pt-4">
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.tech_stack?.split(',').map((tag: string, i: number) => (
                                                <Badge key={i} variant="outline" className="border-blue-500/20 text-blue-400 bg-blue-500/5">
                                                    {tag.trim()}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="gap-4 pt-0">
                                        {project.github_url && (
                                            <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800" asChild>
                                                <Link href={project.github_url} target="_blank">
                                                    <Github className="w-4 h-4 mr-2" /> Kaynak Kodu
                                                </Link>
                                            </Button>
                                        )}
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-slate-500 py-10">
                            Henüz proje eklenmemiş veya veriler yükleniyor...
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
