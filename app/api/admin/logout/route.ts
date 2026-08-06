import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Tizimdan chiqildi" });
  
  response.cookies.set({
    name: 'admin_session',
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0
  });

  return response;
}
