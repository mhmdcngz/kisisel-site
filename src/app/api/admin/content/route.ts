import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Ensure table exists (optional safety check)
async function ensureTableExists() {
    const connection = await pool.getConnection();
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS site_content (
                id INT PRIMARY KEY DEFAULT 1,
                about_text TEXT,
                skills TEXT
            )
        `);
        // Ensure the single row exists
        await connection.query(`
            INSERT IGNORE INTO site_content (id, about_text, skills) 
            VALUES (1, '', '')
        `);
    } finally {
        connection.release();
    }
}

export async function GET() {
    try {
        await ensureTableExists();
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM site_content WHERE id = 1');
        return NextResponse.json(rows[0] || {});
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { about_text, skills } = await request.json();

        await ensureTableExists();

        await pool.query(
            'INSERT INTO site_content (id, about_text, skills) VALUES (1, ?, ?) ON DUPLICATE KEY UPDATE about_text = VALUES(about_text), skills = VALUES(skills)',
            [about_text, skills]
        );

        return NextResponse.json({ message: 'Content updated successfully' });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
    }
}
