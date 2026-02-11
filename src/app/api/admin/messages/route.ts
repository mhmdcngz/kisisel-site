import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

// Mesajları Getir (Yeniden eskiye)
export async function GET() {
    try {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM messages ORDER BY created_at DESC');
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: 'Mesajlar çekilemedi' }, { status: 500 });
    }
}

// Mesajı Okundu Olarak İşaretle
export async function PUT(request: Request) {
    try {
        const { id } = await request.json();
        await pool.query('UPDATE messages SET is_read = TRUE WHERE id = ?', [id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Güncellenemedi' }, { status: 500 });
    }
}

// Mesajı Sil
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await pool.query('DELETE FROM messages WHERE id = ?', [id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Silinemedi' }, { status: 500 });
    }
}
