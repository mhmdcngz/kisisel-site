import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

async function ensureTableExists() {
    const connection = await pool.getConnection();
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS skills (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                proficiency INT DEFAULT 50,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    } finally {
        connection.release();
    }
}

export async function GET() {
    try {
        await ensureTableExists();
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM skills ORDER BY proficiency DESC');
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name, description, proficiency } = await request.json();
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO skills (name, description, proficiency) VALUES (?, ?, ?)',
            [name, description, proficiency]
        );
        return NextResponse.json({ id: result.insertId, message: 'Skill added' });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Failed to add skill' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, name, description, proficiency } = await request.json();
        await pool.query(
            'UPDATE skills SET name = ?, description = ?, proficiency = ? WHERE id = ?',
            [name, description, proficiency, id]
        );
        return NextResponse.json({ message: 'Skill updated' });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await pool.query('DELETE FROM skills WHERE id = ?', [id]);
        return NextResponse.json({ message: 'Skill deleted' });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
    }
}
