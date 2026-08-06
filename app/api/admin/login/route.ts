import { NextResponse } from 'next/server';
import { checkRateLimit, recordFailedAttempt, resetRateLimit } from '@/lib/rate-limit';
import { createAdminToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';

    // Rate Limit Check
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      const minutes = Math.ceil(rateCheck.retryAfterSeconds / 60);
      return NextResponse.json(
        {
          error: `Ko'p marta xato parol kiritildi! Tizim bloklandi. Iltimos, ${minutes} daqiqadan so'ng qayta urinib ko'ring.`,
          retryAfterSeconds: rateCheck.retryAfterSeconds
        },
        { status: 429 }
      );
    }

    const { password } = await request.json();
    const validPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (password !== validPassword) {
      const attemptInfo = recordFailedAttempt(ip);
      if (attemptInfo.remaining === 0) {
        return NextResponse.json(
          {
            error: "Parol noto'g'ri! 5 ta urunish tugadi. Tizim 15 daqiqaga bloklandi.",
            remainingAttempts: 0
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error: `Parol noto'g'ri! Qolgan urunishlar soni: ${attemptInfo.remaining}`,
          remainingAttempts: attemptInfo.remaining
        },
        { status: 401 }
      );
    }

    // Success: Reset failed attempts & issue session token
    resetRateLimit(ip);
    const token = createAdminToken();

    const response = NextResponse.json({ success: true, message: "Muvaffaqiyatli tizimga kirildi" });

    // Set Secure HttpOnly Cookie
    response.cookies.set({
      name: 'admin_session',
      value: token,
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Admin Login Error:', error);
    return NextResponse.json(
      { error: "Serverda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
