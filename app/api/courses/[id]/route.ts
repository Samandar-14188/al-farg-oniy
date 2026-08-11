import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const isAdmin = verifyAdminSession(request);
  if (!isAdmin) {
    return NextResponse.json({ error: "Avtorizatsiyadan o'tilmagan (401)" }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await request.json();

    const updated = await prisma.course.update({
      where: { id },
      data: body
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json({ error: "Kursni yangilashda xatolik" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const isAdmin = verifyAdminSession(request);
  if (!isAdmin) {
    return NextResponse.json({ error: "Avtorizatsiyadan o'tilmagan (401)" }, { status: 401 });
  }

  try {
    const { id } = params;
    await prisma.course.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json({ error: "Kursni o'chirishda xatolik" }, { status: 500 });
  }
}
