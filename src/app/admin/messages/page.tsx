import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import MessageItem from './MessageItem';
import { Message } from '@/types/message';
import { InboxIcon, Mail } from 'lucide-react';

async function getMessages(): Promise<Message[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM messages ORDER BY is_read ASC, created_at DESC');
    return rows as Message[];
}

export default async function AdminMessagesPage() {
    const messages = await getMessages();

    return (
        <div className="container mx-auto p-8 max-w-5xl">
            <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-3">
                        <InboxIcon className="w-8 h-8 text-blue-500" />
                        Gelen Kutusu
                    </h1>
                    <p className="text-slate-400 mt-2">
                        Toplam {messages.length} mesaj ({messages.filter(m => !m.is_read).length} okunmamış)
                    </p>
                </div>
            </div>

            {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/20 text-slate-500">
                    <Mail className="w-16 h-16 mb-4 opacity-50" />
                    <p className="text-xl">Henüz hiç mesajınız yok.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {messages.map((msg) => (
                        <MessageItem key={msg.id} message={msg} />
                    ))}
                </div>
            )}
        </div>
    );
}
