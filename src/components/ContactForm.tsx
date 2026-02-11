'use client';

import { useState } from 'react';
import { motion } from "framer-motion";
import { Check, Send, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok) {
                setStatus('success');
            } else {
                setStatus('error');
                setErrorMessage(result.error || 'Bir hata oluştu.');
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage('Bağlantı hatası oluştu.');
        }
    }

    if (status === 'success') {
        return (
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
                <Button
                    variant="outline"
                    onClick={() => setStatus('idle')}
                    className="mt-4 border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                    Yeni Mesaj Gönder
                </Button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-400">Adınız Soyadınız</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    disabled={status === 'loading'}
                    className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all disabled:opacity-50"
                    placeholder="Ahmet Yılmaz"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-400">E-posta Adresiniz</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={status === 'loading'}
                    className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all disabled:opacity-50"
                    placeholder="ahmet@ornek.com"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-400">Mesajınız</label>
                <textarea
                    id="message"
                    name="message"
                    required
                    disabled={status === 'loading'}
                    className="flex min-h-[120px] w-full rounded-md border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all resize-none disabled:opacity-50"
                    placeholder="Projenizden bahsedin..."
                />
            </div>

            {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-md border border-red-400/20">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errorMessage}</span>
                </div>
            )}

            <Button
                disabled={status === 'loading'}
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {status === 'loading' ? (
                    <>Gönderiliyor... <Loader2 className="w-4 h-4 ml-2 animate-spin" /></>
                ) : (
                    <>Gönder <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></>
                )}
            </Button>
        </form>
    );
}
