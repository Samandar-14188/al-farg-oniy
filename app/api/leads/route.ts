import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendTelegramAlert } from '@/lib/telegram';
import { verifyAdminSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, age, courseName, branchName } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Ism va telefon raqami talab etiladi!" },
        { status: 400 }
      );
    }

    // Save lead in database
    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        age: age ? parseInt(age.toString()) : null,
        courseName: courseName || "Umumiy konsultatsiya",
        branchName: branchName || "Uchko'prik Filiali",
        status: "Yangi"
      }
    });

    // Dispatch Telegram alert
    await sendTelegramAlert({
      name,
      phone,
      age,
      courseName: courseName || "Umumiy konsultatsiya",
      branchName: branchName || "Uchko'prik Filiali"
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: "Serverda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  // Enforce Admin Protection for retrieving lead applications
  const isAdmin = verifyAdminSession(request);
  if (!isAdmin) {
    return NextResponse.json(
      { error: "Tizimga kirish huquqingiz yo'q! (401 Unauthorized)" },
      { status: 401 }
    );
  }

  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: "Arizalarni yuklashda xatolik" },
      { status: 500 }
    );
  }
}
