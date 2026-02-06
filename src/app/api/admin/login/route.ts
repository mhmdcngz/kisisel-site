import { NextResponse } from 'next/server';
import { signJWT } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        // Şifreyi çevre değişkeninden alıyoruz
        const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

        if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: 'Sunucu yapılandırma hatası: Şifre belirlenmemiş.' },
                { status: 500 }
            );
        }

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            // JWT token oluştur
            const token = await signJWT({ username });

            // Çerez oluştur (Giriş başarılı)
            const cookieStore = await cookies();
            cookieStore.set('admin_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 2, // 2 saat
                path: '/',
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { error: 'Hatalı bilgiler' },
            { status: 401 }
        );
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
