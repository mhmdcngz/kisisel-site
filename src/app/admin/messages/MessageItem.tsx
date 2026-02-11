'use client';

import { useState } from 'react';
import { Message } from '@/types/message';
import { markAsRead, deleteMessage } from './actions';
import { Trash2, CheckCircle, MailOpen, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function MessageItem({ message }: { message: Message }) {
    const [loading, setLoading] = useState(false);
    const isRead = Boolean(message.is_read);

    async function handleMarkRead() {
        setLoading(true);
        await markAsRead(message.id);
        setLoading(false);
    }

    async function handleDelete() {
        if (!confirm('Bu mesajı silmek istediğinize emin misiniz?')) return;
        setLoading(true);
        await deleteMessage(message.id);
        setLoading(false);
    }

    return (
        <div
            className={`relative p-6 rounded-xl border transition-all duration-300 flex flex-col justify-between h-full ${isRead
                    ? 'bg-slate-900/30 border-slate-800 opacity-75 hover:opacity-100'
                    : 'bg-slate-900/80 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:border-blue-500/50'
                }`}
        >
            {/* Header */}
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className={`p-2 shrink-0 rounded-lg ${isRead ? 'bg-slate-800 text-slate-500' : 'bg-blue-500/20 text-blue-400'}`}>
                            {isRead ? <MailOpen size={20} /> : <Mail size={20} />}
                        </div>
                        <div className="min-w-0">
                            <h3 className={`font-semibold truncate ${isRead ? 'text-slate-400' : 'text-slate-200'}`}>
                                {message.name}
                            </h3>
                            <p className="text-xs text-slate-500 truncate">{message.email}</p>
                        </div>
                    </div>
                </div>

                {/* Date */}
                <div className="mb-4">
                    <span className="text-[10px] uppercase tracking-wider text-slate-600 font-bold bg-slate-950 px-2 py-1 rounded border border-slate-800/60 inline-block">
                        {new Date(message.created_at).toLocaleString('tr-TR', {
                            day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                        })}
                    </span>
                </div>

                {/* Message Body */}
                <div className="mb-6 max-h-40 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                    <p className={`text-sm leading-relaxed whitespace-pre-wrap ${isRead ? 'text-slate-500' : 'text-slate-300'}`}>
                        {message.message}
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800/50 mt-auto">
                {!isRead && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleMarkRead}
                        disabled={loading}
                        className="text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 h-9 px-3 text-xs"
                    >
                        <CheckCircle size={14} className="mr-2" /> Okundu
                    </Button>
                )}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDelete}
                    disabled={loading}
                    className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 h-9 px-3 text-xs"
                >
                    <Trash2 size={14} className="mr-2" /> Sil
                </Button>
            </div>
        </div>
    );
}
