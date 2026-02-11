import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Tüm alanlar zorunludur.' },
                { status: 400 }
            );
        }

        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
            [name, email, message]
        );

        if (result.affectedRows > 0) {
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json(
                { error: 'Mesaj kaydedilemedi.' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: 'Bir sunucu hatası oluştu.' },
            { status: 500 }
        );
    }
}
