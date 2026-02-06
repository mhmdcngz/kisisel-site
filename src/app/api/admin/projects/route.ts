import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Helper to ensure table exists (optional, but good for first run)
async function ensureTableExists() {
    const connection = await pool.getConnection();
    try {
        await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        tech_stack VARCHAR(255),
        github_url VARCHAR(255),
        demo_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    } finally {
        connection.release();
    }
}

export async function GET() {
    try {
        // Ensure table exists on first fetch (simple approach)
        await ensureTableExists();

        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM projects ORDER BY created_at DESC');
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const { title, description, tech_stack, github_url, demo_url, is_active } = await request.json();

        if (!title) {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO projects (title, description, tech_stack, github_url, demo_url, is_active) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description, tech_stack, github_url, demo_url, is_active ?? true]
        );

        return NextResponse.json({ id: result.insertId, message: 'Project added' });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json(
            { error: 'Failed to add project' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await pool.query('DELETE FROM projects WHERE id = ?', [id]);

        return NextResponse.json({ message: 'Project deleted' });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json(
            { error: 'Failed to delete project' },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const { id, title, description, tech_stack, github_url, demo_url, is_active } = await request.json();

        if (!id || !title) {
            return NextResponse.json({ error: 'ID ve Başlık zorunludur' }, { status: 400 });
        }

        await pool.query(
            'UPDATE projects SET title = ?, description = ?, tech_stack = ?, github_url = ?, demo_url = ?, is_active = ? WHERE id = ?',
            [title, description, tech_stack, github_url, demo_url, is_active, id]
        );

        return NextResponse.json({ message: 'Proje başarıyla güncellendi' });
    } catch (error) {
        console.error('Veritabanı Hatası:', error);
        return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 });
    }
}
