"use client";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Coffee, Box, Network, Database } from "lucide-react";

const skills = [
    {
        title: "Java SE",
        icon: <Coffee className="w-6 h-6 text-blue-500" />,
        description: "Standard Edition",
        items: ["Core Java", "JVM Architecture", "Multithreading", "Stream API"]
    },
    {
        title: "OOP",
        icon: <Box className="w-6 h-6 text-blue-500" />,
        description: "Nesne Yönelimli Programlama",
        items: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"]
    },
    {
        title: "Veri Yapıları",
        icon: <Network className="w-6 h-6 text-blue-500" />,
        description: "Algoritmalar & Optimizasyon",
        items: ["List / Set / Map", "Trees & Graphs", "Sorting & Searching", "Big O Notion"]
    },
    {
        title: "Collections",
        icon: <Database className="w-6 h-6 text-blue-500" />,
        description: "Java Collections Framework",
        items: ["ArrayList", "HashMap", "HashSet", "Iterator"]
    }
];

export function Skills() {
    return (
        <section id="skills" className="py-24 relative overflow-hidden bg-slate-950">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">Teknik Yetkinlikler</h2>
                    <div className="h-1 w-20 bg-blue-500 rounded-full mb-6" />
                    <p className="text-slate-400 max-w-2xl">
                        Java ekosistemindeki uzmanlık alanlarım ve kullandığım temel teknolojiler.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full bg-slate-900/50 border-slate-800 hover:border-blue-500/30 transition-all duration-300 group">
                                <CardHeader className="space-y-4">
                                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
                                        {skill.icon}
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg font-bold text-slate-100">{skill.title}</CardTitle>
                                        <p className="text-xs text-blue-400 mt-1 uppercase tracking-wider">{skill.description}</p>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {skill.items.map((item) => (
                                            <Badge key={item} variant="secondary" className="bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/50">
                                                {item}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
