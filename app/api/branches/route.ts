import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const branches = await prisma.branch.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(branches);
  } catch (error) {
    console.error('Error fetching branches:', error);
    return NextResponse.json({ error: "Filiallarni yuklashda xatolik" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const isAdmin = verifyAdminSession(request);
  if (!isAdmin) {
    return NextResponse.json({ error: "Avtorizatsiyadan o'tilmagan (401)" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, address, phone, hours, mapLink, mapEmbedUrl, image } = body;

    if (!name || !address || !phone) {
      return NextResponse.json({ error: "Filial nomi, manzil va telefon kiritilishi shart!" }, { status: 400 });
    }

    const branch = await prisma.branch.create({
      data: {
        name,
        address,
        phone,
        hours: hours || "08:00 - 20:00 (Du - Sha)",
        mapLink: mapLink || "https://maps.google.com",
        mapEmbedUrl: mapEmbedUrl || null,
        image: image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
      }
    });

    return NextResponse.json(branch, { status: 201 });
  } catch (error) {
    console.error('Error creating branch:', error);
    return NextResponse.json({ error: "Filial yaratishda xatolik" }, { status: 500 });
  }
}
