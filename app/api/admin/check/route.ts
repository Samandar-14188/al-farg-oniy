import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';

export async function GET(request: Request) {
  const isAuthenticated = verifyAdminSession(request);
  if (!isAuthenticated) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true });
}
