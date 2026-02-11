'use server';

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { ResultSetHeader } from 'mysql2';

export async function markAsRead(id: number) {
    try {
        await pool.query<ResultSetHeader>('UPDATE messages SET is_read = 1 WHERE id = ?', [id]);
        revalidatePath('/admin/messages');
        return { success: true };
    } catch (error) {
        console.error('Error marking message as read:', error);
        return { success: false, error: 'İşlem başarısız.' };
    }
}

export async function deleteMessage(id: number) {
    try {
        await pool.query<ResultSetHeader>('DELETE FROM messages WHERE id = ?', [id]);
        revalidatePath('/admin/messages');
        return { success: true };
    } catch (error) {
        console.error('Error deleting message:', error);
        return { success: false, error: 'Silme işlemi başarısız.' };
    }
}
