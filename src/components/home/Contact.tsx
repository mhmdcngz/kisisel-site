'use client';

import { useState } from "react";
import { useForm, ValidationError } from '@formspree/react';
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Github, Linkedin, Check, Copy, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

export function Contact() {
    const [state, handleSubmit] = useForm("xvzrgqvo");
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
                            {state.succeeded ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-8 text-center space-y-4"
                                >
                                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                                        <Check className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-100">Mesajınız Alındı!</h3>
                                    <p className="text-slate-400 max-w-xs">En kısa sürede size dönüş yapacağım. İletişime geçtiğiniz için teşekkürler.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-slate-400">Adınız Soyadınız</label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                                            placeholder="Ahmet Yılmaz"
                                        />
                                        <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-slate-400">E-posta Adresiniz</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                                            placeholder="ahmet@ornek.com"
                                        />
                                        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-slate-400">Mesajınız</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            className="flex min-h-[120px] w-full rounded-md border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all resize-none"
                                            placeholder="Projenizden bahsedin..."
                                        />
                                        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs" />
                                    </div>
                                    <Button disabled={state.submitting} type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 group disabled:opacity-70 disabled:cursor-not-allowed">
                                        {state.submitting ? (
                                            <>Gönderiliyor... <Loader2 className="w-4 h-4 ml-2 animate-spin" /></>
                                        ) : (
                                            <>Gönder <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>

                </motion.div>
            </div>
        </section>
    );
}
