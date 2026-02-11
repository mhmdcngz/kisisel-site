'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Github, Linkedin, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import ContactForm from "@/components/ContactForm";

export function Contact() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("mhmdcngz@outlook.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-slate-950">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12"
                >
                    {/* Left Side - Info */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">İletişime Geçin</h2>
                            <div className="h-1 w-20 bg-blue-500 rounded-full mb-6" />
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Projeleriniz, iş birlikleri veya sadece merhaba demek için bana her zaman ulaşabilirsiniz.
                                Mesajlarınıza en kısa sürede dönüş yapmaya çalışıyorum.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm flex items-center justify-between group hover:border-blue-500/30 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <span className="text-slate-300 font-medium">mhmdcngz@outlook.com</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleCopy}
                                    className="text-slate-500 hover:text-blue-400"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                </Button>
                            </div>

                            <div className="flex gap-4">
                                <Button variant="outline" className="flex-1 h-12 border-slate-800 bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:border-blue-500/30 hover:text-white group" asChild>
                                    <Link href="https://github.com/mhmdcngz" target="_blank" rel="noopener noreferrer">
                                        <Github className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" /> GitHub
                                    </Link>
                                </Button>
                                <Button variant="outline" className="flex-1 h-12 border-slate-800 bg-slate-900/50 text-slate-300 hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-colors" asChild>
                                    <Link href="https://www.linkedin.com/in/mhmdcngz" target="_blank" rel="noopener noreferrer">
                                        <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <Card className="border-slate-800 bg-slate-900/30">
                        <CardHeader>
                            <CardTitle className="text-2xl">Bana Yazın</CardTitle>
                            <CardDescription>Aşağıdaki formu doldurarak bana doğrudan mesaj gönderebilirsiniz.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ContactForm />
                        </CardContent>
                    </Card>

                </motion.div>
            </div>
        </section>
    );
}
