import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return NextResponse.json({ error: "O'qituvchilarni yuklashda xatolik" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const isAdmin = verifyAdminSession(request);
  if (!isAdmin) {
    return NextResponse.json({ error: "Avtorizatsiyadan o'tilmagan (401)" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, role, specialty, experience, image, bio, rating } = body;

    if (!name || !role) {
      return NextResponse.json({ error: "Ism va lavozim kiritilishi shart!" }, { status: 400 });
    }

    const teacher = await prisma.teacher.create({
      data: {
        name,
        role,
        specialty: specialty || "Dasturlash",
        experience: experience || "3 yillik tajriba",
        image: image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
        bio: bio || "Al-Farg'oniy Academy malakali mentori.",
        rating: rating ? parseFloat(rating.toString()) : 4.9
      }
    });

    return NextResponse.json(teacher, { status: 201 });
  } catch (error) {
    console.error('Error creating teacher:', error);
    return NextResponse.json({ error: "O'qituvchi qo'shishda xatolik" }, { status: 500 });
  }
}
