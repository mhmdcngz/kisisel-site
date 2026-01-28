"use client";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Github, FolderGit2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
    {
        title: "Java ATM Simülasyonu",
        description: "OOP prensipleri kullanılarak geliştirilmiş, bakiye sorgulama ve para transferi yapan terminal uygulaması. Güvenli işlem döngüsü ve kullanıcı doğrulama mekanizmaları içerir.",
        tags: ["Java", "OOP", "Scanner API", "Security"],
        github: "#",
    },
    {
        title: "Veri Bilimi Analizi",
        description: "Python ve veri bilimi kütüphaneleri kullanılarak yapılan kapsamlı veri seti analizi. Büyük veri setleri üzerinde temizleme, işleme ve görselleştirme çalışmaları.",
        tags: ["Python", "Pandas", "Matplotlib", "Data Analysis"],
        github: "#",
    }
];

export function Projects() {
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
                    <p className="text-slate-400 max-w-2xl">
                        Aktif olarak geliştirdiğim açık kaynak projelerim.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full flex flex-col bg-slate-900/60 border-slate-800 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">{project.title}</CardTitle>
                                    <CardDescription className="pt-4 text-base leading-relaxed text-slate-400">
                                        {project.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="mt-auto pt-4">
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map(tag => (
                                            <Badge key={tag} variant="outline" className="border-blue-500/20 text-blue-400 bg-blue-500/5">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="gap-4 pt-0">
                                    <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600" asChild>
                                        <Link href={project.github} target="_blank">
                                            <Github className="w-4 h-4 mr-2" /> Kaynak Kodu
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
